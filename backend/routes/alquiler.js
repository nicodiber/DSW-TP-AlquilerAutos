const express = require('express');
const router = express.Router();
const alquilerController = require('../controllers/alquilerController'); 

router.post('/', alquilerController.crearAlquiler);
router.get('/', alquilerController.obtenerAlquileres);
router.get('/:id', alquilerController.obtenerAlquiler);

// Especificos
router.put('/:id/fechaInicioReal', alquilerController.establecerFechaInicioReal);
router.put('/:id/fechaFinReal', alquilerController.establecerFechaFinReal);
router.put('/:id/notas', alquilerController.modificarNotas);
router.put('/:id/trabajador', alquilerController.modificarTrabajador);
router.put('/:id/estado', alquilerController.cambiarEstado);

// Usado por Buscador
router.post('/buscarModelosDisponibles', alquilerController.buscarModelosDisponibles);


module.exports = router;