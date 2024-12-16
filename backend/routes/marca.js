const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController');
const middleware = require('../middlewares/autorizaciones');

router.post('/', middleware.validarToken, middleware.soloAdminYTrabajador, marcaController.crearMarca);
router.get('/', marcaController.obtenerMarcas);
router.get('/:id', marcaController.obtenerMarca);
router.put('/:id', middleware.validarToken, middleware.soloAdminYTrabajador, marcaController.actualizarMarca);
router.delete('/:id', middleware.validarToken, middleware.soloAdminYTrabajador, marcaController.eliminarMarca);

router.get('/existe-nombre/:nombreMarca', marcaController.obtenerMarcaPorNombre);

router.get('/:idMarca/marca-modelos', marcaController.obtenerModelosPorMarca);
router.get('/:idMarca/existe-modelos', marcaController.verificarModelosPorMarca);

module.exports = router;
