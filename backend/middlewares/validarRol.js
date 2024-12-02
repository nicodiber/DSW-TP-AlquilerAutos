const usuario = require("../models/usuario");

exports.validarRolAdmin = (req, res, next) => {
  if (req.user.rol !== 'administrador') {
    return res.status(403).json({ msg: 'Acceso denegado: no tienes permisos suficientes' });
  }
  next();
};

exports.validarRolAdminTrabajador = (req, res, next) => {
  if (req.user.rol !== 'administrador' && req.user.rol !== 'trabajador') {
    return res.status(403).json({ msg: 'Acceso denegado: no tienes permisos suficientes' });
  }
  next();
};

exports.validarRolUsuario = (req, res, next) => {
  if (req.user.rol !== 'usuario') {
    return res.status(403).json({ msg: 'Acceso denegado: no tienes permisos suficientes' });
  }
  next();
};

exports.validarRolTodos = (req, res, next) => {
  if (req.user.rol !== 'administrador' && req.user.rol !== 'trabajador' && req.user.rol !== 'usuario') {
    return res.status(403).json({ msg: 'Acceso denegado: no tienes permisos suficientes' });
  }
  next();
};