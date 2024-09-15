const mongoose = require('mongoose');

const ModeloSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    nombreModelo: {
        type: String,
        required: true
    },
    tipoModelo: {
        type: mongoose.Schema.Types.Number, // El tipo debe coincidir con el _id de la colección tipos
        ref: 'Tipo', // Hace referencia a la colección 'tipos'
        required: true
    },
    anioModelo: {
        type: Number,
        required: true
    },
    colorModelo: {
        type: String,
        required: true
    },
    dimensionesModelo: {
        type: String,
        required: true
    },
    cantidadAsientosModelo: {
        type: Number,
        required: true
    },
    cantidadPuertasModelo: {
        type: Number,
        required: true
    },
    motorModelo: {
        type: String,
        required: true
    },
    cajaTransmisionModelo: {
        type: String,
        required: true
    },
    tipoCombustibleModelo: {
        type: String,
        required: true
    },
    capacidadTanqueCombustibleModelo: {
        type: Number,
        required: true
    },
    capacidadBaulModelo: {
        type: Number,
        required: true
    },
    precioModelo: {
        type: Number,
        required: true
    },
}, { collection: 'modelos' }); // Especificamos la colección para evitar que Mongoose use el nombre en plural

module.exports = mongoose.model('Modelo', ModeloSchema);
