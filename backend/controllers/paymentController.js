const Stripe = require('stripe');

const stripe = new Stripe('sk_test_51QVnALIH5hl8sEK2JgueWLOqmomQmQ2d3F9bQluixTIhSGT8h0U1DM4T5YV8kVSGLXAv2ftnETzYPpI3HH88Hmza00jvBJ8bDp');

const createSession = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: 'Auto',
                        description: 'Autazo',
                    },
                    currency: 'usd',
                    unit_amount: 20000,
                },
                quantity: 1,    
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:4200/success',
        cancel_url: 'http://localhost:4200/cancel'
    });
    return res.json(session);
}

module.exports = { createSession }; // Exporta la función usando CommonJS