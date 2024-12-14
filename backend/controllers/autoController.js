const Auto = require("../models/auto");
const Sucursal = require("../models/sucursal");
const { Alquiler } = require('../models/alquiler');
const { getNextSequenceValue } = require('../config/db');

exports.crearAuto = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('autoId');
    const {
      modeloAuto,
      sucursalAuto,
      historialMantenimiento = undefined,
      estadoAuto = 'disponible',
      matricula
    } = req.body;

    // Verificar que las referencias existen
    const sucursal = await Sucursal.findById(sucursalAuto);
    if (!sucursal) {
      return res.status(404).json({ msg: 'La sucursal no existe' });
    }

    let auto = new Auto({
      _id,
      modeloAuto,
      sucursalAuto,
      historialMantenimiento,
      estadoAuto,
      matricula
    });

    await auto.save();

    // Añadir el auto al array de autos de la sucursal
    sucursal.autos.push(auto._id);
    await sucursal.save();

    res.json(auto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al crear el auto');
  }
};

exports.obtenerAutos = async (req, res) => {
  try {
    const autos = await Auto.find()
    .populate('modeloAuto')
    .populate('sucursalAuto');
    res.json(autos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener los autos');
  }
};

exports.obtenerAuto = async (req, res) => {
  try {
    const auto = await Auto.findById(req.params.id)
      .populate('modeloAuto')
      .populate('sucursalAuto');

    if (!auto) {
      return res.status(404).json({ msg: 'No existe ese auto' });
    }

    res.json(auto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener el auto');
  }
};

exports.actualizarAuto = async (req, res) => {
  try {
    const {
      modeloAuto,
      sucursalAuto,
      historialMantenimiento,
      estadoAuto,
      matricula
    } = req.body;

    let auto = await Auto.findById(req.params.id);

    if (!auto) {
      return res.status(404).json({ msg: 'No existe ese auto' });
    }

    // Verificar si se está intentando cambiar la sucursal
    if (sucursalAuto && !(await Sucursal.findById(sucursalAuto))) {
      return res.status(404).json({ msg: 'La sucursal no existe' });
    }

    // Actualizar el auto con los nuevos datos
    auto.modeloAuto = modeloAuto;
    auto.sucursalAuto = sucursalAuto;
    auto.historialMantenimiento = historialMantenimiento;
    auto.estadoAuto = estadoAuto;
    auto.matricula = matricula;

    auto = await Auto.findOneAndUpdate({ _id: req.params.id }, auto, { new: true });
    res.json(auto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar el auto');
  }
};

exports.eliminarAuto = async (req, res) => {
  try {
    const autoId = req.params.id;

    // Verificar si existe algún alquiler con el auto y un estado distinto de "completado"
    const alquilerRelacionado = await Alquiler.findOne({
      auto: autoId,
      estadoAlquiler: { $nin: ['completado', 'cancelado'] }
    });

    if (alquilerRelacionado) {
      return res.status(400).json({ msg: 'No se puede eliminar el Auto porque está involucrado en un alquiler.' });
    }

    const auto = await Auto.findById(autoId);
    // Si no hay alquileres activos o pendientes, proceder con la eliminación
    await Auto.findByIdAndDelete(autoId);
    // Eliminar el ID del auto del array autos en la sucursal
    await Sucursal.findByIdAndUpdate(
      auto.sucursalAuto,
      { $pull: { autos: autoId } }
    );

    res.json({ msg: 'Auto eliminado con éxito' });
  } catch (error) {
    console.error("Error al intentar eliminar el Auto:", error);
    res.status(500).send('Hubo un error al eliminar el Auto');
  }
};

// Reservar el estado de un auto debido al alquiler
exports.reservarEstadoAuto = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const auto = await Auto.findByIdAndUpdate(id, { estadoAuto: estado }, { new: true });
    if (!auto) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }

    res.json(auto);
  } catch (error) {
    console.error("Error al actualizar el estado del auto:", error);
    res.status(500).json({ message: "Error al actualizar el estado del auto" });
  }
};

exports.actualizarEstadoAuto = async (req, res) => {
  try {
    const { idAlquiler, idAuto } = req.params; // ID del auto
    const { estado } = req.body; // Estado solicitado para actualizar

    // Verificar si el auto está asociado a otros alquileres en estado "reservado" o "activo"
    const alquileres = await Alquiler.find({
      "_id": { $ne: idAlquiler }, // Excluir el alquiler actual
      "auto": idAuto,
      "estadoAlquiler": { $in: ["reservado", "activo"] }
    });

    if (alquileres.length > 0) {
      // Si hay otros alquileres activos o reservados, no permitir actualizar el estado
      return res.status(400).json({
        message: "El auto está relacionado con otros alquileres activos o reservados, no se actualizará su estado."
      });
    }

    // Actualizar el estado del auto porque no está relacionado con otros alquileres activos o reservados
    const auto = await Auto.findByIdAndUpdate(idAuto, { estadoAuto: estado }, { new: true });
    if (!auto) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }

    res.json(auto);
  } catch (error) {
    console.error("Error al actualizar el estado del auto:", error);
    res.status(500).json({ message: "Error al actualizar el estado del auto" });
  }
};

exports.actualizarSucursalAuto = async (req, res) => {
  try {
    const { id } = req.params;
    const { sucursalId } = req.body;

    // Actualiza el auto y establece la nueva sucursal
    const auto = await Auto.findByIdAndUpdate(id, { sucursalAuto: sucursalId }, { new: true });
    if (!auto) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }

    res.json(auto);  // Envía el auto actualizado como respuesta
  } catch (error) {
    console.error("Error al actualizar la sucursal del auto:", error);
    res.status(500).json({ message: "Error al actualizar la sucursal del auto" });
  }
};

// Obtener autos disponibles
exports.obtenerAutosDisponibles = (req, res) => {
  Auto.find({ estadoAuto: 'disponible' })
    .then(autos => res.json(autos))
    .catch(err => res.status(500).json({ message: 'Error al obtener autos', error: err }));
};

// Cambiar estado de un auto
exports.cambiarEstado = (req, res) => {
  const { id } = req.params;
  const { estadoAuto } = req.body;

  Auto.findByIdAndUpdate(id, { estadoAuto: estadoAuto }, { new: true })
    .then(auto => res.json(auto))
    .catch(err => res.status(500).json({ message: 'Error al cambiar estado', error: err }));
};