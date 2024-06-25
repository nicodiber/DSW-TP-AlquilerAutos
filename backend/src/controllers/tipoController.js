const { connectDB, getNextSequenceValue } = require('../database');

// Función para obtener la colección de tipos desde la base de datos
async function getTiposCollection() {
  const db = await connectDB();
  return db.collection('tipos');
}

// Obtener todos los tipos de vehículo
const getAllTipos = async (req, res) => {
  try {
    const collection = await getTiposCollection();
    const tipos = await collection.find().toArray();
    res.json(tipos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un tipo de vehículo por su ID
const getTipoById = async (req, res) => {
  const { id } = req.params;
  try {
    const collection = await getTiposCollection();
    const tipo = await collection.findOne({ _id: parseInt(id) });
    if (tipo) {
      res.json(tipo);
    } else {
      res.status(404).send('Tipo de vehículo no encontrado');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo tipo de vehículo
const createTipo = async (req, res) => {
  const { tipoVehiculo, precioTipo } = req.body;

  try {
    const collection = await getTiposCollection();

    // Obtener el próximo valor de la secuencia para el _id del tipo
    const tipoId = await getNextSequenceValue('tipoId');

    const nuevoTipo = {
      _id: tipoId,
      tipoVehiculo,
      precioTipo
    };

    const result = await collection.insertOne(nuevoTipo);

    if (result && result.insertedId) {
      res.status(201).json({ _id: result.insertedId, ...nuevoTipo });
    } else {
      throw new Error('No se pudo crear el Tipo de vehículo');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un tipo de vehículo por su ID
const updateTipo = async (req, res) => {
  const { id } = req.params;
  const { tipoVehiculo, precioTipo } = req.body;

  try {
    const collection = await getTiposCollection();

    const updatedTipo = {
      tipoVehiculo,
      precioTipo
    };

    const result = await collection.updateOne({ _id: parseInt(id) }, { $set: updatedTipo });

    if (result && result.modifiedCount > 0) {
      res.json(updatedTipo);
    } else {
      res.status(404).send('Tipo de vehículo no encontrado');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un tipo de vehículo por su ID
const deleteTipo = async (req, res) => {
  const { id } = req.params;

  try {
    const collection = await getTiposCollection();
    const result = await collection.deleteOne({ _id: parseInt(id) });

    if (result && result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('Tipo de vehículo no encontrado');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar todos los tipos de vehículo
const deleteAllTipos = async (req, res) => {
  try {
    const collection = await getTiposCollection();
    await collection.deleteMany();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTipos,
  getTipoById,
  createTipo,
  updateTipo,
  deleteTipo,
  deleteAllTipos
};