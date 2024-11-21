// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');  // Asegúrate de importar el controlador correctamente

// Ruta para validar el correo electrónico
router.post('/validate-email', emailController.validateEmail);

module.exports = router;
