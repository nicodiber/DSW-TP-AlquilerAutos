const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController'); 

router.post('/', sucursalController.crearSucursal);
router.get('/', sucursalController.obtenerSucursales);
router.get('/:id', sucursalController.obtenerSucursal);
router.put('/:id', sucursalController.actualizarSucursal);
router.delete('/:id', sucursalController.eliminarSucursal);

// Ruta para asignar trabajadores a una sucursal
router.post('/:id/asignar-trabajadores', sucursalController.asignarTrabajadores);

module.exports = router;
