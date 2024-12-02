const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// api/usuarios
router.post('/login', authController.login);
router.post('/registrar', authController.registrarse);


module.exports = router;