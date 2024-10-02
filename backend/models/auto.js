const mongoose = require('mongoose');

const AutoSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    modeloAuto: {
        type: String,
        required: true
    },
    marcaAuto: {
        type: mongoose.Schema.Types.Number, // la marca debe coincidir con el _id de la colección marcas
        ref: 'Marca', // Hace referencia a la colección 'marcas'
        required: true
    },
    categoriaAuto: {
        type: mongoose.Schema.Types.Number, // la categoria debe coincidir con el _id de la colección categorias
        ref: 'Categoria', // Hace referencia a la colección 'categorias'
        required: true
    },
    sucursalAuto: {
        type: mongoose.Schema.Types.Number, // El tipo debe coincidir con el _id de la colección sucursales
        ref: 'Sucursal', // Hace referencia a la colección 'sucursales' donde estaría almacenado el auto
        required: true
    },
    precioXdia: {
        type: Number,
        required: true
    },
    estadoAuto: {
        type: String,
        enum: ['disponible', 'alquilado', 'mantenimiento'],  // Definir los estados permitidos
        required: true
    },
    anioAuto: {
        type: Number,
        required: true
    },
    matriculaAuto: {
        type: String,
        required: true
    },
    colorAuto: {
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
    capacidadBaul: {
        type: Number,
        required: true
    },
    
}, { collection: 'autos' }); // Especificamos la colección para evitar que Mongoose use el nombre en plural

module.exports = mongoose.model('Auto', AutoSchema);
