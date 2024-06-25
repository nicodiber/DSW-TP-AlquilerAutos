const { connectDB, getNextSequenceValue } = require('../database');

// Función para obtener la colección de usuarios desde la base de datos
async function getUsuariosCollection() {
  const db = await connectDB();
  return db.collection('usuarios');
}

// Obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
  try {
    const collection = await getUsuariosCollection();
    const usuarios = await collection.find().toArray();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un usuario por su ID
const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const collection = await getUsuariosCollection();
    const usuario = await collection.findOne({ _id: parseInt(id) });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  const {
    email, nombre, apellido, nombreUsuario, contraseña,
    cuil, situacionFiscal, provincia, ciudad, codigoPostal,
    direccion, telefono
  } = req.body;

  try {
    const collection = await getUsuariosCollection();

    // Obtener el próximo valor de la secuencia para el _id del usuario
    const usuarioId = await getNextSequenceValue('usuarioId');

    const nuevoUsuario = {
      _id: usuarioId,
      email,
      nombre,
      apellido,
      nombreUsuario,
      contraseña,
      cuil,
      situacionFiscal,
      provincia,
      ciudad,
      codigoPostal,
      direccion,
      telefono
    };

    const result = await collection.insertOne(nuevoUsuario);

    if (result && result.insertedId) {
      res.status(201).json({ _id: result.insertedId, ...nuevoUsuario });
    } else {
      throw new Error('No se pudo crear el Usuario');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un usuario por su ID
const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const {
    email, nombre, apellido, nombreUsuario, contraseña,
    cuil, situacionFiscal, provincia, ciudad, codigoPostal,
    direccion, telefono
  } = req.body;

  try {
    const collection = await getUsuariosCollection();

    const updatedUsuario = {
      email,
      nombre,
      apellido,
      nombreUsuario,
      contraseña,
      cuil,
      situacionFiscal,
      provincia,
      ciudad,
      codigoPostal,
      direccion,
      telefono
    };

    const result = await collection.updateOne({ _id: parseInt(id) }, { $set: updatedUsuario });

    if (result && result.modifiedCount > 0) {
      res.json(updatedUsuario);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un usuario por su ID
const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const collection = await getUsuariosCollection();
    const result = await collection.deleteOne({ _id: parseInt(id) });

    if (result && result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar todos los usuarios
const deleteAllUsuarios = async (req, res) => {
  try {
    const collection = await getUsuariosCollection();
    await collection.deleteMany();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  deleteAllUsuarios
};
