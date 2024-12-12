const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const Usuario = require("../models/usuario");

exports.soloAdmin = async (req, res, next) => {
try {
    if (req.user.rol === 'administrador') {
      return next();
    }
    return res.status(403).json({ message: 'Acceso denegado: no tienes permisos suficientes' });
  } catch (error) {
    return res.status(500).json({ msg: 'Error en el servidor', error });
  }
};


exports.soloAdminYTrabajador = async (req, res, next) => {
  try {
    const usuarioLogueado = await Usuario.findById(req.user._id);

    if (!usuarioLogueado) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    if (['administrador', 'trabajador'].includes(usuarioLogueado.rol)) {
      next();
    } else {
    return res.status(403).json({ message: 'Acceso denegado: no tienes permisos suficientes' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Error en el servidor', error });
  }
};


exports.soloUsuario = async (req, res, next) => {
try {
    if (req.user.rol === 'usuario') {
      return next();
    }
    return res.status(403).json({ message: 'Acceso denegado: no tienes permisos suficientes' });
  } catch (error) {
    return res.status(500).json({ msg: 'Error en el servidor', error });
  }
};

exports.soloPublico = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const usuarioLogueado = await Usuario.findById(decoded._id); 

      if (usuarioLogueado) {
        return res.status(403).json({ message: 'Usuario ya logueado' });
      }
    }

    // Si no hay token o el usuario no está logueado lo dejamos continuar con la solicitud
    next();
  } catch (error) {
    return res.status(500).json({ msg: 'Error en el servidor', error });
  }
};


exports.validarToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied'});
    //return res.redirect(302, '/loginUsuario');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
    // return res.redirect(302, '/loginUsuario');
  }
};

