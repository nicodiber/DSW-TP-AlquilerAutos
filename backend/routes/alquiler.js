const express = require('express');
const router = express.Router();
const alquilerController = require('../controllers/alquilerController'); 
const autoController = require('../controllers/autoController');

router.post('/', alquilerController.crearAlquiler);
router.get('/', alquilerController.obtenerAlquileres);
router.get('/:id', alquilerController.obtenerAlquiler);

// Especificos
router.put('/:id/fechaInicioReal', alquilerController.establecerFechaInicioReal);
router.put('/:id/fechaFinReal', alquilerController.establecerFechaFinReal);
router.put('/:id/notas', alquilerController.modificarNotas);
router.put('/:id/trabajador', alquilerController.modificarTrabajador);
router.put('/:id/estado', alquilerController.cambiarEstado);

router.patch('/autos/:id/estado', autoController.actualizarEstadoAuto); // PATCH porque se actualiza parcialmente el objeto
router.patch('/autos/:id/sucursal', autoController.actualizarSucursalAuto);

// Usado por Buscador
router.post('/buscarModelosDisponibles', alquilerController.buscarModelosDisponibles);


module.exports = router;