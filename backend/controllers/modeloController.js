const Modelo = require("../models/modelo");
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

exports.obtenerModelos = async (req, res) => {
  try {
    // Usamos populate para obtener los detalles del tipo asociado
    const modelos = await Modelo.find().populate('tipoModelo');
    res.json(modelos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.actualizarModelo = async (req, res) => {
  try {
    const { nombreModelo, tipoModelo, anioModelo, colorModelo, dimensionesModelo,  cantidadAsientosModelo, cantidadPuertasModelo, motorModelo, cajaTransmisionModelo, tipoCombustibleModelo, capacidadTanqueCombustibleModelo, capacidadBaulModelo, precioModelo } = req.body;
    let modeloExistente = await Modelo.findById(req.params.id);

    if (!modeloExistente) {
      return res.status(404).json({ msg: 'No existe ese modelo' });
    }

    // Actualizamos los campos del modelo
    modeloExistente.nombreModelo = nombreModelo;
    modeloExistente.tipoModelo = tipoModelo; // Actualizamos también el tipo
    modeloExistente.anioModelo = anioModelo;
    modeloExistente.colorModelo = colorModelo;
    modeloExistente.dimensionesModelo = dimensionesModelo;
    modeloExistente.cantidadAsientosModelo = cantidadAsientosModelo;
    modeloExistente.cantidadPuertasModelo = cantidadPuertasModelo;
    modeloExistente.motorModelo = motorModelo;
    modeloExistente.cajaTransmisionModelo = cajaTransmisionModelo;
    modeloExistente.tipoCombustibleModelo = tipoCombustibleModelo;
    modeloExistente.capacidadTanqueCombustibleModelo = capacidadTanqueCombustibleModelo;
    modeloExistente.capacidadBaulModelo = capacidadBaulModelo;
    modeloExistente.precioModelo = precioModelo;
    
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
    let modeloEncontrado = await Modelo.findById(req.params.id).populate('tipoModelo');

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
