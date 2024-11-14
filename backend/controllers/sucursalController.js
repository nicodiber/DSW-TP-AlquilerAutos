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
    const idSucursal = req.params.id;

    // Busca la sucursal por ID y popula los trabajadores asignados
    const sucursal = await Sucursal.findById(idSucursal).populate('trabajadores');
    if (!sucursal) return res.status(404).json({ msg: 'No existe esa sucursal' });

    const idTrabajadoresDeEstaSucursal = (sucursal.trabajadores || []).map(trabajador => trabajador._id.toString());;
    const trabajadoresDeEstaSucursal = await Usuario.find({ _id: { $in: idTrabajadoresDeEstaSucursal } })
    // console.log("Trabajadores esta sucursal", trabajadoresDeEstaSucursal);

    // Obtener todos los IDs de trabajadores asignados a cualquier sucursal
    const todasLasSucursales = await Sucursal.find().select('trabajadores');
    const idsTrabajadoresAsignados = todasLasSucursales.reduce((acc, suc) => {
      return acc.concat(suc.trabajadores.map(id => id.toString()));
    }, []);

    // Filtrar los trabajadores que no están en la lista de trabajadores asignados
    const trabajadoresNoAsignados = await Usuario.find({
      rol: 'trabajador',
      _id: { $nin: idsTrabajadoresAsignados } // Solo trabajadores que no están asignados a ninguna sucursal
    });

    // Devuelve tanto los trabajadores asignados como los no asignados
    res.json({ trabajadoresDeEstaSucursal, trabajadoresNoAsignados });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error al obtener los trabajadores' });
  }
};

exports.asignarTrabajadores = async (req, res) => {
  try {
    const idSucursal = req.params.id;
    const { trabajadoresAsignados, trabajadoresNoAsignados } = req.body;

    // Convertir los arrays de IDs a tipo Number
    const trabajadoresAsignadosNumeros = trabajadoresAsignados.map(id => Number(id));
    const trabajadoresNoAsignadosNumeros = trabajadoresNoAsignados.map(id => Number(id));

    // Desasigna trabajadores, eliminando el ID de la sucursal de los trabajadores
    await Sucursal.updateOne(
      { _id: idSucursal },
      { $pull: { trabajadores: { $in: trabajadoresNoAsignadosNumeros } } }
    );

    // Asigna trabajadores, agregando sus IDs al array 'trabajadores' de la sucursal si no están ya
    await Sucursal.updateOne(
      { _id: idSucursal },
      { $addToSet: { trabajadores: { $each: trabajadoresAsignadosNumeros } } }
    );

    res.json({ msg: 'Asignación actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar la asignación' });
  }

// Obtener autos para asignación a una sucursal específica
exports.obtenerAutosParaAsignacion = async (req, res) => {
  try {
    const idSucursal = req.params.id;
    const sucursal = await Sucursal.findById(idSucursal).populate('autos');
    if (!sucursal) return res.status(404).json({ msg: 'No existe esa sucursal' });

    const idAutosDeEstaSucursal = (sucursal.autos || []).map(auto => auto._id.toString());
    const autosDeEstaSucursal = await Auto.find({ _id: { $in: idAutosDeEstaSucursal } });

    const todasLasSucursales = await Sucursal.find().select('autos');
    const idsAutosAsignados = todasLasSucursales.reduce((acc, suc) => {
      return acc.concat(suc.autos.map(id => id.toString()));
    }, []);

    const autosNoAsignados = await Auto.find({
      _id: { $nin: idsAutosAsignados }
    });

    res.json({ autosDeEstaSucursal, autosNoAsignados });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error al obtener los autos' });
  }
};

// Asignar o desasignar autos a una sucursal
exports.asignarAutos = async (req, res) => {
  try {
    const idSucursal = req.params.id;
    const { autosAsignados, autosNoAsignados } = req.body;

    const autosAsignadosNumeros = autosAsignados.map(id => Number(id));
    const autosNoAsignadosNumeros = autosNoAsignados.map(id => Number(id));

    await Sucursal.updateOne(
      { _id: idSucursal },
      { $pull: { autos: { $in: autosNoAsignadosNumeros } } }
    );

    await Sucursal.updateOne(
      { _id: idSucursal },
      { $addToSet: { autos: { $each: autosAsignadosNumeros } } }
    );

    res.json({ msg: 'Asignación de autos actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar la asignación de autos' });
  }
};
};

