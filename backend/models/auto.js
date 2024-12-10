const mongoose = require('mongoose');

const AutoSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    modeloAuto: {
        type: mongoose.Schema.Types.Number,
        ref: 'Modelo',
        required: true
        //type: Number,
        //required: true
    },
    sucursalAuto: {
        type: mongoose.Schema.Types.Number, // El tipo debe coincidir con el _id de la colección sucursales
        ref: 'Sucursal', // Hace referencia a la colección 'sucursales' donde estaría almacenado el auto
        required: true
        // type: Number,
        // required: true
    },
    historialMantenimiento: {
        type: mongoose.Schema.Types.Number,
        ref: 'Mantenimiento',
    },
    estadoAuto: {
        type: String,
        enum: ['disponible', 'reservado', 'alquilado', 'mantenimiento'],  // Definir los estados permitidos
        required: true
    },
    matricula: {
        type: String,
        required: true
    }
}, { collection: 'autos' }); // Especificamos la colección para evitar que Mongoose use el nombre en plural

module.exports = mongoose.model('Auto', AutoSchema);
