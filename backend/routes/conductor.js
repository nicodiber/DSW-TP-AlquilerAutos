// Rutas para conductor
const express = require('express');
const router = express.Router();
const conductorController = require('../controllers/conductorController');

// api/conductores
router.post('/', conductorController.crearConductor);
router.get('/', conductorController.obtenerConductores);
router.put('/:id', conductorController.actualizarConductor);
router.get('/:id', conductorController.obtenerConductor);
router.delete('/:id', conductorController.eliminarConductor);

module.exports = router;