const Mantenimiento = require("../models/mantenimiento");
const Auto = require("../models/auto");
const { Alquiler } = require("../models/alquiler");
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

exports.obtenerTrabajadoresPorSucursal = async (req, res) => {
  const sucursalId = parseInt(req.params.sucursalId, 10); // Pasamos el id a number
  try {
    const sucursal = await Sucursal.findOne({ _id: sucursalId }).populate('trabajadores');
    const trabajadoresId = sucursal.trabajadores;
    res.json(trabajadoresId);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener trabajadores para la sucursal' });
  }
};

exports.modificarDescripcion = async (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;
  try {
    const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, { descripcion }, { new: true });
    res.json(mantenimiento);
  } catch (error) {
    res.status(500).send('Error al actualizar la descripcion');
  }
};

exports.modificarCosto = async (req, res) => {
  const { id } = req.params;
  const { costoMantenimiento } = req.body;
  try {
    const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, { costoMantenimiento }, { new: true });
    res.json(mantenimiento);
  } catch (error) {
    res.status(500).send('Error al actualizar las notas');
  }
};

exports.modificarTrabajador = async (req, res) => {
  const { id } = req.params;
  const { trabajadorACargo } = req.body;
  try {
    const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, { trabajadorACargo }, { new: true });
    res.json(mantenimiento);
  } catch (error) {
    res.status(500).send('Error al actualizar el trabajador a cargo');
  }
};

exports.establecerFechaFinMantenimiento= async (req, res) => {
  const { id } = req.params;
  const { fechaFinMantenimiento } = req.body;

  try {
    // Convertir fechaFinMantenimiento a un objeto Date
    const fechaFinDate = new Date(fechaFinMantenimiento);
    // Guardar la fecha en la base de datos
    const mantenimiento = await Mantenimiento.findByIdAndUpdate(
      id,
      { fechaFinMantenimiento : fechaFinDate },
      { new: true }
    );

    if (!mantenimiento ) {
      return res.status(404).json({ mensaje: 'Mantenimiento no encontrado' });
    }

    res.json(mantenimiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la fecha de fin mantenimiento' });
  }
};

exports.actualizarEstadoAuto = async (req, res) => {
  try {
    const { idAuto } = req.params;

    // Verificar si el auto está asociado a otros alquileres en estado "reservado"
    const alquileres = await Alquiler.find({
      "auto": idAuto,
      "estadoAlquiler": { $in: ["reservado"] }
    });

    if (alquileres.length > 0) {
      // Si hay otros alquileres reservados que lo involucren, pasarlo a 'reservado'
      const auto = await Auto.findByIdAndUpdate(idAuto, { estadoAuto: 'reservado' }, { new: true });
    if (!auto) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }
    console.log(auto, "1");
    }
    else {
    // Si no hay otros alquileres reservados que lo involucren, pasarlo a 'disponible'
    const auto = await Auto.findByIdAndUpdate(idAuto, { estadoAuto: 'disponible' }, { new: true });
    if (!auto) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }
    console.log(auto, "2");
    }

    res.json(auto);
  } catch (error) {
    console.error("Error al actualizar el estado del auto:", error);
    res.status(500).json({ message: "Error al actualizar el estado del auto" });
  }
};