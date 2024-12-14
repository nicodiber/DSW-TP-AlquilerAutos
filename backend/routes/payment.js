// payment.js
const express = require('express');
const { createSession, createPayment } = require('../controllers/paymentController'); // Importa la función


const router = express.Router();


router.get('/', (req, res) => {  // <-- Función de callback
  res.send('Hola desde la ruta de pago'); 
});

router.post('/create-checkout-session', createSession);

// En tu backend, configura las rutas de éxito y cancelación para que Stripe redirija al usuario después del pago


module.exports = router;