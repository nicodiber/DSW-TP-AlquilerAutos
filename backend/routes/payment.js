// payment.js
const express = require('express');
const router = express.Router();
const { createSession } = require('../controllers/paymentController'); // Importa la función

router.get('/', (req, res) => {  // <-- Función de callback
  res.send('Hola desde la ruta de pago'); 
});

router.post('/create-checkout-session', createSession);

module.exports = router;