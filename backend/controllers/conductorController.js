const Conductor = require("../models/conductor");
const { getNextSequenceValue } = require('../config/db');

exports.crearConductor = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('conductorId');
    let conductor = new Conductor({ ...req.body, _id });

    await conductor.save();
    res.send(conductor);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerConductores = async (req, res) => {
  try {
    const conductores = await Conductor.find();
    res.json(conductores);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.actualizarConductor = async (req, res) => {
  try {
    const { dniPasaporte, apellidoConductor, nombreConductor, fechaNacimientoConductor, licenciaConductor, fechaOtorgamientoLicencia, nroTelefonoConductor, mailConductor } = req.body;
    let conductor = await Conductor.findById(req.params.id);

    if (!conductor) {
      res.status(404).json({ msg: 'No existe ese conductor' });
      return;
    }

    conductor.dniPasaporte = dniPasaporte;
    conductor.apellidoConductor = apellidoConductor;
    conductor.nombreConductor = nombreConductor;
    conductor.fechaNacimientoConductor = fechaNacimientoConductor;
    conductor.licenciaConductor = licenciaConductor;
    conductor.fechaOtorgamientoLicencia = fechaOtorgamientoLicencia;
    conductor.nroTelefonoConductor = nroTelefonoConductor;
    conductor.mailConductor = mailConductor;

    conductor = await Conductor.findOneAndUpdate({ _id: req.params.id }, conductor, { new: true });
    res.json(conductor);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerConductor = async (req, res) => {
  try {
    let conductor = await Conductor.findById(req.params.id);

    if (!conductor) {
      res.status(404).json({ msg: 'No existe ese conductor' });
      return;
    }

    res.json(conductor);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.eliminarConductor = async (req, res) => {
  try {
    let conductor = await Conductor.findById(req.params.id);

    if (!conductor) {
      res.status(404).json({ msg: 'No existe ese conductor' });
      return;
    }

    await Conductor.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Conductor eliminado con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};
