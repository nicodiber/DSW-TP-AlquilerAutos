const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true                                      // El email debe ser único y el que va a usar para inciar sesion
  },
  contraseña: {
    type: String,
    required: true
  },
  licenciaConductor: {
      type: String,
    },
  telefono: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  dni: {
    type: Number,
    required: true
  },
  rol: {
    type: String,
    enum: ['usuario', 'administrador', 'trabajador'],     //se definen solo estas 3 opciones por ahora
    default: 'usuario'
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  alquileres: [{
    type: mongoose.Schema.Types.Number,
    ref: 'Alquiler'                                     // Referencia a la colección de alquileres
  }]
}, { collection: 'usuarios' });

module.exports = mongoose.model('Usuario', UsuarioSchema);
