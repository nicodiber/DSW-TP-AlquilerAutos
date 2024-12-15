const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-checkout-session', paymentController.createSession);
router.post('/create-checkout-session-incidente', paymentController.createSessionIncidente);

module.exports = router;