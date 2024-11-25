const Marca = require("../models/marca");
const Modelo = require('../models/modelo');
const { getNextSequenceValue } = require('../config/db');

exports.crearMarca = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('marcaId');
    let marca = new Marca({ ...req.body, _id });

    await marca.save();
    res.send(marca);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerMarcas = async (req, res) => {
  try {
    const marcas = await Marca.find();
    res.json(marcas);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.actualizarMarca = async (req, res) => {
  try {
    const { nombreMarca } = req.body;
    let marca = await Marca.findById(req.params.id);

    if (!marca) {
      res.status(404).json({ msg: 'No existe esa marca' });
      return;
    }

    marca.nombreMarca = nombreMarca;

    marca = await Marca.findOneAndUpdate({ _id: req.params.id }, marca, { new: true });
    res.json(marca);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerMarca = async (req, res) => {
  try {
    let marca = await Marca.findById(req.params.id);

    if (!marca) {
      res.status(404).json({ msg: 'No existe esa marca' });
      return;
    }

    res.json(marca);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.eliminarMarca = async (req, res) => {
  try {
    let marca = await Marca.findById(req.params.id);

    if (!marca) {
      res.status(404).json({ msg: 'No existe esa marca' });
      return;
    }

    await Marca.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Marca eliminada con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Especifico
exports.obtenerMarcaPorNombre = async (req, res) => {
  try {
    const nombreMarca = req.params.nombreMarca;
    const marca = await Marca.find({ nombreMarca: { $regex: new RegExp(`^${nombreMarca}$`, 'i') } });

    if (marca.length > 0) {
      res.status(200).json(marca);
    } else {
      res.json(marca);
    }
  } catch (error) {
    console.error('Error al buscar la marca:', error);
    res.status(500).json({ message: 'Error en el servidor al buscar la marca' });
  }
};

exports.obtenerModelosPorMarca = async (req, res) => {
  try {
    const idMarca = req.params.idMarca;
    const modelos = await Modelo.find({ marcaModelo: idMarca }).populate('marcaModelo');  // elimina '._id' y usa populate si es una referencia;

    res.json(modelos);
  } catch (error) {
    console.error('Error al obtener modelos por marca:', error);
    res.status(500).send('Hubo un error');
  }
};

exports.verificarModelosPorMarca = async (req, res) => {
  try {
    const idMarca = req.params.idMarca;
    const modelos = await Modelo.find({ marcaModelo: idMarca });
    const existenModelos = modelos.length > 0;
    res.json(existenModelos);
  } catch (error) {
    console.error('Error al verificar modelos para la marca:', error);
    res.status(500).send('Hubo un error');
  }
};