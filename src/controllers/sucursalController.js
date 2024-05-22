const Sucursal = require('../models/sucursal');

let sucursales = [];
let nextId = 1;

const getAllSucursales = (req, res) => {
  console.log('GET /sucursales');
  res.json(sucursales);
};

const getSucursalById = (req, res) => {
  console.log('GET /sucursales/:id');
  const { id } = req.params;
  const sucursal = sucursales.find(s => s.idSucursal === parseInt(id));
  if (sucursal) {
    res.json(sucursal);
  } else {
    res.status(404).send('Sucursal no encontrada');
  }
};

const createSucursal = (req, res) => {
  console.log('POST /sucursales', req.body);
  const { denominacionSucursal, nroTelefonoSucursal, provinciaSucursal, ciudadSucursal, direccionSucursal, horarioAperturaSucursal, horarioCierreSucursal } = req.body;
  const newSucursal = new Sucursal(nextId++, denominacionSucursal, nroTelefonoSucursal, provinciaSucursal, ciudadSucursal, direccionSucursal, horarioAperturaSucursal, horarioCierreSucursal);
  sucursales.push(newSucursal);
  res.status(201).json(newSucursal);
};

const updateSucursal = (req, res) => {
  console.log('PUT /sucursales/:id', req.body);
  const { id } = req.params;
  const { denominacionSucursal, nroTelefonoSucursal, provinciaSucursal, ciudadSucursal, direccionSucursal, horarioAperturaSucursal, horarioCierreSucursal } = req.body;
  const sucursal = sucursales.find(s => s.idSucursal === parseInt(id));
  if (sucursal) {
    sucursal.denominacionSucursal = denominacionSucursal;
    sucursal.nroTelefonoSucursal = nroTelefonoSucursal;
    sucursal.provinciaSucursal = provinciaSucursal;
    sucursal.ciudadSucursal = ciudadSucursal;
    sucursal.direccionSucursal = direccionSucursal;
    sucursal.horarioAperturaSucursal = horarioAperturaSucursal;
    sucursal.horarioCierreSucursal = horarioCierreSucursal;
    res.json(sucursal);
  } else {
    res.status(404).send('Sucursal no encontrada');
  }
};

const deleteSucursal = (req, res) => {
  console.log('DELETE /sucursales/:id');
  const { id } = req.params;
  const index = sucursales.findIndex(s => s.idSucursal === parseInt(id));
  if (index !== -1) {
    sucursales.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Sucursal no encontrada');
  }
};

const deleteAllSucursales = (req, res) => {
  console.log('DELETE /sucursales');
  sucursales = []; // Vacía el arreglo de sucursales
  res.status(204).send(); // Envía una respuesta con estado 204 (No Content)
};

module.exports = {
  getAllSucursales,
  getSucursalById,
  createSucursal,
  updateSucursal,
  deleteSucursal,
  deleteAllSucursales
};