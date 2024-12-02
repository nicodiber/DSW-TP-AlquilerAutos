// Rutas para usuario
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

const auth = require('../middlewares/auth'); // Middleware de autenticación
const validarRol = require('../middlewares/validarRol'); // Middleware para validar rol

// api/usuarios
router.post('/', auth.authMiddleware, validarRol.validarRolAdmin, usuarioController.crearUsuario);
router.get('/', auth.authMiddleware, validarRol.validarRolAdmin, usuarioController.obtenerUsuarios);
router.get('/:id', auth.authMiddleware, validarRol.validarRolAdmin, usuarioController.obtenerUsuario);
router.put('/:id', auth.authMiddleware, validarRol.validarRolAdmin, usuarioController.actualizarUsuario);
router.delete('/:id', auth.authMiddleware, validarRol.validarRolAdmin, usuarioController.eliminarUsuario);

router.put('/editar-datos-usuario/:email', auth.authMiddleware, validarRol.validarRolTodos, usuarioController.actualizarUsuarioPrueba);
router.put('/cambiar-password/:email', auth.authMiddleware, validarRol.validarRolTodos, usuarioController.cambiarPassword);


router.get('/datos/:id', usuarioController.obtenerAlquileresLogueado);

// Usado en el listado alquiler para obtener por rol
router.get('/rol/:rol', usuarioController.obtenerUsuariosPorRol);
// Usado en el listado alquiler para meter el alquiler en el array
router.put('/:id/alquileres', usuarioController.actualizarAlquileresUsuario);
router.put('/:id/alquileres/:alquilerId/estado', usuarioController.actualizarEstadoAlquilerUsuario);


module.exports = router;
