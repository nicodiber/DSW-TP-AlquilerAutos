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

exports.crearMantenimientoAlquiler = async (req, res) => {
  console.log("Holaaaa");
  try {
    const _id = await getNextSequenceValue('mantenimientoId');
    const { idAuto } = req.params; 
    console.log('ID Auto:', idAuto);

    let mantenimiento = new Mantenimiento({
      _id,
      auto: idAuto,
      trabajadorACargo: null,
      fechaInicioMantenimiento: new Date().toISOString().replace('Z', '+00:00'),
      fechaFinMantenimiento: null,
      descripcion: null,
      costoMantenimiento: null
    });
    console.log('Mantenimiento:', mantenimiento);

    await mantenimiento.save();
    res.json(mantenimiento);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Hubo un error al crear el mantenimiento');
  }
};

exports.obtenerMantenimientos = async (req, res) => {
  try {
    const mantenimientos = await Mantenimiento.find().populate('auto').populate('trabajadorACargo');
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

exports.crearMantenimientoAlquiler = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('mantenimientoId');
    const { idAuto } = req.params; 
    console.log('ID Auto:', idAuto);

    let mantenimiento = new Mantenimiento({
      _id,
      auto: idAuto,
      trabajadorACargo: null,
      fechaInicioMantenimiento: new Date().toISOString().replace('Z', '+00:00'),
      fechaFinMantenimiento: null,
      descripcion: null,
      costoMantenimiento: null
    });
    console.log('Mantenimiento:', mantenimiento);

    await mantenimiento.save();
    res.json(mantenimiento);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Hubo un error al crear el mantenimiento');
  }
};



// Obtener los trabajadores disponibles para un mantenimiento, filtrados por la sucursal del auto
exports.obtenerTrabajadoresSucursal = async (req, res) => {
  try {
    const { idAuto } = req.params;  // Tomamos el id del auto
    const auto = await Auto.findById(idAuto);  // Supongo que el modelo de Auto está disponible

    if (!auto) {
      return res.status(404).json({ msg: 'Auto no encontrado' });
    }

    // Filtramos a los trabajadores por la sucursal del auto
    const trabajadores = await Usuario.find({ 
      rol: 'trabajador', 
      sucursal: auto.sucursal  // Asumiendo que el auto tiene un campo 'sucursal' que refiere a la sucursal
    });

    res.json(trabajadores);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener los trabajadores');
  }
};