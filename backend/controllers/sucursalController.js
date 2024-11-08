const Sucursal = require("../models/sucursal");
const { getNextSequenceValue } = require('../config/db');

exports.crearSucursal = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('sucursalId'); 
    const { nombreSucursal, telefonoSucursal, direccionSucursal, paisSucursal, provinciaSucursal, ciudadSucursal, horaAperturaSucursal, horaCierreSucursal, trabajadores, autos } = req.body;

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

    await sucursal.save();
    res.json(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al crear la sucursal');
  }
};

exports.obtenerSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find();
    res.json(sucursales);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener las sucursales');
  }
};

exports.actualizarSucursal = async (req, res) => {
  try {
    const { nombreSucursal, telefonoSucursal, direccionSucursal, paisSucursal, provinciaSucursal, ciudadSucursal, horaAperturaSucursal, horaCierreSucursal, trabajadores, autos } = req.body;

    let sucursal = await Sucursal.findById(req.params.id);

    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

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

    sucursal = await Sucursal.findOneAndUpdate({ _id: req.params.id }, sucursal, { new: true });
    res.json(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar la sucursal');
  }
};

exports.obtenerSucursal = async (req, res) => {
  try {
    const sucursal = await Sucursal.findById(req.params.id);

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

    await Sucursal.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Sucursal eliminada con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar la sucursal');
  }
};
