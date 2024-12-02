const Usuario = require("../models/usuario");
const { getNextSequenceValue } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

exports.registrarse = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('usuarioId'); 
    const { nombre, apellido, email, password, licenciaConductor, telefono, direccion, dni, rol } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let usuario = new Usuario({
      _id,
      nombre,
      apellido,
      email,
      password: hashedPassword,
      licenciaConductor,
      telefono,
      direccion,
      dni,
      rol: 'usuario',
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


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.json({
      msg: 'Inicio de sesión exitoso',
      token,
      usuario,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error al iniciar sesión' });
  }
};
