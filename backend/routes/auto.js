const express = require('express');
const router = express.Router();
const autoController = require('../controllers/autoController'); 

router.post('/', autoController.crearAuto);
router.get('/', autoController.obtenerAutos);
router.get('/:id', autoController.obtenerAuto);
router.put('/:id', autoController.actualizarAuto);
router.delete('/:id', autoController.eliminarAuto);

module.exports = router;
