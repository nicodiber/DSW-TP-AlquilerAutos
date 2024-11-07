require('dotenv').config({ path: 'smtp.env' }); // Cargar variables de entorno smtp
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configuración de la ruta para enviar correo
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Configuración de transporte SMTP para Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // false para port 587, true para port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Opciones del correo
  const mailOptions = {
    from: email,
    to: 'bneirotti@gmail.com', // Dirección de correo donde deseas recibir los mensajes
    subject: 'Nuevo mensaje de contacto',
    text: `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`
  };

  // Enviar el correo
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Mensaje enviado correctamente por correo electrónico' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje', error });
  }
});

module.exports = router;
