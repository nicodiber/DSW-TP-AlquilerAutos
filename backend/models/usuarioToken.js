const mongoose = require('mongoose');


const tokenUsuario = new mongoose.Schema({
  idUsurio: {
  },
  token: {
  },
  creadoEn: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
  }
);

module.exports = mongoose.model('Token', tokenUsuario);
