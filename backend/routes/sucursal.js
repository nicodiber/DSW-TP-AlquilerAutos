const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController'); 

router.post('/', sucursalController.crearSucursal);
router.get('/', sucursalController.obtenerSucursales);
router.get('/:id', sucursalController.obtenerSucursal);
router.put('/:id', sucursalController.actualizarSucursal);
router.delete('/:id', sucursalController.eliminarSucursal);
//router.post('/:id/asignar-trabajador', sucursalController.asignarTrabajador);
//router.post('/:id/asignar-auto', sucursalController.asignarAuto);

module.exports = router;
