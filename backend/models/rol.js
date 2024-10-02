const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  nombreRol: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
}, { collection: 'roles' });

module.exports = mongoose.model('Rol', RolSchema);
