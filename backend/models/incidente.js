const mongoose = require('mongoose');

const IncidenteSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  idAlquiler: {
    type: mongoose.Schema.Types.Number,
    ref: 'Alquiler'                                     // Referencia a la tabla de alquiler
  },
  descripcion: {
    type: String,
    required: true
  },
  costoIncidente: {
    type: Number,
    required: true
  },
  fechaIncidente: {
    type: Date,
    required: true
  },
  estadoIncidente: {
    type: String,
    enum: ['impago', 'pago'],
    required: true
  }
  
}, { collection: 'incidentes' });

module.exports = mongoose.model('Incidente', IncidenteSchema);
