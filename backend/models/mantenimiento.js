const mongoose = require('mongoose');

const MantenimientoSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  auto: {
    type: mongoose.Schema.Types.Number,
    ref: 'Auto',
    required: true
  },
  trabajadorAcargo: {
    type: mongoose.Schema.Types.Number,
    ref: 'Usuario'
  },
  fechaInicioMantenimiento: {
    type: Date,
    required: true
  },
  fechaFinMantenimiento: {
    type: Date
  },
  descripcion: {
    type: String
  },
  costoMantenimiento: {
    type: Number
  },
}, { collection: 'mantenimientos' });


module.exports = mongoose.model('Mantenimiento', MantenimientoSchema);
