const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// api/usuarios
router.post('/login', authController.login);
router.post('/registrar', authController.registrarse);
router.post('/enviar-email', authController.enviarEmail);
router.post('/reset-password', authController.resetPassword);


module.exports = router;