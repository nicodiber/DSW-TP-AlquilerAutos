const express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modeloController'); 

router.post('/', modeloController.crearModelo);
router.get('/', modeloController.obtenerModelos);
router.get('/:id', modeloController.obtenerModelo);
router.put('/:id', modeloController.actualizarModelo);
router.delete('/:id', modeloController.eliminarModelo);

module.exports = router;
