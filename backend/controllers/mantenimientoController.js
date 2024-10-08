const Mantenimiento = require("../models/mantenimiento");
const { getNextSequenceValue } = require('../config/db');

exports.crearMantenimiento = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('mantenimientoId');
    const { auto, trabajadorACargo, fechaInicioMantenimiento, fechaFinMantenimiento, descripcion, costoMantenimiento } = req.body;

    let mantenimiento = new Mantenimiento({
      _id,
      auto,
      trabajadorACargo,
      fechaInicioMantenimiento,
      fechaFinMantenimiento,
      descripcion,
      costoMantenimiento
    });

    await mantenimiento.save();
    res.json(mantenimiento);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al crear el mantenimiento');
  }
};

exports.obtenerMantenimientos = async (req, res) => {
  try {
    const mantenimientos = await Mantenimiento.find();
    res.json(mantenimientos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener los mantenimientos');
  }
};

exports.actualizarMantenimiento = async (req, res) => {
  try {
    const { auto, trabajadorACargo, fechaInicioMantenimiento, fechaFinMantenimiento, descripcion, costoMantenimiento } = req.body;

    let mantenimiento = await Mantenimiento.findById(req.params.id);

    if (!mantenimiento) {
      return res.status(404).json({ msg: 'No existe ese mantenimiento' });
    }

    mantenimiento.auto = auto;
    mantenimiento.trabajadorACargo = trabajadorACargo;
    mantenimiento.fechaInicioMantenimiento = fechaInicioMantenimiento;
    mantenimiento.fechaFinMantenimiento = fechaFinMantenimiento;
    mantenimiento.descripcion = descripcion;
    mantenimiento.costoMantenimiento = costoMantenimiento;

    mantenimiento = await Mantenimiento.findOneAndUpdate({ _id: req.params.id }, mantenimiento, { new: true });
    res.json(mantenimiento);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar el mantenimiento');
  }
};

exports.obtenerMantenimiento = async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findById(req.params.id);

    if (!mantenimiento) {
      return res.status(404).json({ msg: 'No existe ese mantenimiento' });
    }

    res.json(mantenimiento);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener el mantenimiento');
  }
};

exports.eliminarMantenimiento = async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findById(req.params.id);

    if (!mantenimiento) {
      return res.status(404).json({ msg: 'No existe ese mantenimiento' });
    }

    await Mantenimiento.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Mantenimiento eliminado con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar el mantenimiento');
  }
};
