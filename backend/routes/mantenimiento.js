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
router.get('/', imantenimientoController.obtenerMantenimientos);                                        // Obtiene todos los mantenimientos
router.get('/:id', imantenimientoController.obtenerMantenimiento);                                      // Obtener un mantenimiento específico
router.put('/:id', imantenimientoController.actualizarMantenimiento);                                   // Actualizar mantenimiento
router.delete('/:id', imantenimientoController.eliminarMantenimiento);                                  // Eliminar mantenimiento

//router.get('/trabajadoresSucursal/:idAuto', imantenimientoController.obtenerTrabajadoresSucursal);      // Nueva ruta para obtener los trabajadores de una sucursal específica del auto

router.get('/trabajadores-sucursal/:sucursalId', imantenimientoController.obtenerTrabajadoresPorSucursal);

module.exports = router;
