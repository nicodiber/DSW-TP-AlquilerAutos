const mongoose = require('mongoose');

const MarcaSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  nombreMarca: {
    type: String,
    required: true
  },
}, { collection: 'marcas' });

module.exports = mongoose.model('Marca', MarcaSchema);
