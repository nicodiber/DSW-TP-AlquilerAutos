/*
const Conductor = require('../models/conductorModel');

let conductores = [];
let nextId = 1;

const getAllConductores = (req, res) => {
  res.json(conductores);
};

const getConductorById = (req, res) => {
  const { id } = req.params;
  const conductor = conductores.find(s => s.idConductor === parseInt(id));
  if (conductor) {
    res.json(conductor);
  } else {
    res.status(404).send('Conductor no encontrado');
  }
};

const createConductor = (req, res) => {
  const newConductor = new Conductor(nextId++, req.body.dniPasaporte, req.body.apellidoConductor, req.body.nombreConductor, req.body.fechaNacimientoConductor, req.body.licenciaConductor, req.body.fechaOtorgamientoLicencia, req.body.nroTelefonoConductor, req.body.mailConductor);
  conductores.push(newConductor);
  res.status(201).json(newConductor);
};

const updateConductor = (req, res) => {
  const { id } = req.params;
  const conductor = conductores.find(s => s.idConductor === parseInt(id));
  if (conductor) {
    conductor.dniPasaporte = req.body.dniPasaporte;
    conductor.apellidoConductor = req.body.apellidoConductor;
    conductor.nombreConductor = req.body.nombreConductor;
    conductor.fechaNacimientoConductor = req.body.fechaNacimientoConductor;
    conductor.licenciaConductor = req.body.licenciaConductor;
    conductor.fechaOtorgamientoLicencia = req.body.fechaOtorgamientoLicencia;
    conductor.nroTelefonoConductor = req.body.nroTelefonoConductor;
    conductor.mailConductor = req.body.mailConductor;
    res.json(conductor);
  } else {
    res.status(404).send('Conductor no encontrado');
  }
};

const deleteConductor = (req, res) => {
  const { id } = req.params;
  const index = conductores.findIndex(s => s.idConductor === parseInt(id));
  if (index !== -1) {
    conductores.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Conductor no encontrado');
  }
};

const deleteAllConductores = (req, res) => {
  conductores = []; 
  res.status(204).send();
};

module.exports = {
  getAllConductores,
  getConductorById,
  createConductor,
  updateConductor,
  deleteConductor,
  deleteAllConductores
};
*/

/* --------------------- */
/* ---- 2DA ENTREGA ---- */
/* --------------------- */

const { connectDB, getNextSequenceValue } = require('../database');

// Función para obtener la colección de conductores desde la base de datos
async function getConductoresCollection() {
  const db = await connectDB();
  return db.collection('conductores');
}

// Obtener todos los conductores
const getAllConductores = async (req, res) => {
  try {
    const collection = await getConductoresCollection();
    const conductores = await collection.find().toArray();
    res.json(conductores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un conductor por su ID
const getConductorById = async (req, res) => {
  const { id } = req.params;
  try {
    const collection = await getConductoresCollection();
    const conductor = await collection.findOne({ _id: parseInt(id) });
    if (conductor) {
      res.json(conductor);
    } else {
      res.status(404).send('Conductor no encontrado');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo conductor
const createConductor = async (req, res) => {
  const { dniPasaporte, apellidoConductor, nombreConductor, fechaNacimientoConductor, licenciaConductor, fechaOtorgamientoLicencia, nroTelefonoConductor, mailConductor } = req.body;

  try {
    const collection = await getConductoresCollection();

    // Obtener el próximo valor de la secuencia para el _id del conductor
    const conductorId = await getNextSequenceValue('conductorId');

    const nuevoConductor = {
      _id: conductorId,
      dniPasaporte,
      apellidoConductor,
      nombreConductor,
      fechaNacimientoConductor,
      licenciaConductor,
      fechaOtorgamientoLicencia,
      nroTelefonoConductor,
      mailConductor
    };

    const result = await collection.insertOne(nuevoConductor);

    if (result && result.insertedId) {
      res.status(201).json({ _id: result.insertedId, ...nuevoConductor });
    } else {
      throw new Error('No se pudo crear el conductor');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un conductor por su ID
const updateConductor = async (req, res) => {
  const { id } = req.params;
  const { dniPasaporte, apellidoConductor, nombreConductor, fechaNacimientoConductor, licenciaConductor, fechaOtorgamientoLicencia, nroTelefonoConductor, mailConductor } = req.body;

  try {
    const collection = await getConductoresCollection();

    const updatedConductor = {
      dniPasaporte,
      apellidoConductor,
      nombreConductor,
      fechaNacimientoConductor,
      licenciaConductor,
      fechaOtorgamientoLicencia,
      nroTelefonoConductor,
      mailConductor
    };

    const result = await collection.updateOne({ _id: parseInt(id) }, { $set: updatedConductor });

    if (result && result.modifiedCount > 0) {
      res.json(updatedConductor);
    } else {
      res.status(404).send('Conductor no encontrado');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un conductor por su ID
const deleteConductor = async (req, res) => {
  const { id } = req.params;

  try {
    const collection = await getConductoresCollection();
    const result = await collection.deleteOne({ _id: parseInt(id) });

    if (result && result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('Conductor no encontrado');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar todos los conductores
const deleteAllConductores = async (req, res) => {
  try {
    const collection = await getConductoresCollection();
    await collection.deleteMany();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllConductores,
  getConductorById,
  createConductor,
  updateConductor,
  deleteConductor,
  deleteAllConductores
};
