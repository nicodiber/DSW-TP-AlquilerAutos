// Rutas para sucursal
const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

// api/sucursales
router.post('/', sucursalController.crearSucursal);
router.get('/', sucursalController.obtenerSucursales);
router.get('/:id', sucursalController.obtenerSucursal);
router.put('/:id', sucursalController.actualizarSucursal);
router.delete('/:id', sucursalController.eliminarSucursal);

module.exports = router;
