const Categoria = require("../models/categoria");
const Modelo = require('../models/modelo');
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

// Especifico
exports.obtenerCategoriaPorNombre = async (req, res) => {
  try {
    const nombreCategoria = req.params.nombreCategoria;
    const categoria = await Categoria.find({ nombreCategoria: nombreCategoria });

    if (categoria.length > 0) {
      res.status(200).json(categoria);
    } else {
      res.json(categoria);
    }
  } catch (error) {
    console.error('Error al buscar la categoria:', error);
    res.status(500).json({ message: 'Error en el servidor al buscar la categoria' });
  }
};

exports.obtenerModelosPorCategoria = async (req, res) => {
  try {
    const idCategoria = req.params.idCategoria;
    const modelos = await Modelo.find({ categoriaModelo: idCategoria }).populate('categoriaModelo');  // elimina '._id' y usa populate si es una referencia

    if (!modelos || modelos.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron modelos para esta categoría' });
    }

    res.json(modelos);
  } catch (error) {
    console.error('Error al obtener modelos por categoría:', error);
    res.status(500).send('Hubo un error');
  }
};

exports.verificarModelosPorCategoria = async (req, res) => {
  try {
    const idCategoria = req.params.idCategoria;
    const modelos = await Modelo.find({ categoriaModelo: idCategoria });
    const existenModelos = modelos.length > 0;
    res.json(existenModelos);
  } catch (error) {
    console.error('Error al verificar modelos para la categoría:', error);
    res.status(500).send('Hubo un error');
  }
};