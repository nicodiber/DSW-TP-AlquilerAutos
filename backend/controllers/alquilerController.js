const { Alquiler } = require('../models/alquiler'); // Importa el modelo Alquiler correctamente
const Auto = require("../models/auto");
const Modelo = require("../models/modelo");
const { getNextSequenceValue } = require('../config/db');

// Crear un nuevo alquiler
exports.crearAlquiler = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('alquilerId'); // Obtener un nuevo ID secuencial
    const {
      usuario,
      auto,
      sucursalEntrega,
      sucursalDevolucion,
      trabajadorAsignado,
      fechaInicio,
      fechaFin,
      fechaInicioReal,
      fechaFinReal,
      notas,
      precioTotalAlquiler,
      estadoAlquiler
    } = req.body;

    const alquiler = new Alquiler({
      _id,
      usuario,
      auto,
      sucursalEntrega,
      sucursalDevolucion,
      trabajadorAsignado,
      fechaInicio,
      fechaFin,
      fechaInicioReal,
      fechaFinReal,
      notas,
      precioTotalAlquiler,
      estadoAlquiler
    });

    await alquiler.save();
    res.json(alquiler);
  } catch (error) {
    console.error('Error al crear el alquiler:', error);
    res.status(500).json({ message: 'Hubo un error al crear el alquiler', error });
  }
};

// Obtener todos los alquileres
exports.obtenerAlquileres = async (req, res) => {
  try {
    const alquileres = await Alquiler.find()
      .populate('usuario') 
      .populate('auto') 
      .populate('sucursalEntrega')
      .populate('sucursalDevolucion') 
      .populate('trabajadorAsignado');

    res.json(alquileres);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener los alquileres');
  }
};

// Obtener un alquiler por ID
exports.obtenerAlquiler = async (req, res) => {
  try {
    const alquiler = await Alquiler.findById(req.params.id)
      .populate('usuario')
      .populate('auto')
      .populate('sucursalEntrega')
      .populate('sucursalDevolucion')
      .populate('trabajadorAsignado');
    if (!alquiler) {
      return res.status(404).json({ msg: 'No existe ese alquiler' });
    }

    res.json(alquiler);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener el alquiler');
  }
};

// Especificos
exports.establecerFechaInicioReal = async (req, res) => {
  const { id } = req.params;
  const { fechaInicioReal } = req.body;

  try {
    // Convertir fechaInicioReal a un objeto Date
    const fechaInicioDate = new Date(fechaInicioReal);
    // Guardar la fecha en la base de datos
    const alquiler = await Alquiler.findByIdAndUpdate(
      id,
      { fechaInicioReal: fechaInicioDate },
      { new: true }
    );

    if (!alquiler) {
      return res.status(404).json({ mensaje: 'Alquiler no encontrado' });
    }

    res.json(alquiler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la fecha de inicio real' });
  }
};

exports.establecerFechaFinReal = async (req, res) => {
  const { id } = req.params;
  const { fechaFinReal } = req.body;

  try {
    // Convertir fechaFinReal a un objeto Date
    const fechaFinDate = new Date(fechaFinReal);
    // Guardar la fecha en la base de datos
    const alquiler = await Alquiler.findByIdAndUpdate(
      id,
      { fechaFinReal: fechaFinDate },
      { new: true }
    );

    if (!alquiler) {
      return res.status(404).json({ mensaje: 'Alquiler no encontrado' });
    }

    res.json(alquiler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la fecha de fin real' });
  }
};

exports.modificarNotas = async (req, res) => {
  const { id } = req.params;
  const { notas } = req.body;
  try {
    const alquiler = await Alquiler.findByIdAndUpdate(id, { notas }, { new: true });
    res.json(alquiler);
  } catch (error) {
    res.status(500).send('Error al actualizar las notas');
  }
};

exports.modificarTrabajador = async (req, res) => {
  const { id } = req.params;
  const { trabajadorAsignado } = req.body;
  try {
    const alquiler = await Alquiler.findByIdAndUpdate(id, { trabajadorAsignado }, { new: true });
    res.json(alquiler);
  } catch (error) {
    res.status(500).send('Error al actualizar el trabajador asignado');
  }
};

exports.cambiarEstado = async (req, res) => {
  const { id } = req.params;
  const { estadoAlquiler } = req.body;
  try {
    const alquiler = await Alquiler.findByIdAndUpdate(id, { estadoAlquiler }, { new: true });
    res.json(alquiler);
  } catch (error) {
    res.status(500).send('Error al actualizar el estado');
  }
};

// Usado en el buscador
exports.buscarModelosDisponibles = async (req, res) => {
  try {
    const { sucursalRetiro, fechaRetiro } = req.body;

    // Paso 1: Filtrar autos disponibles en la sucursal de retiro elegida
    const autosDisponibles = await Auto.find({ sucursalAuto: sucursalRetiro._id, estadoAuto: 'disponible' });

    // Paso 2: Filtrar autos reservados y/o alquilado pero cuyo alquiler en el que esta involucrado tiene fecha fin anterior a fecha retiro del buscador 
    // y cuya id sucursal devolución sea igual al id sucursal retiro del buscador
    const autosReservadosOAlquilados = await Auto.find({ estadoAuto: { $in: ['reservado', 'alquilado'] } });
    const autoIdsReservadosOAlquilados = autosReservadosOAlquilados.map(auto => auto._id);
    console.log("autoIdsReservadosOAlquilados", autoIdsReservadosOAlquilados);
    const AlquileresValidos = await Alquiler.find({
      auto: { $in: autoIdsReservadosOAlquilados }, fechaFin: { $lt: new Date(fechaRetiro) }, sucursalDevolucion: sucursalRetiro._id
    });

    const autosValidosIds = AlquileresValidos.map(alquiler => alquiler.auto); // Aca tengo los ids de los autos validos según condicion anterior
    console.log("autosValidosIds", autosValidosIds);
    const autosCoincidentesIds = [
      ...autosDisponibles.map(auto => auto._id),
      ...autosValidosIds
    ]
    console.log("autosCoincidentesIds", autosCoincidentesIds);

    const autosCoincidentes = await Auto.find({ _id: { $in: autosCoincidentesIds } });  // Aca tengo los autos coincidentes (objetos)

    // Paso 3: Obtener modelos de autos coincidentes
    const modeloIds = autosCoincidentes.map(auto => auto.modeloAuto);
    console.log("modeloIds", modeloIds);

    const modelosDisponibles = await Modelo.find({ _id: { $in: modeloIds } });
    res.json(modelosDisponibles);

  } catch (error) {
    console.error("Error al buscar modelos disponibles:", error);
    res.status(500).json({ message: "Error al buscar modelos disponibles" });
  }
};