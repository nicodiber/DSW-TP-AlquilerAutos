const express = require('express');
const router = express.Router();
const autoController = require('../controllers/autoController'); 
const middleware = require('../middlewares/autorizaciones');

router.post('/', middleware.validarToken, middleware.soloAdminYTrabajador, autoController.crearAuto);
router.get('/', autoController.obtenerAutos);
router.get('/:id', autoController.obtenerAuto);
router.put('/:id', middleware.validarToken, middleware.soloAdminYTrabajador, autoController.actualizarAuto);
router.delete('/:id', middleware.validarToken, middleware.soloAdminYTrabajador, autoController.eliminarAuto);

// Obtener autos disponibles
router.get('/', autoController.obtenerAutosDisponibles);

// Cambiar estado de auto
router.put('/cambiarEstado/:id', autoController.cambiarEstado);

module.exports = router;
