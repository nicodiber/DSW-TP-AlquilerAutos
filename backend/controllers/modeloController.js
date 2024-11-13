const Modelo = require("../models/modelo");
const Auto = require("../models/auto");
const { getNextSequenceValue } = require('../config/db');
const Categoria = require('../models/categoria'); // Ajusta la ruta si es necesario
const Marca = require('../models/marca'); // Ajusta la ruta si es necesario


exports.crearModelo = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('modeloId');
    let nuevoModelo = new Modelo({ ...req.body, _id });

    await nuevoModelo.save();
    res.send(nuevoModelo);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Nueva función para crear un modelo con imágenes
exports.crearModeloConImagenes = async (req, res) => {
  try {
    console.log('req.body:', req.body); // Verifica que `req.body` contenga los campos de texto
    console.log('req.files:', req.files); // Verifica que `req.files` contenga las imágenes

    const _id = await getNextSequenceValue('modeloId');

    // Dado que los campos de texto de `req.body` vienen como strings, necesitamos convertir algunos a su tipo correcto
    const modeloData = {
      nombreModelo: req.body.nombreModelo,
      categoriaModelo: req.body.categoriaModelo,
      marcaModelo: req.body.marcaModelo,
      precioXdia: parseFloat(req.body.precioXdia),
      anio: parseInt(req.body.anio),
      color: req.body.color,
      dimensiones: req.body.dimensiones,
      cantidadAsientos: parseInt(req.body.cantidadAsientos),
      cantidadPuertas: parseInt(req.body.cantidadPuertas),
      motor: req.body.motor,
      cajaTransmision: req.body.cajaTransmision,
      tipoCombustible: req.body.tipoCombustible,
      capacidadTanqueCombustible: parseFloat(req.body.capacidadTanqueCombustible),
      capacidadBaul: parseFloat(req.body.capacidadBaul),
      images: req.files['images'] ? req.files['images'].map(file => `/uploads/${file.filename}`) : []
    };

    // Crea el modelo con los datos procesados
    const nuevoModelo = new Modelo({ ...modeloData, _id });
    await nuevoModelo.save();

    res.status(201).json(nuevoModelo);
  } catch (error) {
    console.log('Error al crear el modelo:', error);
    res.status(500).json({ message: 'Hubo un error', error: error.message });
  }
};


exports.obtenerModelos = async (req, res) => {
  try {
    // Obtener todos los modelos
    const modelos = await Modelo.find();

    // Para cada modelo, busca la categoría y marca asociadas por sus IDs
    const modelosConDetalles = await Promise.all(
      modelos.map(async (modelo) => {
        const categoria = await Categoria.findById(modelo.categoriaModelo); // Cambia 'categoriaModelo' si es necesario
        const marca = await Marca.findById(modelo.marcaModelo); // Cambia 'marcaModelo' si es necesario
        return {
          ...modelo._doc, // Contenido del modelo
          nombreCategoria: categoria ? categoria.nombre : "Categoría no encontrada", // Ajusta 'nombre' al campo en Categoria
          nombreMarca: marca ? marca.nombre : "Marca no encontrada" // Ajusta 'nombre' al campo en Marca
        };
      })
    );

    res.json(modelosConDetalles);
  } catch (error) {
    console.error("Error al obtener modelos con detalles:", error);
    res.status(500).send("Hubo un error al obtener los modelos");
  }
};

exports.actualizarModelo = async (req, res) => {
  try {
    const { nombreModelo, marcaModelo, categoriaModelo, precioXdia, anio, color, dimensiones, cantidadAsientos, cantidadPuertas, motor, cajaTransmision, tipoCombustible, capacidadTanqueCombustible, capacidadBaul } = req.body;
    let modeloExistente = await Modelo.findById(req.params.id);

    if (!modeloExistente) {
      return res.status(404).json({ msg: 'No existe ese modelo' });
    }

    // Actualizamos los campos del modelo
    modeloExistente.nombreModelo = nombreModelo;
    modeloExistente.marcaModelo = marcaModelo;
    modeloExistente.categoriaModelo = categoriaModelo;
    modeloExistente.precioXdia = precioXdia;
    modeloExistente.anio = anio;
    modeloExistente.color = color;
    modeloExistente.dimensiones = dimensiones;
    modeloExistente.cantidadAsientos = cantidadAsientos;
    modeloExistente.cantidadPuertas = cantidadPuertas;
    modeloExistente.motor = motor;
    modeloExistente.cajaTransmision = cajaTransmision;
    modeloExistente.tipoCombustible = tipoCombustible;
    modeloExistente.capacidadTanqueCombustible = capacidadTanqueCombustible;
    modeloExistente.capacidadBaul = capacidadBaul;

    modeloExistente = await Modelo.findOneAndUpdate(
      { _id: req.params.id },
      modeloExistente,
      { new: true }
    );
    res.json(modeloExistente);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerModelo = async (req, res) => {
  try {
    let modeloEncontrado = await Modelo.findById(req.params.id).populate('categoriaModelo').populate('marcaModelo');
    
    if (!modeloEncontrado) {
      return res.status(404).json({ msg: 'No existe ese modelo' });
    }

    res.json(modeloEncontrado);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.eliminarModelo = async (req, res) => {
  try {
    let modelo = await Modelo.findById(req.params.id);

    if (!modelo) {
      return res.status(404).json({ msg: 'No existe ese modelo' });
    }

    await Modelo.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Modelo eliminado con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Usado en el alquiler
exports.buscarAutoAleatorioDisponible = async (req, res) => {
  try {
    const { idModelo, idSucursal } = req.body;

    // Buscar autos que coincidan con el modelo, estén en la sucursal indicada y estén disponibles
    const autosDisponibles = await Auto.find({
      modeloAuto: idModelo,
      sucursalAuto: idSucursal,
      estadoAuto: 'disponible'
    });

    if (autosDisponibles.length === 0) {
      return res.status(404).json({ message: 'No se encontraron autos disponibles para el modelo y sucursal especificados.' });
    }

    // Seleccionar un auto aleatorio de la lista de autos disponibles
    const autoAleatorio = autosDisponibles[Math.floor(Math.random() * autosDisponibles.length)];  // Si hay más de uno, agarro uno aleatorio
    res.json(autoAleatorio);
  } catch (error) {
    console.error("Error al buscar auto aleatorio disponible:", error);
    res.status(500).json({ message: "Error al buscar auto aleatorio disponible" });
  }
};
