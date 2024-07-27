const Sucursal = require("../models/sucursal");
const { getNextSequenceValue } = require('../config/db');

exports.crearSucursal = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('sucursalId');
    let sucursal = new Sucursal({ ...req.body, _id });

    await sucursal.save();
    res.send(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find();
    res.json(sucursales);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.actualizarSucursal = async (req, res) => {
  try {
    const { denominacionSucursal, nroTelefonoSucursal, provinciaSucursal, ciudadSucursal, direccionSucursal, horarioAperturaSucursal, horarioCierreSucursal } = req.body;
    let sucursal = await Sucursal.findById(req.params.id);

    if (!sucursal) {
      res.status(404).json({ msg: 'No existe esa sucursal' });
      return;
    }

    sucursal.denominacionSucursal = denominacionSucursal;
    sucursal.nroTelefonoSucursal = nroTelefonoSucursal;
    sucursal.provinciaSucursal = provinciaSucursal;
    sucursal.ciudadSucursal = ciudadSucursal;
    sucursal.direccionSucursal = direccionSucursal;
    sucursal.horarioAperturaSucursal = horarioAperturaSucursal;
    sucursal.horarioCierreSucursal = horarioCierreSucursal;

    sucursal = await Sucursal.findOneAndUpdate({ _id: req.params.id }, sucursal, { new: true });
    res.json(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerSucursal = async (req, res) => {
  try {
    let sucursal = await Sucursal.findById(req.params.id);

    if (!sucursal) {
      res.status(404).json({ msg: 'No existe esa sucursal' });
      return;
    }

    res.json(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.eliminarSucursal = async (req, res) => {
  try {
    let sucursal = await Sucursal.findById(req.params.id);

    if (!sucursal) {
      res.status(404).json({ msg: 'No existe esa sucursal' });
      return;
    }

    await Sucursal.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Sucursal eliminada con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};
