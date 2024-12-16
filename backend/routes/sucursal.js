// Importar los módulos necesarios
const express = require('express');
const router = express.Router(); // Crea un enrutador para manejar las rutas relacionadas con sucursales
const sucursalController = require('../controllers/sucursalController'); // Importa el controlador de sucursal
const middleware = require('../middlewares/autorizaciones');

// Rutas para gestión de sucursales
router.post('/', middleware.validarToken, middleware.soloAdmin, sucursalController.crearSucursal);                  // Crear sucursal
router.get('/', sucursalController.obtenerSucursales);               // Obtener todas las sucursales
router.get('/:id',sucursalController.obtenerSucursal);              // Obtener sucursal por ID
router.put('/:id',middleware.validarToken, middleware.soloAdmin, sucursalController.actualizarSucursal);           // Actualizar sucursal por ID
router.delete('/:id',middleware.validarToken, middleware.soloAdmin, sucursalController.eliminarSucursal);          // Eliminar sucursal por ID

// Ruta para obtener los trabajadores asignados y no asignados a una sucursal específica
router.get('/:id/obtener-trabajadores', middleware.validarToken, middleware.soloAdmin, sucursalController.obtenerTrabajadoresParaAsignacion);

// Ruta para asignar o desasignar trabajadores a una sucursal
router.post('/:id/asignar-trabajadores', middleware.validarToken, middleware.soloAdmin, sucursalController.asignarTrabajadores);

// Ruta para obtener los autos asignados y no asignados a una sucursal específica
router.get('/:id/obtener-autos', middleware.validarToken, middleware.soloAdmin, sucursalController.obtenerAutosParaAsignacion);

// Ruta para asignar o desasignar autos a una sucursal
router.post('/:id/asignar-autos', middleware.validarToken, middleware.soloAdmin, sucursalController.asignarAutos);

// Exportar las rutas definidas para que puedan ser utilizadas en otras partes de la aplicación
module.exports = router;
