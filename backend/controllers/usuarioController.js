const Usuario = require("../models/usuario");
const { getNextSequenceValue } = require('../config/db');

exports.crearUsuario = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('usuarioId'); 
    const { nombre, apellido, email, password, licenciaConductor, telefono, direccion, dni, rol } = req.body;

    let usuario = new Usuario({
      _id,
      nombre,
      apellido,
      email,
      password,
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
    const { nombre, apellido, email, password, licenciaConductor, telefono, direccion, dni, rol } = req.body;

    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ msg: 'No existe ese usuario' });
    }


    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.password = password;
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

exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Validar contraseña (en este caso simple comparación de texto plano)
    if (usuario.password !== password) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    // Devolver el rol del usuario para la redirección en el frontend
    res.json({
      usuario,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al iniciar sesión');
  }
};

exports.obtenerUsuarioPorEmail = async (req, res) => {
    try {
        const email = req.params.email;  // Tomamos el email de los parámetros de la URL
        const usuario = await Usuario.findOne({ email: email });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Devolvemos los datos del usuario
        return res.json({ usuario });
    } catch (error) {
        console.error('Error al obtener usuario por email:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};
