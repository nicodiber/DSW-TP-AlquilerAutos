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
  estadoMantenimiento: {
    type: String,
    enum: ['pendiente', 'en curso', 'finalizado'],
    required: true
  }
}, { collection: 'mantenimientos' });

// Middleware pre-save para validar que el trabajador tiene el rol correcto
MantenimientoSchema.pre('save', async function (next) {
  try {
    const Usuario = mongoose.model('Usuario');
    const trabajador = await Usuario.findById(this.trabajador);

    if (!trabajador) {
      throw new Error('Trabajador no encontrado');
    }

    // Validar que el rol del usuario sea "trabajador"
    if (trabajador.rol !== 'trabajador') {
      throw new Error('El usuario asignado no tiene el rol de trabajador');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Mantenimiento', MantenimientoSchema);
