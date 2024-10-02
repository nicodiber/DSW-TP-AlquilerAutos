const mongoose = require('mongoose');

const SucursalSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  nombreSucursal: {
    type: String,
    required: true
  },
  telefonoSucursal: {
    type: String,
    required: true
  },
  direccionSucursal: {
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
  horarioAperturaSucursal: {
    type: String,
    required: true
  },
  horarioCierreSucursal: {
    type: String,
    required: true
  },
  trabajadores: [{
    type: mongoose.Schema.Types.Number,
    ref: 'Usuario',
    required: true                                      // Referencia a la colección de usuarios, donde incluyen a los trabajadores
  }],
  autos: [{
    type: mongoose.Schema.Types.Number,
    ref: 'Auto',                                     // Referencia a la colección de autos que hay en dicha sucursal
  }],
}, { collection: 'sucursales' });

module.exports = mongoose.model('Sucursal', SucursalSchema);
