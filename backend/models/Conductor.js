const mongoose = require('mongoose');

const ConductorSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    dniPasaporte: {
        type: String,
        required: true
    },
    apellidoConductor: {
        type: String,
        required: true
    },
    nombreConductor: {
        type: String,
        required: true
    },
    fechaNacimientoConductor: {
        type: Date,
        required: true
    },
    licenciaConductor: {
        type: String,
        required: true
    },
    fechaOtorgamientoLicencia: {
        type: Date,
        required: true
    },
    nroTelefonoConductor: {
        type: String,
        required: true
    },
    mailConductor: {
        type: String,
        required: true
    },
}, { collection: 'conductores' }); // Especificamos la colección para evitar que Mongoose use el nombre en plural

module.exports = mongoose.model('Conductor', ConductorSchema);
