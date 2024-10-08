const express = require('express');
const router = express.Router();
const incidenteController = require('../controllers/incidenteController');

router.post('/', incidenteController.crearIncidente);
router.get('/', incidenteController.obtenerIncidentes);
router.get('/:id', incidenteController.obtenerIncidente);
router.put('/:id', incidenteController.actualizarIncidente);
router.delete('/:id', incidenteController.eliminarIncidente);

module.exports = router;
