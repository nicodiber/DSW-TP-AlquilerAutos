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
  trabajadorACargo: {
    type: mongoose.Schema.Types.Number,
    ref: 'Usuario',
    required: true
  },
  fechaInicioMantenimiento: {
    type: Date,
    required: true
  },
  fechaFinMantenimiento: {
    type: Date,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  costoMantenimiento: {
    type: Number,
    required: true
  },
}, { collection: 'mantenimientos' });

module.exports = mongoose.model('Mantenimiento', MantenimientoSchema);
