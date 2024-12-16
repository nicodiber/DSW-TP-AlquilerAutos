const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controllers/mantenimientoController');
const middleware = require('../middlewares/autorizaciones');

router.post('/', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.crearMantenimiento);
router.post('/mantenimientoAlquiler/:idAuto', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.crearMantenimientoAlquiler);
router.get('/', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.obtenerMantenimientos);                                        // Obtiene todos los mantenimientos
router.get('/:id', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.obtenerMantenimiento);                                      // Obtener un mantenimiento específico
router.put('/:id', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.actualizarMantenimiento);                                   // Actualizar mantenimiento
router.delete('/:id', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.eliminarMantenimiento);                                  // Eliminar mantenimiento

router.get('/trabajadores-sucursal/:sucursalId', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.obtenerTrabajadoresPorSucursal);

router.put('/:id/descripcion', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.modificarDescripcion);
router.put('/:id/costo', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.modificarCosto);
router.put('/:id/trabajador', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.modificarTrabajador);

router.put('/:id/fechaFinMantenimiento', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.establecerFechaFinMantenimiento);

router.patch('/autos/:idAuto/estado', middleware.validarToken, middleware.soloAdminYTrabajador, mantenimientoController.actualizarEstadoAuto);

module.exports = router;
