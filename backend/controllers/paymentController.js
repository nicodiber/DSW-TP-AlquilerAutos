const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51QVnALIH5hl8sEK2JgueWLOqmomQmQ2d3F9bQluixTIhSGT8h0U1DM4T5YV8kVSGLXAv2ftnETzYPpI3HH88Hmza00jvBJ8bDp');

exports.createSession = async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ message: 'El monto es obligatorio y debe ser un número.' });
  }

  try {
    // Crear la sesión de pago
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ars',
            product_data: {
              name: 'Reserva de alquiler',
            },
            unit_amount: amount * 100, // Stripe usa centavos, así que multiplicamos el monto por 100
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:4200/alquiler-completado?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4200/alquiler-revision',
    });

    // Devolver el sessionId
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error al crear la sesión de pago:', error);
    res.status(500).json({ message: 'Error al crear la sesión de pago', error: error.message });
  }
};

exports.createSessionIncidente = async (req, res) => {
  try {
    const { amount, idIncidente } = req.body; 
    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ message: 'El monto es obligatorio y debe ser un número.' });
    }
    
    const encodedId = Buffer.from(idIncidente.toString()).toString('base64'); // Codificar el idIncidente

    // Crear la sesión de pago
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ars',
            product_data: {
              name: `Pago de Incidente #${idIncidente}`,
            },
            unit_amount: amount * 100, // Stripe usa centavos, así que multiplicamos el monto por 100
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:4200/incidentes?session_id=${encodedId}s{CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:4200/incidentes`,
    });

    // Devolver el sessionId
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error al crear la sesión de pago:', error);
    res.status(500).json({ message: 'Error al crear la sesión de pago', error: error.message });
  }
};

