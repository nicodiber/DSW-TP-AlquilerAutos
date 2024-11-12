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
// Usado en el listado alquiler para obtener por rol
router.get('/rol/:rol', usuarioController.obtenerUsuariosPorRol);

module.exports = router;
