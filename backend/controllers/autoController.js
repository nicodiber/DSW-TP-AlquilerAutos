const Auto = require("../models/auto");
const Marca = require("../models/marca");
const Categoria = require("../models/categoria");
const Sucursal = require("../models/sucursal");
const { getNextSequenceValue } = require('../config/db');

exports.crearAuto = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('autoId');
    const {
      modeloAuto,
      marcaAuto,
      categoriaAuto,
      sucursalAuto,
      precioXdia,
      estadoAuto = 'disponible',
      anioAuto,
      matriculaAuto,
      colorAuto,
      dimensiones,
      cantidadAsientos,
      cantidadPuertas,
      motor,
      cajaTransmision,
      tipoCombustible,
      capacidadBaul
    } = req.body;

    // Verificar que las referencias existen
    const marca = await Marca.findById(marcaAuto);
    if (!marca) {
      return res.status(404).json({ msg: 'La marca no existe' });
    }
    const categoria = await Categoria.findById(categoriaAuto);
    if (!categoria) {
      return res.status(404).json({ msg: 'La categoría no existe' });
    }
    const sucursal = await Sucursal.findById(sucursalAuto);
    if (!sucursal) {
      return res.status(404).json({ msg: 'La sucursal no existe' });
    }
    

    let auto = new Auto({
      _id,
      modeloAuto,
      marcaAuto,
      categoriaAuto,
      sucursalAuto,
      precioXdia,
      estadoAuto,
      anioAuto,
      matriculaAuto,
      colorAuto,
      dimensiones,
      cantidadAsientos,
      cantidadPuertas,
      motor,
      cajaTransmision,
      tipoCombustible,
      capacidadBaul
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
                            .populate('marcaAuto')
                            .populate('categoriaAuto')
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
                           .populate('marcaAuto')
                           .populate('categoriaAuto')
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
      marcaAuto,
      categoriaAuto,
      sucursalAuto,
      precioXdia,
      estadoAuto,
      anioAuto,
      matriculaAuto,
      colorAuto,
      dimensiones,
      cantidadAsientos,
      cantidadPuertas,
      motor,
      cajaTransmision,
      tipoCombustible,
      capacidadBaul
    } = req.body;

    let auto = await Auto.findById(req.params.id);

    if (!auto) {
      return res.status(404).json({ msg: 'No existe ese auto' });
    }

    // Verificar si se está intentando cambiar la marca, categoría o sucursal
    if (marcaAuto && !(await Marca.findById(marcaAuto))) {
      return res.status(404).json({ msg: 'La marca no existe' });
    }
    if (categoriaAuto && !(await Categoria.findById(categoriaAuto))) {
      return res.status(404).json({ msg: 'La categoría no existe' });
    }
    if (sucursalAuto && !(await Sucursal.findById(sucursalAuto))) {
      return res.status(404).json({ msg: 'La sucursal no existe' });
    }

    // Actualizar el auto con los nuevos datos
    auto.modeloAuto = modeloAuto;
    auto.marcaAuto = marcaAuto;
    auto.categoriaAuto = categoriaAuto;
    auto.sucursalAuto = sucursalAuto;
    auto.precioXdia = precioXdia;
    auto.estadoAuto = estadoAuto;
    auto.anioAuto = anioAuto;
    auto.matriculaAuto = matriculaAuto;
    auto.colorAuto = colorAuto;
    auto.dimensiones = dimensiones;
    auto.cantidadAsientos = cantidadAsientos;
    auto.cantidadPuertas = cantidadPuertas;
    auto.motor = motor;
    auto.cajaTransmision = cajaTransmision;
    auto.tipoCombustible = tipoCombustible;
    auto.capacidadBaul = capacidadBaul;

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
