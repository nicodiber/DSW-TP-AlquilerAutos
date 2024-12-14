const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controllers/mantenimientoController');

router.post('/', mantenimientoController.crearMantenimiento);
router.post('/mantenimientoAlquiler/:idAuto', mantenimientoController.crearMantenimientoAlquiler);
router.get('/', mantenimientoController.obtenerMantenimientos);                                        // Obtiene todos los mantenimientos
router.get('/:id', mantenimientoController.obtenerMantenimiento);                                      // Obtener un mantenimiento específico
router.put('/:id', mantenimientoController.actualizarMantenimiento);                                   // Actualizar mantenimiento
router.delete('/:id', mantenimientoController.eliminarMantenimiento);                                  // Eliminar mantenimiento

router.get('/trabajadores-sucursal/:sucursalId', mantenimientoController.obtenerTrabajadoresPorSucursal);

router.put('/:id/descripcion', mantenimientoController.modificarDescripcion);
router.put('/:id/costo', mantenimientoController.modificarCosto);
router.put('/:id/trabajador', mantenimientoController.modificarTrabajador);

router.put('/:id/fechaFinMantenimiento', mantenimientoController.establecerFechaFinMantenimiento);

router.patch('/autos/:idAuto/estado', mantenimientoController.actualizarEstadoAuto);

module.exports = router;
