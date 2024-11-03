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
  horaAperturaSucursal: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);  // Valida formato HH:MM
      },
      message: props => `${props.value} no es un horario válido (use formato HH:MM)`
    }
  },
  horaCierreSucursal: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);  // Valida formato HH:MM
      },
      message: props => `${props.value} no es un horario válido (use formato HH:MM)`
    }
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
