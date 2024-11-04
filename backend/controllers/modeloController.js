const Modelo = require("../models/modelo");
const { getNextSequenceValue } = require('../config/db');
const multer = require('multer');
const path = require('path');

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

exports.obtenerModelos = async (req, res) => {
  try {
    // Usamos populate para obtener los detalles de la categoria asociada
    const modelos = await Modelo.find().populate('categoriaModelo');
    res.json(modelos);
    // FALTA TRAER  LAS MARCAS, YA TRAEMOS CATEGORIA
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.actualizarModelo = async (req, res) => {
  try {
    const { nombreModelo, marcaModelo, categoriaModelo, precioXdia, anio, color, dimensiones,  cantidadAsientos, cantidadPuertas, motor, cajaTransmision, tipoCombustible, capacidadTanqueCombustible, capacidadBaul } = req.body;
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
    let modeloEncontrado = await Modelo.findById(req.params.id).populate('categoriaModelo');
    // FALTA TRAER  LA MARCA, YA TRAEMOS CATEGORIA
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


/* MULTER */

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../assets/modelo-dominio.png'); // Carpeta donde se almacenarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre de archivo único
    }
});

// Crear el middleware de multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limitar tamaño a 5MB por imagen
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes con extensiones JPEG, JPG, PNG o GIF'));
        }
    }
}).array('images', 5); // Permite hasta 5 imágenes

// Ruta para crear un modelo con subida de imágenes
app.post('/api/modelos', upload, async (req, res) => {
    try {
        const modeloData = req.body;
        const images = req.files.map(file => file.path); // Obtiene las rutas de las imágenes subidas

        // Guardar el modelo junto con las rutas de las imágenes
        const nuevoModelo = new Modelo({ ...modeloData, images });
        await nuevoModelo.save();

        res.status(201).json(nuevoModelo);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el modelo', error: error.message });
    }
});