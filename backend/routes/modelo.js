// Rutas para modelo
const express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modeloController');

// api/modeloes
router.post('/', modeloController.crearModelo);
router.get('/', modeloController.obtenerModelos);
router.put('/:id', modeloController.actualizarModelo);
router.get('/:id', modeloController.obtenerModelo);
router.delete('/:id', modeloController.eliminarModelo);

module.exports = router;