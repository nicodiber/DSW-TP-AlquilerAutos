const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, required: true }
});

const Counter = mongoose.model('Counter', counterSchema, 'contadores');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {});
    console.log('BD Conectada');
  } catch (error) {
    console.log(error);
    process.exit(1); // Detenemos la app
  }
};

const getNextSequenceValue = async (sequenceName) => {
  const sequenceDocument = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
};

module.exports = { conectarDB, getNextSequenceValue };