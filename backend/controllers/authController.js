const Usuario = require("../models/usuario");
const { getNextSequenceValue } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioToken = require("../models/usuarioToken");
require('dotenv').config({ path: 'variables.env' });
const nodemailer = require('nodemailer');
const cookieParser = require("cookie-parser");

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
      return res.status(404).json({ msg: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { _id: usuario._id, rol: usuario.rol }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 1 * 60 * 60 * 1000, // 1 hora 
      //expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 día
    };

    res.cookie('access_token', token, cookieOptions);
    
    return res.status(200).json({
      msg: 'Inicio de sesión exitoso',
      usuario: { _id: usuario._id, nombre: usuario.nombre, rol: usuario.rol }, 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error al iniciar sesión' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('access_token', { path: '/' }); 
  return res.status(200).json({ msg: 'Sesión cerrada exitosamente' });
};

exports.obtenerUsuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user._id); 
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Retornar los datos del usuario
    res.json(usuario);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

exports.enviarEmail = async (req, res) => {
  const { email } = req.body;

  try {
    
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    const payload = {
      email: usuario.email
    }
    const tiempoExpiracion = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: tiempoExpiracion})

   const nuevoToken = new usuarioToken({
      idUsurio: usuario._id,
      token: token
   });
   
   const transportadorMail = nodemailer.createTransport({
    service: "gmail", //esto es solo para enviar, no afecta al destinatario
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
    rejectUnauthorized: false
  }
   });
   let detallesEmail = {
    from: "nebarent@gmail.com",
    to: email, //valido para cualquier tipo de email
    subject: "Restablecer la contraseña",
    html:`
    <html>
    <head>
        <title>Restablece tu contraseña</title>
    </head>
    <body>
        <h1>Cuenta Nebarent</h1>
        <h2>Restablece tu contraseña</h2>
        <p>Estimado/a ${usuario.nombre} ${usuario.apellido}:</p>
        <p>Has solicitado restablecer tu contraseña y se te ha enviado un correo para restablecerla. Haz clic en el botón a continuación para completar el restablecimiento de tu contraseña.</p>
        <a href="${process.env.LIVE_URL}/reset/${token}"><button style="background-color: #dbb700; color: white; padding: 14px 20px; border: none; cursor: pointer; text-align: center; border-radius: 4px; font-size: 16px;">Restablecer contraseña</button></a>
        <p>Tenga en cuenta que este enlace sólo es válido durante un tiempo limitado. Si no ha solicitado un restablecimiento de contraseña, ignore este mensaje.</p>
        <p>Muchas Gracias,</p>
        <p>Su Equipo de Nebarent account</p>
</body>
</html>
    `,
      };
      transportadorMail.sendMail(detallesEmail, async(err, data)=>{
        if(err){
          console.log(err);
          return res.status(500).json({ msg: "Ocurrio un error al enviar el email" });
        }else{
          await nuevoToken.save();
          return res.status(200).json({ msg: "Email enviado correctamente!" });
        }
      })

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error al enviar el mail' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  

  if (!password) {
    return res.status(400).json({ msg: "La nueva contraseña es requerida" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "El link de reinicio ha expirado o es inválido" });
    } else {
      const usuario = await Usuario.findOne({ email: data.email }); 
      if (!usuario) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      usuario.password = hashedPassword;

      try {
        await usuario.save();
        return res.status(200).json({ msg: "Contraseña actualizada correctamente!" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Hubo un error al resetear la contraseña" });
      }
    }
  });
};

exports.verificarToken = async (req, res) => {
  const token = req.cookies.access_token;
  if (token) {
    return res.json({ existe: true });
  }
  else{
  return res.json({ existe: false });
  }
 
};

exports.obtenerAlquileresLogueado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).populate({
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

    if (!usuario) {
      return res.status(404).json({ msg: 'No existe ese usuario' });
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener el usuario');
  }
};