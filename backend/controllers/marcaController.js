const Marca = require("../models/marca");
const { getNextSequenceValue } = require('../config/db');

// Crear una nueva marca
exports.crearMarca = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('marcaId');  // Generar un ID único
    let marca = new Marca({ ...req.body, _id });  // Crear la marca con los datos recibidos

    await marca.save();  // Guardar la nueva marca en la base de datos
    res.send(marca);  // Devolver la marca creada como respuesta
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Obtener todas las marcas
exports.obtenerMarcas = async (req, res) => {
  try {
    const marcas = await Marca.find();  // Buscar todas las marcas en la base de datos
    res.json(marcas);  // Devolver todas las marcas como respuesta
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Obtener una marca por ID
exports.obtenerMarca = async (req, res) => {
  try {
    let marca = await Marca.findById(req.params.id);  // Buscar la marca por ID

    if (!marca) {
      return res.status(404).json({ msg: 'No existe esa marca' });
    }

    res.json(marca);  // Devolver la marca encontrada como respuesta
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Actualizar una marca por ID
exports.actualizarMarca = async (req, res) => {
  try {
    const { nombreMarca } = req.body;  // Extraer el nuevo nombre de la marca
    let marca = await Marca.findById(req.params.id);  // Buscar la marca por ID

    if (!marca) {
      return res.status(404).json({ msg: 'No existe esa marca' });
    }

    marca.nombreMarca = nombreMarca;  // Actualizar el nombre de la marca

    const marcaActualizada = await marca.save();  // Guardar la marca actualizada
    res.json(marcaActualizada);  // Devolver la marca actualizada como respuesta
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Eliminar una marca por ID
exports.eliminarMarca = async (req, res) => {
  try {
    let marca = await Marca.findById(req.params.id);  // Buscar la marca por ID

    if (!marca) {
      return res.status(404).json({ msg: 'No existe esa marca' });
    }

    await Marca.findOneAndDelete({ _id: req.params.id });  // Eliminar la marca
    res.json({ msg: 'Marca eliminada con éxito' });  // Responder con mensaje de éxito
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};
