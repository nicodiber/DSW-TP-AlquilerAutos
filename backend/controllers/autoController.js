const Auto = require("../models/auto");
const Sucursal = require("../models/sucursal");
const { getNextSequenceValue } = require('../config/db');

exports.crearAuto = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('autoId');
    const {
      modeloAuto,
      sucursalAuto,
      historialMantenimiento,
      estadoAuto = 'disponible',
      matriculaAuto
    } = req.body;

    // Verificar que las referencias existen
    const sucursal = await Sucursal.findById(sucursalAuto);
    if (!sucursal) {
      return res.status(404).json({ msg: 'La sucursal no existe' });
    }

    let auto = new Auto({
      _id,
      modeloAuto,
      sucursalAuto,
      historialMantenimiento,
      estadoAuto,
      matriculaAuto
    });

    await auto.save();
    res.json(auto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al crear el auto');
  }
};

exports.obtenerAutos = async (req, res) => {
  try {
    const autos = await Auto.find()
                            .populate('sucursalAuto');
    res.json(autos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener los autos');
  }
};

exports.obtenerAuto = async (req, res) => {
  try {
    const auto = await Auto.findById(req.params.id)
                           .populate('sucursalAuto');

    if (!auto) {
      return res.status(404).json({ msg: 'No existe ese auto' });
    }

    res.json(auto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener el auto');
  }
};

exports.actualizarAuto = async (req, res) => {
  try {
    const {
      modeloAuto,
      sucursalAuto,
      historialMantenimiento,
      estadoAuto,
      matriculaAuto
    } = req.body;

    let auto = await Auto.findById(req.params.id);

    if (!auto) {
      return res.status(404).json({ msg: 'No existe ese auto' });
    }

    // Verificar si se está intentando cambiar la sucursal
    if (sucursalAuto && !(await Sucursal.findById(sucursalAuto))) {
      return res.status(404).json({ msg: 'La sucursal no existe' });
    }

    // Actualizar el auto con los nuevos datos
    auto.modeloAuto = modeloAuto;
    auto.sucursalAuto = sucursalAuto;
    auto.historialMantenimiento = historialMantenimiento;
    auto.estadoAuto = estadoAuto;
    auto.matriculaAuto = matriculaAuto;

    auto = await Auto.findOneAndUpdate({ _id: req.params.id }, auto, { new: true });
    res.json(auto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar el auto');
  }
};

exports.eliminarAuto = async (req, res) => {
  try {
    const auto = await Auto.findById(req.params.id);

    if (!auto) {
      return res.status(404).json({ msg: 'No existe ese auto' });
    }

    await Auto.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Auto eliminado con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar el auto');
  }
};
