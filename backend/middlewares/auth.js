const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

exports.authMiddleware = (req, res, next) => {
  // Lee el token del encabezado Authorization
  const authHeader = req.header('Authorization');

  // Verifica si no hay token
  if (!authHeader) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    // Extrae el token eliminando el prefijo "Bearer "
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7, authHeader.length)
      : authHeader;

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agrega los datos del usuario decodificados a req.user
    req.user = decoded;

    // Continua con el siguiente middleware o controlador
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ msg: 'Token no válido' });
  }
};
