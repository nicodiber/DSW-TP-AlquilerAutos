const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController');

// Rutas para marcas
router.post('/', marcaController.crearMarca);  // Crear una nueva marca
router.get('/', marcaController.obtenerMarcas);  // Obtener todas las marcas
router.get('/:id', marcaController.obtenerMarca);  // Obtener una marca por ID
router.put('/:id', marcaController.actualizarMarca);  // Actualizar una marca por ID
router.delete('/:id', marcaController.eliminarMarca);  // Eliminar una marca por ID

module.exports = router;
