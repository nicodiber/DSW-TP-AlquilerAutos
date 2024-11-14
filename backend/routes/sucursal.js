const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController'); 

// Rutas para gestión de sucursales
router.post('/', sucursalController.crearSucursal);                  // Crear sucursal
router.get('/', sucursalController.obtenerSucursales);               // Obtener todas las sucursales
router.get('/:id', sucursalController.obtenerSucursal);              // Obtener sucursal por ID
router.put('/:id', sucursalController.actualizarSucursal);           // Actualizar sucursal por ID
router.delete('/:id', sucursalController.eliminarSucursal);          // Eliminar sucursal por ID

// Ruta para obtener los trabajadores asignados y no asignados a una sucursal específica
router.get('/:id/trabajadores', sucursalController.obtenerTrabajadoresParaAsignacion);

// Ruta para asignar o desasignar trabajadores a una sucursal
router.post('/:id/asignar-trabajadores', sucursalController.asignarTrabajadores);

module.exports = router;
