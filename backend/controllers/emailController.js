// controllers/emailController.js
const axios = require('axios'); // Usamos axios para hacer peticiones HTTP a la API externa

// Controlador para validar el correo electrónico
exports.validateEmail = async (req, res) => {
  const { email } = req.body;

  // Verificar que el correo se haya enviado en la solicitud
  if (!email) {
    return res.status(400).json({ message: 'El correo electrónico es requerido' });
  }

  // Llamar a la API de validación de correo (MailboxLayer en este caso)
  try {
    const response = await axios.get(`https://api.mailboxlayer.com/check?access_key=36647738131d7c3a40dd7a94c2d1a04e&email=${email}`);
    const data = response.data;

    // Validar la respuesta de la API (comprobar si el correo es válido o no)
    if (data && data.smtp_check === true) {
      return res.status(200).json({ message: 'Correo válido' });
    } else {
      return res.status(400).json({ message: 'Correo inválido' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al validar el correo' });
  }
};
