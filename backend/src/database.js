const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://admin:3d2UdEE70VvIUXfD@tp-dsw-mongodb-cluster.s4bdjst.mongodb.net'; // URL de conexión a MongoDB
const dbName = 'TP_DSW_Alquiler_Auto';

let db;

// Función para conectar a la base de datos
async function connectDB() {
  if (!db) {
    const client = await MongoClient.connect(url);
    db = client.db(dbName);
  }
  return db;
}

// Función para obtener el siguiente valor de la secuencia
async function getNextSequenceValue(sequenceName) {
  const db = await connectDB();

  try {
    const filter = { _id: sequenceName };
    const update = { $inc: { sequence_value: 1 } };
    const options = {
      returnDocument: 'after', // Devolver el documento después de actualizarlo
      upsert: true // Crear el documento si no existe
    };

    const sequenceDocument = await db.collection('contadores').findOneAndUpdate(filter, update, options);

    if (!sequenceDocument || sequenceDocument.sequence_value === undefined) {
      throw new Error(`No se pudo obtener el siguiente valor para la secuencia ${sequenceName}`);
    }

    const sequenceValue = sequenceDocument.sequence_value;
    return sequenceValue;

  } catch (error) {
    console.error('Error en getNextSequenceValue:', error);
    throw error;
  }
}


module.exports = {
  connectDB,
  getNextSequenceValue
};