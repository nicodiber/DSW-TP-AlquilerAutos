// Rutas para tipo
const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipoController');

// api/tipos
router.post('/', tipoController.crearTipo);
router.get('/', tipoController.obtenerTipos);
router.get('/:id', tipoController.obtenerTipo);
router.put('/:id', tipoController.actualizarTipo);
router.delete('/:id', tipoController.eliminarTipo);

module.exports = router;
