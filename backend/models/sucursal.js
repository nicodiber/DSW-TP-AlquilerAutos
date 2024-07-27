const mongoose = require('mongoose');

const SucursalSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  denominacionSucursal: {
    type: String,
    required: true
  },
  nroTelefonoSucursal: {
    type: String,
    required: true
  },
  provinciaSucursal: {
    type: String,
    required: true
  },
  ciudadSucursal: {
    type: String,
    required: true
  },
  direccionSucursal: {
    type: String,
    required: true
  },
  horarioAperturaSucursal: {
    type: String,
    required: true
  },
  horarioCierreSucursal: {
    type: String,
    required: true
  }
}, { collection: 'sucursales' });

module.exports = mongoose.model('Sucursal', SucursalSchema);
