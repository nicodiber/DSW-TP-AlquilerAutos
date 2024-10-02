const express = require('express');
const router = express.Router();
const alquilerController = require('../controllers/alquilerController'); 

router.post('/', alquilerController.crearAlquiler);
router.get('/', alquilerController.obtenerAlquileres);
router.get('/:id', alquilerController.obtenerAlquiler);
router.put('/:id', alquilerController.actualizarAlquiler);
router.delete('/:id', alquilerController.eliminarAlquiler);

router.put('/:id/estado', alquilerController.actualizarEstadoAlquiler);
router.put('/:id/asignar-trabajador', alquilerController.asignarTrabajadorAlquiler);


module.exports = router;
