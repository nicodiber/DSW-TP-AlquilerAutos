const Usuario = require("../models/usuario");
const { getNextSequenceValue } = require('../config/db');

exports.crearUsuario = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('usuarioId');
    let usuario = new Usuario({ ...req.body, _id });

    await usuario.save();
    res.send(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const {
      mailUsuario,
      contraseñaUsuario,
      cuilUsuario,
      nombreUsuario,
      apellidoUsuario,
      situacionFiscalUsuario,
      provinciaUsuario,
      ciudadUsuario,
      codigoPostalUsuario,
      telefonoUsuario
    } = req.body;

    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      res.status(404).json({ msg: 'No existe ese usuario' });
      return;
    }

    usuario.mailUsuario = mailUsuario;
    usuario.contraseñaUsuario = contraseñaUsuario;
    usuario.cuilUsuario = cuilUsuario;
    usuario.nombreUsuario = nombreUsuario;
    usuario.apellidoUsuario = apellidoUsuario;
    usuario.situacionFiscalUsuario = situacionFiscalUsuario;
    usuario.provinciaUsuario = provinciaUsuario;
    usuario.ciudadUsuario = ciudadUsuario;
    usuario.codigoPostalUsuario = codigoPostalUsuario;
    usuario.telefonoUsuario = telefonoUsuario;

    usuario = await Usuario.findOneAndUpdate({ _id: req.params.id }, usuario, { new: true });
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerUsuario = async (req, res) => {
  try {
    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      res.status(404).json({ msg: 'No existe ese usuario' });
      return;
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      res.status(404).json({ msg: 'No existe ese usuario' });
      return;
    }

    await Usuario.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};