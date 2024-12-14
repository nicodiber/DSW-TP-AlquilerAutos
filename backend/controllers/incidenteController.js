const Incidente = require("../models/incidente");
const { getNextSequenceValue } = require('../config/db');
const { Alquiler } = require('../models/alquiler'); // Modelo de Alquiler

exports.crearIncidente = async (req, res) => {
  try {
    const _id = await getNextSequenceValue('incidenteId');
    const { idAlquiler, descripcion, costoIncidente, fechaIncidente, estadoIncidente } = req.body;

    let incidente = new Incidente({
      _id,
      idAlquiler,
      descripcion,
      costoIncidente,
      fechaIncidente,
      estadoIncidente : 'impago',
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
    const incidentes = await Incidente.find()
      .populate({
        path: 'idAlquiler',
        populate: [
          {
            path: 'usuario',
            model: 'Usuario',
            select: 'email' 
          },
          {
            path: 'auto',
            model: 'Auto',
            populate: {
              path: 'modeloAuto',
              model: 'Modelo',
              select: 'nombreModelo' 
            }
          },
        ]
      });

    res.json(incidentes);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener los incidentes');
  }
};



exports.actualizarIncidente = async (req, res) => {
  try {
    const { idAlquiler, descripcion, costoIncidente, fechaIncidente, estadoIncidente } = req.body;

    let incidente = await Incidente.findById(req.params.id);

    if (!incidente) {
      return res.status(404).json({ msg: 'No existe ese incidente' });
    }

    incidente.idAlquiler = idAlquiler;
    incidente.descripcion = descripcion;
    incidente.costoIncidente = costoIncidente;
    incidente.fechaIncidente = fechaIncidente;
    incidente.estadoIncidente = estadoIncidente;

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

exports.obtenerIncidentesPorUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const alquileres = await Alquiler.find({ usuario: id }, '_id'); 
        if (!alquileres.length) {
            return res.status(404).json({ mensaje: 'No se encontraron alquileres para este usuario.' });
        }
        const alquilerIds = alquileres.map(alquiler => alquiler._id);

        const incidentes = await Incidente.find({ idAlquiler: { $in: alquilerIds } })
            .populate({
                path: 'idAlquiler',
                populate: [
                    {
                        path: 'auto',
                        select: 'modeloAuto',
                        populate: {
                            path: 'modeloAuto',
                            select: 'nombreModelo'
                        }
                    }
                ]
            });

        if (!incidentes.length) {
            return res.status(404).json({ mensaje: 'No se encontraron incidentes para los alquileres del usuario.' });
        }

        res.status(200).json(incidentes);
    } catch (error) {
        console.error('Error al obtener incidentes por usuario:', error);
        res.status(500).json({ mensaje: 'Error del servidor.', error });
    }
};

exports.pagarIncidente = async (req, res) => {
    const { id } = req.params;

    try {
        const incidenteActualizado = await Incidente.findByIdAndUpdate(
            id,
            {
                estadoIncidente: 'pagado',
                fechaPago: new Date() 
            },
            { new: true } 
        );
        if (!incidenteActualizado) {
            return res.status(404).json({ message: 'Incidente no encontrado' });
        }
        return res.status(200).json({ message: 'Incidente pagado con éxito', incidente: incidenteActualizado });
    } catch (error) {
        console.error('Error al pagar el incidente:', error);
        return res.status(500).json({ message: 'Error al pagar el incidente' });
    }
};