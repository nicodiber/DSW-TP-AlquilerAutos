const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController'); 
const middleware = require('../middlewares/autorizaciones');

router.post('/', middleware.validarToken, middleware.soloAdminYTrabajador, categoriaController.crearCategoria);
router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoria);
router.put('/:id', middleware.validarToken, middleware.soloAdminYTrabajador, categoriaController.actualizarCategoria);
router.delete('/:id', middleware.validarToken, middleware.soloAdminYTrabajador, categoriaController.eliminarCategoria);

router.get('/existe-nombre/:nombreCategoria', categoriaController.obtenerCategoriaPorNombre);

router.get('/:idCategoria/categoria-modelos', categoriaController.obtenerModelosPorCategoria);
router.get('/:idCategoria/existe-modelos', categoriaController.verificarModelosPorCategoria);

module.exports = router;
