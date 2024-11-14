// Rutas para usuario
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// api/usuarios
router.post('/', usuarioController.crearUsuario);
router.post('/registrar', usuarioController.crearUsuario);
router.get('/', usuarioController.obtenerUsuarios);
router.get('/email/:email', usuarioController.obtenerUsuarioPorEmail);
router.get('/:id', usuarioController.obtenerUsuario);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);
router.post('/loginUsuario', usuarioController.loginUsuario);
router.put('/editar-datos-usuario/:email', usuarioController.actualizarUsuarioPrueba);
router.get('/datos/:id', usuarioController.obtenerAlquileresLogueado);

// Usado en el listado alquiler para obtener por rol
router.get('/rol/:rol', usuarioController.obtenerUsuariosPorRol);
// Usado en el listado alquiler para meter el alquiler en el array
router.put('/:id/alquileres', usuarioController.actualizarAlquileresUsuario);
router.put('/:id/alquileres/:alquilerId/estado', usuarioController.actualizarEstadoAlquilerUsuario);


module.exports = router;
