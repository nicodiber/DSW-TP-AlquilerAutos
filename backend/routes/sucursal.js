const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController'); 

router.post('/', sucursalController.crearSucursal);
router.get('/', sucursalController.obtenerSucursales);
router.get('/:id', sucursalController.obtenerSucursal);
router.put('/:id', sucursalController.actualizarSucursal);
router.delete('/:id', sucursalController.eliminarSucursal);

/*
// Ruta para asignar trabajadores a una sucursal
router.post('/:id/asignar-trabajadores', sucursalController.asignarTrabajadores);

router.get('/:id/trabajadores', sucursalController.obtenerTrabajadoresSucursal);
*/

// Obtener trabajadores para asignar a una sucursal
router.get('/:id/trabajadores', sucursalController.obtenerTrabajadoresParaAsignacion);

// Asignar o desasignar trabajadores a la sucursal
router.post('/:id/asignar-trabajadores', sucursalController.asignarTrabajadores);

// Ruta para obtener los trabajadores de una sucursal específica
router.get('/:id/trabajadores', sucursalController.obtenerTrabajadoresSucursal);

module.exports = router;
