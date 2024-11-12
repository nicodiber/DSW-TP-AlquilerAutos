const Usuario = require("../models/usuario");
const { getNextSequenceValue } = require('../config/db');
const usuario = require("../models/usuario");

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
    // Verificar si el error es de duplicado de clave en MongoDB
    if (error.code === 11000 && error.keyValue) {
      // Detectar el campo duplicado específico
      const field = Object.keys(error.keyValue)[0];
      const errorMsg = field === 'email'
        ? 'El Correo Electronico ya está en uso. Intenta con uno diferente.'
        : field === 'dni'
        ? 'El DNI ya está registrado. Verifica los datos ingresados.'
        : field === 'licenciaConductor'
        ? 'La licencia de conductor ya está en uso. Verifica los datos ingresados.'
        : 'Valor duplicado en un campo único.';

      return res.status(409).json({ msg: errorMsg });
    } else {
      res.status(500).send('Hubo un error al crear el usuario');
    }
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

    if (error.code === 11000 && error.keyValue) {
      // Detectar el campo duplicado específico
      const field = Object.keys(error.keyValue)[0];
      const errorMsg = field === 'email'
        ? 'El Correo Electronico ya está en uso. Intenta con uno diferente.'
        : field === 'dni'
        ? 'El DNI ya está registrado. Verifica los datos ingresados.'
        : field === 'licenciaConductor'
        ? 'La licencia de conductor ya está en uso. Verifica los datos ingresados.'
        : 'Valor duplicado en un campo único.';

      return res.status(409).json({ msg: errorMsg });
    }else {
    res.status(500).send('Hubo un error al actualizar el usuario');
    }
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
  //este ya no se usa
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

exports.actualizarUsuarioPrueba = async (req, res) => {
  try {
    const usuarioActualizado = await usuario.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }  // Para que devuelva el usuario actualizado
    );
    
    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    console.log(error);

    if (error.code === 11000 && error.keyValue) {
      
      const field = Object.keys(error.keyValue)[0];
      const errorMsg = field === 'email'
        ? 'El Correo Electronico ya está en uso. Intenta con uno diferente.'
        : field === 'dni'
        ? 'El DNI ya está registrado. Verifica los datos ingresados.'
        : field === 'licenciaConductor'
        ? 'La licencia de conductor ya está en uso. Verifica los datos ingresados.'
        : 'Valor duplicado en un campo único.';

      return res.status(409).json({ msg: errorMsg });
    }else {
    res.status(500).send('Hubo un error al actualizar el usuario');
    }}
  }
  
exports.obtenerUsuariosPorRol = async (req, res) => {
  const { rol } = req.params; // Obtiene el rol desde el parámetro de ruta
  try {
    const usuarios = await Usuario.find({ rol }); // Filtra los usuarios por rol
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};
