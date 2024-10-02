const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  nombreCategoria: {
    type: String,
    required: true
  },
}, { collection: 'categorias' });

module.exports = mongoose.model('Categoria', CategoriaSchema);
