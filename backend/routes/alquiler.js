const express = require('express');
const router = express.Router();
const alquilerController = require('../controllers/alquilerController'); 
const autoController = require('../controllers/autoController');
const middleware = require('../middlewares/autorizaciones');

router.post('/', alquilerController.crearAlquiler);
router.get('/', alquilerController.obtenerAlquileres);
router.get('/:id', alquilerController.obtenerAlquiler);

// Especificos
router.put('/:id/fechaInicioReal', middleware.validarToken, middleware.soloAdminYTrabajador, alquilerController.establecerFechaInicioReal);
router.put('/:id/fechaFinReal', middleware.validarToken, middleware.soloAdminYTrabajador, alquilerController.establecerFechaFinReal);
router.put('/:id/notas', middleware.validarToken, middleware.soloAdminYTrabajador, alquilerController.modificarNotas);
router.put('/:id/trabajador', middleware.validarToken, middleware.soloAdmin, alquilerController.modificarTrabajador);
router.put('/:id/estado', middleware.validarToken, middleware.soloAdminYTrabajador, alquilerController.cambiarEstado);

router.patch('/autos/:id/estado', autoController.reservarEstadoAuto); // PATCH porque se actualiza parcialmente el objeto
router.patch('/:idAlquiler/autos/:idAuto/estado', autoController.actualizarEstadoAuto); // PATCH porque se actualiza parcialmente el objeto
router.patch('/autos/:id/sucursal', middleware.validarToken, middleware.soloAdminYTrabajador, autoController.actualizarSucursalAuto);

// Usado por Buscador
router.post('/buscarModelosDisponibles', alquilerController.buscarModelosDisponibles);

router.put('/cancelar/:id', alquilerController.cancelarAlquiler);
module.exports = router;