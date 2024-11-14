const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController'); 

router.post('/', categoriaController.crearCategoria);
router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoria);
router.put('/:id', categoriaController.actualizarCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);

router.get('/existe-nombre/:nombreCategoria', categoriaController.obtenerCategoriaPorNombre);

router.get('/:idCategoria/categoria-modelos', categoriaController.obtenerModelosPorCategoria);
router.get('/:idCategoria/existe-modelos', categoriaController.verificarModelosPorCategoria);

module.exports = router;
