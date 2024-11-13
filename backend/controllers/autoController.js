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

    // Si no hay alquileres activos o pendientes, proceder con la eliminación
    await Auto.findByIdAndDelete(autoId);
    res.json({ msg: 'Auto eliminado con éxito' });
  } catch (error) {
    console.error("Error al intentar eliminar el Auto:", error);
    res.status(500).send('Hubo un error al eliminar el Auto');
  }
};



// Actualizar el estado de un auto debido al alquiler
exports.actualizarEstadoAuto = async (req, res) => {
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

exports.actualizarSucursalAuto = async (req, res) => {
  try {
    const { id } = req.params;  // Cambia a `id` para coincidir con la ruta o ajusta la ruta
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
