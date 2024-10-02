const Categoria = require("../models/categoria");
const { getNextSequenceValue } = require('../config/db');

exports.crearCategoria = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('categoriaId');
    let categoria = new Categoria({ ...req.body, _id });

    await categoria.save();
    res.send(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.actualizarCategoria = async (req, res) => {
  try {
    const { nombreCategoria } = req.body;
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      res.status(404).json({ msg: 'No existe esa categoria' });
      return;
    }

    categoria.nombreCategoria = nombreCategoria;

    nombreCategoria = await Categoria.findOneAndUpdate({ _id: req.params.id }, nombreCategoria, { new: true });
    res.json(nombreCategoria);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerCategoria = async (req, res) => {
  try {
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      res.status(404).json({ msg: 'No existe esa categoria' });
      return;
    }

    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.eliminarCategoria = async (req, res) => {
  try {
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      res.status(404).json({ msg: 'No existe esa categoria' });
      return;
    }

    await Categoria.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Categoria eliminada con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};
