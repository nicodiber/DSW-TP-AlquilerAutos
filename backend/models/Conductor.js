const mongoose = require('mongoose');

const ConductorSchema = mongoose.Schema({
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
}, { collection: 'conductores' }); //ACA HICE LA CORRECION DE MONGO para que acceda a la tabla conductores y no cree una conductors

module.exports = mongoose.model('Conductor', ConductorSchema);