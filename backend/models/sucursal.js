const mongoose = require('mongoose');

const SucursalSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  nombreSucursal: {
    type: String,
    required: true,
    unique: true,               // El nombre de sucursal debe ser único
    minlength: [3],             // El nombre de la sucursal debe tener al menos 3 caracteres
    maxlength: [100],           // El nombre de la sucursal no debe exceder los 100 caracteres
  },
  telefonoSucursal: {
    type: String,
    required: true,
    match: [/^[0-9]{7,15}$/],   // El teléfono debe contener entre 7 y 15 números
  },
  direccionSucursal: {
    type: String,
    required: true,
    maxlength: [200],           // La dirección no debe exceder los 200 caracteres
  },
  paisSucursal: {
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
  horaAperturaSucursal: {
    type: String,
    required: true
  },
  horaCierreSucursal: {
    type: String,
    required: true
  },
  trabajadores: [{
    type: mongoose.Schema.Types.Number,
    ref: 'Usuario',
    required: true
  }],
  autos: [{
    type: mongoose.Schema.Types.Number,
    ref: 'Auto'
  }],
}, { collection: 'sucursales' });

module.exports = mongoose.model('Sucursal', SucursalSchema);
