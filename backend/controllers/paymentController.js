const Stripe = require('stripe');
const alquiler = require('../models/alquiler')

const stripe = new Stripe('sk_test_51QVnALIH5hl8sEK2JgueWLOqmomQmQ2d3F9bQluixTIhSGT8h0U1DM4T5YV8kVSGLXAv2ftnETzYPpI3HH88Hmza00jvBJ8bDp');

const createSession = async (req, res) => {
  const { amount } = req.body;

  try {
    // Crear la sesión de pago
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Alquiler de auto',
            },
            unit_amount: amount,  // El monto que se pasa en centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4200/cancel',
    });

    // Devolver el sessionId
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error al crear la sesión de pago:', error);
    res.status(500).json({ message: 'Error al crear la sesión de pago', error: error.message });
  }
};
  
  

// Crear un pago
const createPayment = async (req, res) => {
    const { alquilerId, token, amount } = req.body;

    try {
        // Verificar si existe el alquiler
        const alquiler = await Alquiler.findById(alquilerId);
        if (!alquiler) {
            return res.status(404).json({ message: 'Alquiler no encontrado' });
        }

        // Crear un cargo en Stripe
        const charge = await stripe.charges.create({
            amount: Math.round(amount * 100), // Stripe usa centavos
            currency: 'usd',
            source: token, // Token generado en el frontend
            description: `Pago para el alquiler ID: ${alquilerId}`,
        });

        // Actualizar el estado del alquiler después del pago exitoso
        alquiler.estadoAlquiler = 'activo'; // Ajusta según tus necesidades
        await alquiler.save();

        res.status(200).json({
            message: 'Pago realizado con éxito',
            charge,
        });
    } catch (error) {
        console.error('Error en el pago:', error.message);
        res.status(500).json({
            message: 'Error al procesar el pago',
            error: error.message,
        });
    }
};

module.exports = { createSession, createPayment }; // Exporta la función usando CommonJS