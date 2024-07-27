const Tipo = require("../models/tipo");
const { getNextSequenceValue } = require('../config/db');

exports.crearTipo = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('tipoId');
    let tipo = new Tipo({ ...req.body, _id });

    await tipo.save();
    res.send(tipo);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerTipos = async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.json(tipos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.actualizarTipo = async (req, res) => {
  try {
    const { tipoVehiculo, precioTipo } = req.body;
    let tipo = await Tipo.findById(req.params.id);

    if (!tipo) {
      res.status(404).json({ msg: 'No existe ese tipo' });
      return;
    }

    tipo.tipoVehiculo = tipoVehiculo;
    tipo.precioTipo = precioTipo;

    tipo = await Tipo.findOneAndUpdate({ _id: req.params.id }, tipo, { new: true });
    res.json(tipo);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerTipo = async (req, res) => {
  try {
    let tipo = await Tipo.findById(req.params.id);

    if (!tipo) {
      res.status(404).json({ msg: 'No existe ese tipo' });
      return;
    }

    res.json(tipo);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.eliminarTipo = async (req, res) => {
  try {
    let tipo = await Tipo.findById(req.params.id);

    if (!tipo) {
      res.status(404).json({ msg: 'No existe ese tipo' });
      return;
    }

    await Tipo.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Tipo eliminado con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};
