const mongoose = require('mongoose');

const TipoSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  tipoVehiculo: {
    type: String,
    required: true
  },
  precioTipo: {
    type: Number,
    required: true
  }
}, { collection: 'tipos' });

module.exports = mongoose.model('Tipo', TipoSchema);
