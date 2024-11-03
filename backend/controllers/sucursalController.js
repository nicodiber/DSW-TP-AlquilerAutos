const Sucursal = require("../models/sucursal");
const Usuario = require("../models/usuario");
const Auto = require("../models/auto");

const { getNextSequenceValue } = require('../config/db');

exports.crearSucursal = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('sucursalId');
     const {
      nombreSucursal, telefonoSucursal, direccionSucursal,
      provinciaSucursal, ciudadSucursal, horaAperturaSucursal,
      horaCierreSucursal,
    } = req.body;
    
    let sucursal = new Sucursal({
      _id,
      nombreSucursal, telefonoSucursal, direccionSucursal,
      provinciaSucursal, ciudadSucursal, horaAperturaSucursal,
      horaCierreSucursal,
    });

    await sucursal.save();
    res.send(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al crear la sucursal');
  }
};

exports.obtenerSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find().populate('trabajadores').populate('autos');
    res.json(sucursales);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener las sucursales');
  }
};

exports.actualizarSucursal = async (req, res) => {
  try {
    const {
      nombreSucursal, telefonoSucursal, direccionSucursal,
      provinciaSucursal, ciudadSucursal, horaAperturaSucursal,
      horaCierreSucursal, trabajadores, autos
    } = req.body;

    let sucursal = await Sucursal.findById(req.params.id);

    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

    sucursal.nombreSucursal = nombreSucursal;
    sucursal.telefonoSucursal = telefonoSucursal;
    sucursal.direccionSucursal = direccionSucursal;
    sucursal.provinciaSucursal = provinciaSucursal;
    sucursal.ciudadSucursal = ciudadSucursal;
    sucursal.horaAperturaSucursal = horaAperturaSucursal;
    sucursal.horaCierreSucursal = horaCierreSucursal;
    sucursal.trabajadores = trabajadores || sucursal.trabajadores; 
    sucursal.autos = autos || sucursal.autos;

    sucursal = await Sucursal.findByIdAndUpdate(req.params.id, sucursal, { new: true });
    res.json(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar la sucursal');
  }
};

exports.obtenerSucursal = async (req, res) => {
  try {
    const sucursal = await Sucursal.findById(req.params.id)
                                   .populate('trabajadores')
                                   .populate('autos');

    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

    res.json(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener la sucursal');
  }
};

exports.eliminarSucursal = async (req, res) => {
  try {
    const sucursal = await Sucursal.findById(req.params.id);

    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

    await Sucursal.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Sucursal eliminada con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar la sucursal');
  }
};


exports.asignarTrabajador = async (req, res) => {
  try {
    const { idTrabajador } = req.body;
    let sucursal = await Sucursal.findById(req.params.id);

    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

    // Verificar si el trabajador existe y tiene el rol de 'trabajador'
    const trabajador = await Usuario.findById(idTrabajador);
    if (!trabajador) {
      return res.status(404).json({ msg: 'El trabajador no existe' });
    }
    if (trabajador.rol !== 'trabajador') {
      return res.status(400).json({ msg: 'El usuario no tiene el rol de trabajador' });
    }

    // Verificar si ya está en la lista de trabajadores
    if (sucursal.trabajadores.includes(idTrabajador)) {
      return res.status(400).json({ msg: 'El trabajador ya está asignado a esta sucursal' });
    }

    // Agregar el trabajador al array de trabajadores
    sucursal.trabajadores.push(idTrabajador);
    await sucursal.save();
    res.json(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al agregar el trabajador');
  }
};

exports.asignarAuto = async (req, res) => {
  try {
    const { idAuto } = req.body;
    const sucursal = await Sucursal.findById(req.params.id);

    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

    // Verificar que el auto existe
    const auto = await Auto.findById(idAuto);

    if (!auto) {
      return res.status(404).json({ msg: 'El auto no existe' });
    }

    // Valida que el auto no esté asignado a otra sucursal
    const autoAsignado = await Sucursal.findOne({ autos: idAuto });
    if (autoAsignado) {
      return res.status(400).json({ msg: 'El auto ya está asignado a otra sucursal' });
    }

    // Agregar el auto al array
    sucursal.autos.push(idAuto);

    await sucursal.save();
    res.json(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al agregar el auto');
  }
};
