const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  mailUsuario: {
    type: String,
    required: true
  },
  contraseñaUsuario: {
    type: String,
    required: true
  },
  cuilUsuario: {
    type: Number,
    required: true
  },
  nombreUsuario: {
    type: String,
    required: true
  },
  apellidoUsuario: {
    type: String,
    required: true
  },
  situacionFiscalUsuario: {
    type: String,
    required: true
  },
  provinciaUsuario: {
    type: String,
    required: true
  },
  ciudadaUsuario: {
    type: String,
    required: true
  },
  codigoPostalUsuario: {
    type: String,
    required: true
  },
  telefonoUsuario: {
    type: String,
    required: true
  }
}, { collection: 'usuarios' });

module.exports = mongoose.model('Usuario', UsuarioSchema);