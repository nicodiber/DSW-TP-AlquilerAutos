const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const middleware = require('../middlewares/autorizaciones');

// api/usuarios
router.post('/login',middleware.soloPublico, authController.login);
router.post('/registrar', middleware.soloPublico, authController.registrarse);
router.post('/enviar-email', authController.enviarEmail);
router.post('/reset-password', authController.resetPassword);
router.post('/logout', authController.logout);
router.get('/perfil', middleware.validarToken, authController.obtenerUsuarioAutenticado);
router.get('/verificarToken', authController.verificarToken);

router.get('/datos/:id', authController.obtenerAlquileresLogueado);
module.exports = router;