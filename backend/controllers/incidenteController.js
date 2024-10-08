const Incidente = require("../models/incidente");
const { getNextSequenceValue } = require('../config/db');

exports.crearIncidente = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('incidenteId');
    const { alquiler, descripcion, costoIncidente, fechaIncidente } = req.body;

    let incidente = new Incidente({
      _id,
      alquiler,
      descripcion,
      costoIncidente,
      fechaIncidente
    });

    await incidente.save();
    res.json(incidente);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al crear el incidente');
  }
};

exports.obtenerIncidentes = async (req, res) => {
  try {
    const incidentes = await Incidente.find();
    res.json(incidentes);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener los incidentes');
  }
};

exports.actualizarIncidente = async (req, res) => {
  try {
    const { alquiler, descripcion, costoIncidente, fechaIncidente } = req.body;

    let incidente = await Incidente.findById(req.params.id);

    if (!incidente) {
      return res.status(404).json({ msg: 'No existe ese incidente' });
    }

    incidente.alquiler = alquiler;
    incidente.descripcion = descripcion;
    incidente.costoIncidente = costoIncidente;
    incidente.fechaIncidente = fechaIncidente;

    incidente = await Incidente.findOneAndUpdate({ _id: req.params.id }, incidente, { new: true });
    res.json(incidente);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar el incidente');
  }
};

exports.obtenerIncidente = async (req, res) => {
  try {
    const incidente = await Incidente.findById(req.params.id);

    if (!incidente) {
      return res.status(404).json({ msg: 'No existe ese incidente' });
    }

    res.json(incidente);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener el incidente');
  }
};

exports.eliminarIncidente = async (req, res) => {
  try {
    const incidente = await Incidente.findById(req.params.id);

    if (!incidente) {
      return res.status(404).json({ msg: 'No existe ese incidente' });
    }

    await Incidente.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Incidente eliminado con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar el incidente');
  }
};
