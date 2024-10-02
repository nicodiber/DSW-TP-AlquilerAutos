const Marca = require("../models/marca");
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

    nombreMarca = await Marca.findOneAndUpdate({ _id: req.params.id }, nombreMarca, { new: true });
    res.json(nombreMarca);
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
