const Sucursal = require("../models/sucursal");
const { getNextSequenceValue } = require('../config/db');

// Crear una nueva sucursal
exports.crearSucursal = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('sucursalId'); 
    const { nombreSucursal, telefonoSucursal, direccionSucursal, paisSucursal, provinciaSucursal, ciudadSucursal, horaAperturaSucursal, horaCierreSucursal, trabajadores, autos } = req.body;

    let sucursal = new Sucursal({
      _id,
      nombreSucursal,
      telefonoSucursal,
      direccionSucursal,
      paisSucursal,
      provinciaSucursal,
      ciudadSucursal,
      horaAperturaSucursal,
      horaCierreSucursal,
      trabajadores,
      autos
    });

    await sucursal.save();
    res.json(sucursal);
  } catch (error) {
    console.log(error);

    // Manejo de error de duplicación en campo único en MongoDB
    if (error.code === 11000 && error.keyValue) {
      // Detectar el campo duplicado específico
      const field = Object.keys(error.keyValue)[0];
      const errorMsg = field === 'nombreSucursal'
        ? 'El nombre de la sucursal ya está en uso. Elige un nombre diferente.'
        : 'Valor duplicado en un campo único.';

      return res.status(409).json({ msg: errorMsg });
    } else {
      res.status(500).send('Hubo un error al crear la sucursal');
    }
  }
};

// Obtener todas las sucursales
exports.obtenerSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find();
    res.json(sucursales);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener las sucursales');
  }
};

// Actualizar una sucursal
exports.actualizarSucursal = async (req, res) => {
  try {
    const { nombreSucursal, telefonoSucursal, direccionSucursal, paisSucursal, provinciaSucursal, ciudadSucursal, horaAperturaSucursal, horaCierreSucursal, trabajadores, autos } = req.body;

    let sucursal = await Sucursal.findById(req.params.id);

    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

    // Actualizar los campos
    sucursal.nombreSucursal = nombreSucursal;
    sucursal.telefonoSucursal = telefonoSucursal;
    sucursal.direccionSucursal = direccionSucursal;
    sucursal.paisSucursal = paisSucursal;
    sucursal.provinciaSucursal = provinciaSucursal;
    sucursal.ciudadSucursal = ciudadSucursal;
    sucursal.horaAperturaSucursal = horaAperturaSucursal;
    sucursal.horaCierreSucursal = horaCierreSucursal;
    sucursal.trabajadores = trabajadores;
    sucursal.autos = autos;

    sucursal = await Sucursal.findOneAndUpdate({ _id: req.params.id }, sucursal, { new: true });
    res.json(sucursal);
  } catch (error) {
    console.log(error);

    if (error.code === 11000 && error.keyValue) {
      // Detectar el campo dublicado específico
      const field = Object.keys(error.keyValue)[0];
      const errorMsg = field === 'nombreSucursal'
        ? 'El nombre de la sucursal ya está en uso. Por favor, elige un nombre diferente.'
        : 'Valor duplicado en un campo único.';

      return res.status(409).json({ msg: errorMsg });
    } else {
      res.status(500).send('Hubo un error al actualizar la sucursal');
    }
  }
};

// Obtener una sucursal por ID
exports.obtenerSucursal = async (req, res) => {
  try {
    const sucursal = await Sucursal.findById(req.params.id);

    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

    res.json(sucursal);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener la sucursal');
  }
};

// Eliminar una sucursal
exports.eliminarSucursal = async (req, res) => {
  try {
    const sucursal = await Sucursal.findById(req.params.id);

    if (!sucursal) {
      return res.status(404).json({ msg: 'No existe esa sucursal' });
    }

    await Sucursal.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Sucursal eliminada con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar la sucursal');
  }

// Asignar trabajadores a una sucursal
exports.asignarTrabajadores = async (req, res) => {
  try {
    const { idSucursal } = req.params; 
    const { trabajadores } = req.body; // Array de IDs de trabajadores a asignar

    // Buscar la sucursal y actualizar la lista de trabajadores
    const sucursal = await Sucursal.findByIdAndUpdate(
      idSucursal, 
      { trabajadores }, // Asigna los IDs de trabajadores
      { new: true } // Retorna la sucursal actualizada
    );

    if (!sucursal) {
      return res.status(404).json({ msg: 'Sucursal no encontrada' });
    }

    res.json({ msg: 'Trabajadores asignados correctamente', sucursal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al asignar trabajadores a la sucursal' });
  }
};

};