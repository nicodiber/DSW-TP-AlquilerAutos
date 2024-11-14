const Sucursal = require("../models/sucursal");
const Usuario = require("../models/usuario");
const { getNextSequenceValue } = require('../config/db');

// Crear una nueva sucursal
exports.crearSucursal = async (req, res) => {
  try {
    // Genera un nuevo ID secuencial para la sucursal    
    const _id = await getNextSequenceValue('sucursalId');
    // Extrae los datos del cuerpo de la solicitud
    const { nombreSucursal, telefonoSucursal, direccionSucursal, paisSucursal, provinciaSucursal, ciudadSucursal, horaAperturaSucursal, horaCierreSucursal, trabajadores, autos } = req.body;

    // Crea una nueva instancia de la sucursal con los datos recibidos
    let sucursal = new Sucursal({
      _id,
      nombreSucursal,
      telefonoSucursal,
      direccionSucursal,
      paisSucursal,
      provinciaSucursal,
      ciudadSucursal,
      horaAperturaSucursal,
      horaCierreSucursal,
      trabajadores,
      autos
    });

    // Guarda la sucursal en la base de datos
    await sucursal.save();
    res.json(sucursal);
  } catch (error) {
    console.log(error);

    // Manejo de errores para campos duplicados del nombre de la sucursal
    if (error.code === 11000 && error.keyValue) {
      const field = Object.keys(error.keyValue)[0];
      const errorMsg = field === 'nombreSucursal'
        ? 'El nombre de la sucursal ya está en uso. Elige un nombre diferente.'
        : 'Valor duplicado en un campo único.';

      return res.status(409).json({ msg: errorMsg });
    } else {
      res.status(500).send('Hubo un error al crear la sucursal');
    }
  }
};

// Obtener todas las sucursales
exports.obtenerSucursales = async (req, res) => {
  try {
    // Busca todas las sucursales en la base de datos
    const sucursales = await Sucursal.find();
    res.json(sucursales);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener las sucursales');
  }
};

// Obtener una sucursal por ID
exports.obtenerSucursal = async (req, res) => {
  try {
    // Busca una sucursal por ID y popula los trabajadores asignados
    const sucursal = await Sucursal.findById(req.params.id).populate('trabajadores');

    // Si la sucursal no existe, envía un error 404
    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

    res.json(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener la sucursal');
  }
};

// Actualizar una sucursal
exports.actualizarSucursal = async (req, res) => {
  try {
    // Extrae los datos a actualizar del cuerpo de la solicitud
    const { nombreSucursal, telefonoSucursal, direccionSucursal, paisSucursal, provinciaSucursal, ciudadSucursal, horaAperturaSucursal, horaCierreSucursal, trabajadores, autos } = req.body;

    // Busca la sucursal por ID
    let sucursal = await Sucursal.findById(req.params.id);

    // Verifica si la sucursal existe
    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

    // Actualiza los campos de la sucursal con los nuevos datos
    sucursal.nombreSucursal = nombreSucursal;
    sucursal.telefonoSucursal = telefonoSucursal;
    sucursal.direccionSucursal = direccionSucursal;
    sucursal.paisSucursal = paisSucursal;
    sucursal.provinciaSucursal = provinciaSucursal;
    sucursal.ciudadSucursal = ciudadSucursal;
    sucursal.horaAperturaSucursal = horaAperturaSucursal;
    sucursal.horaCierreSucursal = horaCierreSucursal;
    sucursal.trabajadores = trabajadores;
    sucursal.autos = autos;

    // Guarda los cambios y envía la sucursal actualizada
    sucursal = await Sucursal.findOneAndUpdate({ _id: req.params.id }, sucursal, { new: true });
    res.json(sucursal);
  } catch (error) {
    console.log(error);

    // Manejo de errores para campos duplicados
    if (error.code === 11000 && error.keyValue) {
      const field = Object.keys(error.keyValue)[0];
      const errorMsg = field === 'nombreSucursal'
        ? 'El nombre de la sucursal ya está en uso. Por favor, elige un nombre diferente.'
        : 'Valor duplicado en un campo único.';

      return res.status(409).json({ msg: errorMsg });
    } else {
      res.status(500).send('Hubo un error al actualizar la sucursal');
    }
  }
};

// Eliminar una sucursal
exports.eliminarSucursal = async (req, res) => {
  try {
    // Busca la sucursal por ID
    const sucursal = await Sucursal.findById(req.params.id);

    // Verifica si la sucursal existe antes de eliminar
    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

    // Elimina la sucursal de la base de datos
    await Sucursal.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Sucursal eliminada con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar la sucursal');
  }
};

// Obtener trabajadores para asignación a una sucursal específica
exports.obtenerTrabajadoresParaAsignacion = async (req, res) => {
  try {
    const idSucursal = req.params.idSucursal;

    // Busca la sucursal por ID y popula los trabajadores asignados
    const sucursal = await Sucursal.findById(idSucursal).populate('trabajadores');
    if (!sucursal) return res.status(404).json({ msg: 'No existe esa sucursal' });

    const trabajadoresAsignados = sucursal.trabajadores;

    // Busca los trabajadores sin asignación a una sucursal
    const trabajadoresNoAsignados = await Usuario.find({
      rol: 'trabajador',
      sucursalId: { $exists: false }
    });

    // Devuelve tanto los trabajadores asignados como los no asignados
    res.json({ trabajadoresAsignados, trabajadoresNoAsignados });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error al obtener los trabajadores' });
  }
};

// Asignar o desasignar trabajadores a una sucursal
exports.asignarTrabajadores = async (req, res) => {
  try {
    const { idSucursal } = req.params;
    const { trabajadoresAsignados, trabajadoresNoAsignados } = req.body;

    // Desasigna trabajadores, eliminando el ID de sucursal de los trabajadores
    await Usuario.updateMany(
      { _id: { $in: trabajadoresNoAsignados } },
      { $unset: { sucursalId: "" } }
    );

    // Asigna la sucursal a los trabajadores especificados
    await Usuario.updateMany(
      { _id: { $in: trabajadoresAsignados } },
      { $set: { sucursalId: idSucursal } }
    );

    res.json({ msg: 'Asignación actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar la asignación' });
  }
};
