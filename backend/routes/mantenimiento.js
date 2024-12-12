const express = require('express');
const router = express.Router();
const imantenimientoController = require('../controllers/mantenimientoController');

// Middleware para ver si llega la solicitud
router.use((req, res, next) => {
  console.log('Request received:', req.method, req.originalUrl);  // Verifica si se recibe la solicitud
  next();
});

router.post('/', imantenimientoController.crearMantenimiento);
router.post('/mantenimientoAlquiler/:idAuto', imantenimientoController.crearMantenimientoAlquiler);
router.get('/', imantenimientoController.obtenerMantenimientos);
router.get('/:id', imantenimientoController.obtenerMantenimiento);
router.put('/:id', imantenimientoController.actualizarMantenimiento);
router.delete('/:id', imantenimientoController.eliminarMantenimiento);

module.exports = router;
