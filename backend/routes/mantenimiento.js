const express = require('express');
const router = express.Router();
const imantenimientoController = require('../controllers/mantenimientoController');

router.post('/', imantenimientoController.crearMantenimiento);
router.get('/', imantenimientoController.obtenerMantenimientos);
router.get('/:id', imantenimientoController.obtenerMantenimiento);
router.put('/:id', imantenimientoController.actualizarMantenimiento);
router.delete('/:id', imantenimientoController.eliminarMantenimiento);

// Endpoint para devolver los mantenimientos con los datos relacionados de los autos y trabajadores
router.get('/', async (req, res) => {
    try {
        const mantenimientos = await Mantenimiento.find()
            .populate('auto', 'matricula') // Trae la matrícula del auto
            .populate('trabajadorACargo', 'nombre apellido'); // Trae el nombre y apellido del trabajador

        res.json(mantenimientos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los mantenimientos' });
    }
});

module.exports = router;
