const Usuario = require("../models/usuario");
const { getNextSequenceValue } = require('../config/db');
const usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');

exports.crearUsuario = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('usuarioId');
    const { nombre, apellido, email, password, licenciaConductor, telefono, direccion, dni, rol } = req.body;

    // Encripta la contraseña antes de crear el usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let usuario = new Usuario({
      _id,
      nombre,
      apellido,
      email,
      password: hashedPassword, // Usa la contraseña encriptada
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
    } else {
      res.status(500).send('Hubo un error al crear el usuario');
    }
  }
};


exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate({
      path: 'alquileres',
      populate: [
        {
          path: 'auto',
          populate: {
            path: 'modeloAuto' 
          }
        },
        { path: 'sucursalEntrega'},
        { path: 'sucursalDevolucion'},
         ]
    });
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

    // Encriptar la nueva contraseña si se proporciona
    if (password) {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(password, salt);
    }

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

exports.actualizarUsuarioPrueba = async (req, res) => {
  try {
    const { password, ...resto } = req.body;

    // Si se proporciona una nueva contraseña, encriptarla
    if (password) {
      const salt = await bcrypt.genSalt(10);
      resto.password = await bcrypt.hash(password, salt);
    }

    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { email: req.params.email },
      resto,
      { new: true }  
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
    } else {
      res.status(500).send('Hubo un error al actualizar el usuario');
    }
  }
};
  
exports.obtenerUsuariosPorRol = async (req, res) => {
  const { rol } = req.params; // Obtiene el rol desde el parámetro de ruta
  try {
    const usuarios = await Usuario.find({ rol }); // Filtra los usuarios por rol
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

// Controlador para actualizar solo el array de alquileres del usuario
exports.actualizarAlquileresUsuario = async (req, res) => {
  const userId = req.params.id;
  const nuevoAlquiler = req.body.alquiler; // El alquiler completo se pasa directamente en el cuerpo de la solicitud

  try {
    // Encuentra al usuario y añade el nuevo alquiler en el array de alquileres
    const usuario = await Usuario.findByIdAndUpdate(
      userId,
      { $push: { alquileres: nuevoAlquiler } },  // Agregamos el objeto alquiler directamente
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuario); // Devuelve el usuario actualizado
  } catch (error) {
    console.error('Error al agregar alquiler al usuario:', error);
    res.status(500).json({ message: 'Error al agregar alquiler al usuario', error });
  }
};

exports.actualizarEstadoAlquilerUsuario = async (req, res) => {
  const userId = req.params.id;
  const alquilerId = req.params.alquilerId;
  const nuevoEstado = req.body.nuevoEstado; // El nuevo estado del alquiler
  
  try {
    // Busca el usuario y actualiza el estado del alquiler en el array
    const usuario = await Usuario.findOneAndUpdate(
      { _id: userId, 'alquileres._id': alquilerId },
      { $set: { 'alquileres.$.estadoAlquiler': nuevoEstado } }, // `$` apunta al alquiler coincidente en el array
      { new: true }
      
    );

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario o alquiler no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al actualizar el estado del alquiler en el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el estado del alquiler', error });
  }
};




exports.cambiarPassword = async (req, res) => {
  try {
    const { contrasenaActual, nuevaContrasena } = req.body;

    if (!contrasenaActual || !nuevaContrasena) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const usuario = await Usuario.findOne({ email: req.params.email });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const esValida = await bcrypt.compare(contrasenaActual, usuario.password);
    if (!esValida) {
      return res.status(401).json({ message: 'La contraseña actual es incorrecta' });
    }

    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(nuevaContrasena, salt);

    await usuario.save();
    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor al cambiar la contraseña' });
  }
};


exports.cancelarAlquiler = async (req, res) => {
  const userId = req.params.id;
  const alquilerId = req.params.alquilerId;
  const nuevoEstado = req.body.nuevoEstado; // El nuevo estado del alquiler
  
  try {
    // Busca el usuario y actualiza el estado del alquiler en el array
    const usuario = await Usuario.findOneAndUpdate(
      { _id: userId, 'alquileres._id': alquilerId },
      { $set: { 'alquileres.$.estadoAlquiler': nuevoEstado } }, // `$` apunta al alquiler coincidente en el array
      { new: true }
      
    );

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario o alquiler no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al actualizar el estado del alquiler en el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el estado del alquiler', error });
  }
};