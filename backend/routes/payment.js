const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();
const middleware = require('../middlewares/autorizaciones');

router.post('/create-checkout-session', middleware.validarToken, paymentController.createSession);
router.post('/create-checkout-session-incidente', middleware.validarToken, paymentController.createSessionIncidente);

module.exports = router;