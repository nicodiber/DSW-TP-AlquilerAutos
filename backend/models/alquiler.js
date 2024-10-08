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
        required: true
    },
    fechaInicoAlquiler: {
        type: Date,
        required: true
    },
    fechaFinAlquiler: {
        type: Date,
        required: true
    },
    fechaInicoReal: {
        type: Date,
         default: ''
    },
    fechaFinReal: {
        type: Date,
         default: ''
    },
    horaInicio: {
        type: String, 
        required: true
    },
    horaFin: {
        type: String, 
        required: true
    },
    notas: {
        type: String, // Campo opcional para observaciones o detalles adicionales
        default: ''  // Se puede dejar en blanco por defecto
    },
    precioTotalAlquiler: {
        type: Number,
        required: true
    },
    estadoAlquiler: {
        type: String,
        enum: ['reservado', 'activa', 'cancelada', 'completada'],  // Definir los estados permitidos
        required: true
    },
}, { collection: 'alquileres' }); // Especificamos la colección para evitar que Mongoose use el nombre en plural

module.exports = mongoose.model('Alquiler', AlquilerSchema);
