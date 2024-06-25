/*
const Sucursal = require('../models/sucursalModel');

let sucursales = [];
let nextId = 1;

const getAllSucursales = (req, res) => {
  res.json(sucursales);
};

const getSucursalById = (req, res) => {
  const { id } = req.params;
  const sucursal = sucursales.find(s => s.idSucursal === parseInt(id));
  if (sucursal) {
    res.json(sucursal);
  } else {
    res.status(404).send('Sucursal no encontrada');
  }
};

const createSucursal = (req, res) => {
  const newSucursal = new Sucursal(nextId++, req.body.denominacionSucursal, req.body.nroTelefonoSucursal, req.body.provinciaSucursal, req.body.ciudadSucursal, req.body.direccionSucursal, req.body.horarioAperturaSucursal, req.body.horarioCierreSucursal);
  sucursales.push(newSucursal);
  res.status(201).json(newSucursal);
};

const updateSucursal = (req, res) => {
  const { id } = req.params;
  const sucursal = sucursales.find(s => s.idSucursal === parseInt(id));
  if (sucursal) {
    sucursal.denominacionSucursal = req.body.denominacionSucursal;
    sucursal.nroTelefonoSucursal = req.body.nroTelefonoSucursal;
    sucursal.provinciaSucursal = req.body.provinciaSucursal;
    sucursal.ciudadSucursal = req.body.ciudadSucursal;
    sucursal.direccionSucursal = req.body.direccionSucursal;
    sucursal.horarioAperturaSucursal = req.body.horarioAperturaSucursal;
    sucursal.horarioCierreSucursal = req.body.horarioCierreSucursal;
    res.json(sucursal);
  } else {
    res.status(404).send('Sucursal no encontrada');
  }
};

const deleteSucursal = (req, res) => {
  const { id } = req.params;
  const index = sucursales.findIndex(s => s.idSucursal === parseInt(id));
  if (index !== -1) {
    sucursales.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Sucursal no encontrada');
  }
};

const deleteAllSucursales = (req, res) => {
  sucursales = [];
  res.status(204).send();
};

module.exports = {
  getAllSucursales,
  getSucursalById,
  createSucursal,
  updateSucursal,
  deleteSucursal,
  deleteAllSucursales
};
*/

/*
const Sucursal = require('../models/sucursalModel');

const getAllSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find();
    res.json(sucursales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSucursalById = async (req, res) => {
  try {
    const sucursal = await Sucursal.findById(req.params.id);
    if (!sucursal) {
      return res.status(404).send('Sucursal no encontrada');
    }
    res.json(sucursal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSucursal = async (req, res) => {
  const { denominacionSucursal, nroTelefonoSucursal, provinciaSucursal, ciudadSucursal, direccionSucursal, horarioAperturaSucursal, horarioCierreSucursal } = req.body;

  const newSucursal = new Sucursal({
    denominacionSucursal,
    nroTelefonoSucursal,
    provinciaSucursal,
    ciudadSucursal,
    direccionSucursal,
    horarioAperturaSucursal,
    horarioCierreSucursal
  });

  try {
    const savedSucursal = await newSucursal.save();
    res.status(201).json(savedSucursal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateSucursal = async (req, res) => {
  try {
    const updatedSucursal = await Sucursal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSucursal) {
      return res.status(404).send('Sucursal no encontrada');
    }
    res.json(updatedSucursal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSucursal = async (req, res) => {
  try {
    const deletedSucursal = await Sucursal.findByIdAndDelete(req.params.id);
    if (!deletedSucursal) {
      return res.status(404).send('Sucursal no encontrada');
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAllSucursales = async (req, res) => {
  try {
    await Sucursal.deleteMany();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllSucursales,
  getSucursalById,
  createSucursal,
  updateSucursal,
  deleteSucursal,
  deleteAllSucursales
};
*/

/* --------------------- */
/* ---- 2DA ENTREGA ---- */
/* --------------------- */

const { connectDB, getNextSequenceValue } = require('../database');

// Función para obtener la colección de sucursales desde la base de datos
async function getSucursalesCollection() {
  const db = await connectDB();
  return db.collection('sucursales');
}

// Obtener todas las sucursales
const getAllSucursales = async (req, res) => {
  try {
    const collection = await getSucursalesCollection();
    const sucursales = await collection.find().toArray();
    res.json(sucursales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener una sucursal por su ID
const getSucursalById = async (req, res) => {
  const { id } = req.params;
  try {
    const collection = await getSucursalesCollection();
    const sucursal = await collection.findOne({ _id: parseInt(id) });
    if (sucursal) {
      res.json(sucursal);
    } else {
      res.status(404).send('Sucursal no encontrada');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear una nueva sucursal
const createSucursal = async (req, res) => {
  const { denominacionSucursal, nroTelefonoSucursal, provinciaSucursal, ciudadSucursal, direccionSucursal, horarioAperturaSucursal, horarioCierreSucursal } = req.body;

  try {
    const collection = await getSucursalesCollection();

    // Obtener el próximo valor de la secuencia para el _id de la sucursal
    const sucursalId = await getNextSequenceValue('sucursalId');

    const nuevaSucursal = {
      _id: sucursalId,
      denominacionSucursal,
      nroTelefonoSucursal,
      provinciaSucursal,
      ciudadSucursal,
      direccionSucursal,
      horarioAperturaSucursal,
      horarioCierreSucursal
    };

    const result = await collection.insertOne(nuevaSucursal);

    if (result && result.insertedId) {
      res.status(201).json({ _id: result.insertedId, ...nuevaSucursal });
    } else {
      throw new Error('No se pudo crear la sucursal');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar una sucursal por su ID
const updateSucursal = async (req, res) => {
  const { id } = req.params;
  const { denominacionSucursal, nroTelefonoSucursal, provinciaSucursal, ciudadSucursal, direccionSucursal, horarioAperturaSucursal, horarioCierreSucursal } = req.body;

  try {
    const collection = await getSucursalesCollection();

    const updatedSucursal = {
      denominacionSucursal,
      nroTelefonoSucursal,
      provinciaSucursal,
      ciudadSucursal,
      direccionSucursal,
      horarioAperturaSucursal,
      horarioCierreSucursal
    };

    const result = await collection.updateOne({ _id: parseInt(id) }, { $set: updatedSucursal });

    if (result && result.modifiedCount > 0) {
      res.json(updatedSucursal);
    } else {
      res.status(404).send('Sucursal no encontrada');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una sucursal por su ID
const deleteSucursal = async (req, res) => {
  const { id } = req.params;

  try {
    const collection = await getSucursalesCollection();
    const result = await collection.deleteOne({ _id: parseInt(id) });

    if (result && result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('Sucursal no encontrada');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar todas las sucursales
const deleteAllSucursales = async (req, res) => {
  try {
    const collection = await getSucursalesCollection();
    await collection.deleteMany();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllSucursales,
  getSucursalById,
  createSucursal,
  updateSucursal,
  deleteSucursal,
  deleteAllSucursales
};
