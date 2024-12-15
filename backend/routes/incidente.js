const express = require('express');
const router = express.Router();
const incidenteController = require('../controllers/incidenteController');
const middleware = require('../middlewares/autorizaciones');

router.post('/', incidenteController.crearIncidente);
router.get('/', incidenteController.obtenerIncidentes);
router.get('/:id', incidenteController.obtenerIncidente);
router.put('/:id', incidenteController.actualizarIncidente);
router.delete('/:id', incidenteController.eliminarIncidente);

router.get('/usuario/:id', incidenteController.obtenerIncidentesPorUsuario);
router.put('/pay/:id', middleware.validarToken, incidenteController.pagarIncidente);
module.exports = router;
