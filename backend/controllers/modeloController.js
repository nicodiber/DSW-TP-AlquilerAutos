const Modelo = require("../models/modelo");
const Auto = require("../models/auto");
const { getNextSequenceValue } = require('../config/db');

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
    // Obtener todos los modelos con los detalles de categoría y marca actualizarModelo
    const modelosConDetalles = await Modelo.find().populate('categoriaModelo').populate('marcaModelo');
    
    res.json(modelosConDetalles);
  } catch (error) {
    console.error("Error al obtener modelos con detalles:", error);
    res.status(500).send("Hubo un error al obtener los modelos");
  }
};

//nuevo
exports.actualizarModelo = async (req, res) => {
  try {
    console.log('req.body:', req.body); // Verifica que `req.body` contenga los campos de texto
    console.log('req.files:', req.files); // Verifica que `req.files` contenga las imágenes

    // Buscar el modelo a editar
    const modeloExistente = await Modelo.findById(req.params.id);
    if (!modeloExistente) {
      return res.status(404).json({ msg: 'No existe ese modelo' });
    }

    // Si hay nuevas imágenes, las agregamos o las reemplazamos
    const images = req.files['images'] ? req.files['images'].map(file => `/uploads/${file.filename}`) : modeloExistente.images;

    // Dado que los campos de texto de `req.body` vienen como strings, necesitamos convertir algunos a su tipo correcto
    const modeloData = {
      nombreModelo: req.body.nombreModelo || modeloExistente.nombreModelo,
      categoriaModelo: req.body.categoriaModelo || modeloExistente.categoriaModelo,
      marcaModelo: req.body.marcaModelo || modeloExistente.marcaModelo,
      precioXdia: req.body.precioXdia ? parseFloat(req.body.precioXdia) : modeloExistente.precioXdia,
      anio: req.body.anio ? parseInt(req.body.anio) : modeloExistente.anio,
      color: req.body.color || modeloExistente.color,
      dimensiones: req.body.dimensiones || modeloExistente.dimensiones,
      cantidadAsientos: req.body.cantidadAsientos ? parseInt(req.body.cantidadAsientos) : modeloExistente.cantidadAsientos,
      cantidadPuertas: req.body.cantidadPuertas ? parseInt(req.body.cantidadPuertas) : modeloExistente.cantidadPuertas,
      motor: req.body.motor || modeloExistente.motor,
      cajaTransmision: req.body.cajaTransmision || modeloExistente.cajaTransmision,
      tipoCombustible: req.body.tipoCombustible || modeloExistente.tipoCombustible,
      capacidadTanqueCombustible: req.body.capacidadTanqueCombustible ? parseFloat(req.body.capacidadTanqueCombustible) : modeloExistente.capacidadTanqueCombustible,
      capacidadBaul: req.body.capacidadBaul ? parseFloat(req.body.capacidadBaul) : modeloExistente.capacidadBaul,
      images // Mantiene las imágenes si no se han enviado nuevas
    };

    // Actualiza el modelo con los datos procesados
    const modeloActualizado = await Modelo.findByIdAndUpdate(req.params.id, modeloData, { new: true, runValidators: true });

    if (!modeloActualizado) {
      return res.status(404).json({ msg: 'No se pudo actualizar el modelo' });
    }

    res.json(modeloActualizado);
  } catch (error) {
    console.log('Error al editar el modelo:', error);
    res.status(500).json({ message: 'Hubo un error', error: error.message });
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
