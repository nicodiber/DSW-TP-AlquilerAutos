import express from 'express';
import { createPayment, webhookHandler } from './paymentController.js';

const router = express.Router();

// Endpoint para crear un pago
router.post('/create', createPayment);

// Endpoint para manejar notificaciones de Mercado Pago
router.post('/webhook', webhookHandler);

export default router;
