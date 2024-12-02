const express = require('express');
const router = express.Router();
const alquilerController = require('../controllers/alquilerController'); 
const autoController = require('../controllers/autoController');
const auth = require('../middlewares/auth'); // Middleware de autenticación
const validarRol = require('../middlewares/validarRol'); // Middleware para validar rol

router.post('/', auth.authMiddleware, validarRol.validarRolUsuario, alquilerController.crearAlquiler);
router.get('/', auth.authMiddleware, validarRol.validarRolAdminTrabajador, alquilerController.obtenerAlquileres);
router.get('/:id', auth.authMiddleware, validarRol.validarRolAdmin, alquilerController.obtenerAlquiler);

// Especificos
router.put('/:id/fechaInicioReal', auth.authMiddleware, validarRol.validarRolAdminTrabajador, alquilerController.establecerFechaInicioReal);
router.put('/:id/fechaFinReal', auth.authMiddleware, validarRol.validarRolAdminTrabajador, alquilerController.establecerFechaFinReal);
router.put('/:id/notas', auth.authMiddleware, validarRol.validarRolAdminTrabajador, alquilerController.modificarNotas);
router.put('/:id/trabajador', auth.authMiddleware, validarRol.validarRolAdmin, alquilerController.modificarTrabajador);
router.put('/:id/estado', auth.authMiddleware, validarRol.validarRolAdminTrabajador, alquilerController.cambiarEstado);

router.patch('/autos/:id/estado', autoController.actualizarEstadoAuto); // PATCH porque se actualiza parcialmente el objeto
router.patch('/autos/:id/sucursal', autoController.actualizarSucursalAuto);

// Usado por Buscador
router.post('/buscarModelosDisponibles', alquilerController.buscarModelosDisponibles);


module.exports = router;