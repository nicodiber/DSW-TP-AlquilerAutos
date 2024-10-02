const Usuario = require("../models/usuario");
const { getNextSequenceValue } = require('../config/db');

exports.crearUsuario = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('usuarioId'); 
    const { nombre, apellido, email, contraseña, licenciaConductor, telefono, direccion, dni, rol } = req.body;

    let usuario = new Usuario({
      _id,
      nombre,
      apellido,
      email,
      contraseña,
      licenciaConductor,
      telefono,
      direccion,
      dni,
      rol
    });

    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al crear el usuario');
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener los usuarios');
  }
};


exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña, licenciaConductor, telefono, direccion, dni, rol } = req.body;

    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ msg: 'No existe ese usuario' });
    }


    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.contraseña = contraseña;
    usuario.licenciaConductor = licenciaConductor;
    usuario.telefono = telefono;
    usuario.direccion = direccion;
    usuario.dni = dni;
    usuario.rol = rol;

    usuario = await Usuario.findOneAndUpdate({ _id: req.params.id }, usuario, { new: true });
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar el usuario');
  }
};

exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ msg: 'No existe ese usuario' });
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener el usuario');
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ msg: 'No existe ese usuario' });
    }

    await Usuario.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar el usuario');
  }
};
