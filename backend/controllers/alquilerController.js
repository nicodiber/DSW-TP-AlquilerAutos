const Alquiler = require("../models/alquiler");
const Usuario = require("../models/usuario");
const Auto = require("../models/auto");
const Sucursal = require("../models/sucursal");
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
      fechaInicoAlquiler,
      fechaFinAlquiler,
      fechaInicoReal  = '',
      fechaFinReal  = '',
      horaInicio,
      horaFin,
      notas = '',
      precioTotalAlquiler  = '',
      estadoAlquiler = 'reservado'
    } = req.body;

    let alquiler = new Alquiler({
      _id,
      usuario,
      auto,
      sucursalEntrega,
      sucursalDevolucion,
      fechaInicoAlquiler,
      fechaFinAlquiler,
      fechaInicoReal,
      fechaFinReal,
      horaInicio,
      horaFin,
      notas,
      precioTotalAlquiler,
      estadoAlquiler
    });

    await alquiler.save();
    res.json(alquiler);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al crear el alquiler');
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

// Actualizar un alquiler
exports.actualizarAlquiler = async (req, res) => {
  try {
    const {
      usuario,
      auto,
      sucursalEntrega,
      sucursalDevolucion,
      trabajadorAsignado,
      fechaInicoAlquiler,
      fechaFinAlquiler,
      fechaInicoReal,
      fechaFinReal,
      horaInicio,
      horaFin,
      notas,
      precioTotalAlquiler,
      estadoAlquiler
    } = req.body;

    let alquiler = await Alquiler.findById(req.params.id);

    if (!alquiler) {
      return res.status(404).json({ msg: 'No existe ese alquiler' });
    }

    // Actualizar los campos
    alquiler.usuario = usuario;
    alquiler.auto = auto;
    alquiler.sucursalEntrega = sucursalEntrega;
    alquiler.sucursalDevolucion = sucursalDevolucion;
    alquiler.trabajadorAsignado = trabajadorAsignado;
    alquiler.fechaInicoAlquiler = fechaInicoAlquiler;
    alquiler.fechaFinAlquiler = fechaFinAlquiler;
    alquiler.fechaInicoReal = fechaInicoReal;
    alquiler.fechaFinReal = fechaFinReal;
    alquiler.horaInicio = horaInicio;
    alquiler.horaFin = horaFin;
    alquiler.notas = notas;
    alquiler.precioTotalAlquiler = precioTotalAlquiler;
    alquiler.estadoAlquiler = estadoAlquiler;

    alquiler = await Alquiler.findOneAndUpdate({ _id: req.params.id }, alquiler, { new: true });
    res.json(alquiler);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar el alquiler');
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

// Eliminar un alquiler
exports.eliminarAlquiler = async (req, res) => {
  try {
    const alquiler = await Alquiler.findById(req.params.id);

    if (!alquiler) {
      return res.status(404).json({ msg: 'No existe ese alquiler' });
    }

    await Alquiler.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Alquiler eliminado con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar el alquiler');
  }
};


// Actualizar un alquiler
exports.actualizarEstadoAlquiler = async (req, res) => {
  try {
    const {
      fechaInicoReal,
      fechaFinReal,
      notas,
      estadoAlquiler
    } = req.body;

    let alquiler = await Alquiler.findById(req.params.id);

    if (!alquiler) {
      return res.status(404).json({ msg: 'No existe ese alquiler' });
    }

    // Actualizar los campos
    alquiler.fechaInicoReal = fechaInicoReal;
    alquiler.fechaFinReal = fechaFinReal;
    alquiler.notas = notas;
    alquiler.estadoAlquiler = estadoAlquiler;

    alquiler = await Alquiler.findOneAndUpdate({ _id: req.params.id }, alquiler, { new: true });
    res.json(alquiler);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar el alquiler');
  }
};

exports.asignarTrabajadorAlquiler = async (req, res) => {
  try {
    const { idTrabajador } = req.body;
    const alquilerId = req.params.id; // El ID del alquiler viene de los parámetros

    // Buscar el alquiler
    let alquiler = await Alquiler.findById(alquilerId).populate('sucursalEntrega');

    if (!alquiler) {
      return res.status(404).json({ msg: 'No existe ese alquiler' });
    }

    // Obtener la sucursal de entrega del alquiler
    const sucursalEntrega = await Sucursal.findById(alquiler.sucursalEntrega._id).populate('trabajadores');
    
    if (!sucursalEntrega) {
      return res.status(404).json({ msg: 'No existe la sucursal de entrega' });
    }

    // Verificar si el trabajador existe y tiene el rol de 'trabajador'
    const trabajador = await Usuario.findById(idTrabajador);
    if (!trabajador) {
      return res.status(404).json({ msg: 'El trabajador no existe' });
    }

    if (trabajador.rol !== 'trabajador') {
      return res.status(400).json({ msg: 'El usuario no tiene el rol de trabajador' });
    }

    // Verificar si el trabajador pertenece a la sucursal de entrega
    if (!sucursalEntrega.trabajadores.includes(idTrabajador)) {
      return res.status(400).json({ msg: 'El trabajador no pertenece a la sucursal de entrega' });
    }

    // Asignar el trabajador al alquiler
    alquiler.trabajadorAsignado = idTrabajador;
    await alquiler.save();

    res.json(alquiler);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al asignar el trabajador al alquiler');
  }
};
