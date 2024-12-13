import {MercadoPagoConfig,Payment} from "mercadopago";

const client = MercadoPagoConfig({
  accessToken: 'TEST-5524215952965706-121216-ed24e77348d7f68a5735511b58018c93-818792784',
   options: { timeout: 5000, idempotencyKey: 'abc' }
})

const payment = new Payment(client);

const body = {
	transaction_amount: 12.34,
	description: 'Auto',
	payment_method_id: 'ARS',
	payer: {
		email: 'aletebes03@gmail.com'
	},
};



payment.create({ body, requestOptions }).then(console.log).catch(console.log)
