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
    marcaModelo: {
        type: mongoose.Schema.Types.Number, // la marca debe coincidir con el _id de la colección marcas
        ref: 'Marca', // Hace referencia a la colección 'marcas'
        required: true
    },
    categoriaModelo: {
        type: mongoose.Schema.Types.Number, // la categoria debe coincidir con el _id de la colección categorias
        ref: 'Categoria', // Hace referencia a la colección 'categorias'
        required: true
    },
    precioXdia: {
        type: Number,
        required: true
    },
    anio: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    dimensiones: {
        type: String,
        required: true
    },
    cantidadAsientos: {
        type: Number,
        required: true
    },
    cantidadPuertas: {
        type: Number,
        required: true
    },
    motor: {
        type: String,
        required: true
    },
    cajaTransmision: {
        type: String,
        required: true
    },
    tipoCombustible: {
        type: String,
        required: true
    },
    capacidadTanqueCombustible: {
        type: Number,
        required: true
    },
    capacidadBaul: {
        type: Number,
        required: true
    }
    
}, { collection: 'modelos' }); // Especificamos la colección para evitar que Mongoose use el nombre en plural

module.exports = mongoose.model('Modelo', ModeloSchema);
