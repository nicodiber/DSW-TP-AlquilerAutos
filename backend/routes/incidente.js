const express = require('express');
const router = express.Router();
const incidenteController = require('../controllers/incidenteController');
const middleware = require('../middlewares/autorizaciones');

router.post('/', middleware.validarToken, middleware.soloAdminYTrabajador, incidenteController.crearIncidente);
router.get('/', incidenteController.obtenerIncidentes);
router.get('/:id', incidenteController.obtenerIncidente);
router.put('/:id', middleware.validarToken, middleware.soloAdminYTrabajador, incidenteController.actualizarIncidente);
router.delete('/:id', middleware.validarToken, middleware.soloAdminYTrabajador, incidenteController.eliminarIncidente);

router.get('/usuario/:id', middleware.validarToken, incidenteController.obtenerIncidentesPorUsuario);
router.put('/pay/:id', middleware.validarToken, incidenteController.pagarIncidente);
module.exports = router;
