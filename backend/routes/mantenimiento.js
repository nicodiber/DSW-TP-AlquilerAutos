const express = require('express');
const router = express.Router();
const imantenimientoController = require('../controllers/mantenimientoController');

router.post('/', imantenimientoController.crearMantenimiento);
router.get('/', imantenimientoController.obtenerMantenimientos);
router.get('/:id', imantenimientoController.obtenerMantenimiento);
router.put('/:id', imantenimientoController.actualizarMantenimiento);
router.delete('/:id', imantenimientoController.eliminarMantenimiento);

module.exports = router;
