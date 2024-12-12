// Rutas para usuario
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const middleware = require('../middlewares/autorizaciones');

// api/usuarios
router.post('/',middleware.validarToken, middleware.soloAdmin, usuarioController.crearUsuario);
router.get('/', middleware.validarToken, middleware.soloAdmin, usuarioController.obtenerUsuarios);
router.get('/:id',middleware.validarToken, middleware.soloAdmin, usuarioController.obtenerUsuario);
router.put('/:id',middleware.validarToken, middleware.soloAdmin, usuarioController.actualizarUsuario);
router.delete('/:id',middleware.validarToken, middleware.soloAdmin, usuarioController.eliminarUsuario);

router.put('/editar-datos-usuario/:email', usuarioController.actualizarUsuarioPrueba);
router.put('/cambiar-password/:email',middleware.validarToken, usuarioController.cambiarPassword);


//router.get('/datos/:id', usuarioController.obtenerAlquileresLogueado);  SE PASÓ A AUTH

// Usado en el listado alquiler para obtener por rol
router.get('/rol/:rol', usuarioController.obtenerUsuariosPorRol);
router.get('/trabajadores-sucursal/:sucursalId', usuarioController.obtenerTrabajadoresPorSucursal);
// Usado en el listado alquiler para meter el alquiler en el array
router.put('/:id/alquileres', usuarioController.actualizarAlquileresUsuario);
router.put('/:id/alquileres/:alquilerId/estado', usuarioController.actualizarEstadoAlquilerUsuario);

router.put('/:id/alquiler', usuarioController.cancelarAlquiler);
module.exports = router;
