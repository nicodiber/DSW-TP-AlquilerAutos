const mongoose = require('mongoose');

const AlquilerSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    usuario:{
        type: mongoose.Schema.Types.Number,
        ref: 'Usuario',
        required: true
    },
    auto:{
        type: mongoose.Schema.Types.Number,
        ref: 'Auto',
        required: true
    },
    sucursalEntrega: {
        type: mongoose.Schema.Types.Number, 
        ref: 'Sucursal', // Hace referencia a la colección 'sucursales' donde estaría almacenado el auto
        required: true
    },
    sucursalDevolucion: {
        type: mongoose.Schema.Types.Number, 
        ref: 'Sucursal', // Hace referencia a la colección 'sucursales' donde estaría almacenado el auto
        required: true
    },
    trabajadorAsignado:{
        type: mongoose.Schema.Types.Number,
        ref: 'Usuario',
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    fechaInicioReal: {
        type: Date
    },
    fechaFinReal: {
        type: Date
    },
    notas: {
        type: String
    },
    precioTotalAlquiler: {
        type: Number,
        required: true
    },
    estadoAlquiler: {
        type: String,
        enum: ['reservado', 'activo', 'cancelado', 'completado'],  // Definir los estados permitidos
        required: true
    },
}, { collection: 'alquileres' }); // Especificamos la colección para evitar que Mongoose use el nombre en plural

module.exports = {
    AlquilerSchema,
    Alquiler: mongoose.model('Alquiler', AlquilerSchema)
};
