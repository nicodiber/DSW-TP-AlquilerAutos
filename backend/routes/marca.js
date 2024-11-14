const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController');

router.post('/', marcaController.crearMarca);
router.get('/', marcaController.obtenerMarcas);
router.get('/:id', marcaController.obtenerMarca);
router.put('/:id', marcaController.actualizarMarca);
router.delete('/:id', marcaController.eliminarMarca);

router.get('/existe-nombre/:nombreMarca', marcaController.obtenerMarcaPorNombre);

router.get('/:idMarca/marca-modelos', marcaController.obtenerModelosPorMarca);
router.get('/:idMarca/existe-modelos', marcaController.verificarModelosPorMarca);

module.exports = router;
