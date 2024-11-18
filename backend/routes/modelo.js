const express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modeloController');
const multer = require('multer');
const path = require('path');

// Configuración de `multer`
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../assets/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
}).fields([
    { name: 'images', maxCount: 4 },
    { name: 'nombreModelo', maxCount: 1 },
    { name: 'categoriaModelo', maxCount: 1 },
    { name: 'marcaModelo', maxCount: 1 },
    { name: 'precioXdia', maxCount: 1 },
    { name: 'anio', maxCount: 1 },
    { name: 'color', maxCount: 1 },
    { name: 'dimensiones', maxCount: 1 },
    { name: 'cantidadAsientos', maxCount: 1 },
    { name: 'cantidadPuertas', maxCount: 1 },
    { name: 'motor', maxCount: 1 },
    { name: 'cajaTransmision', maxCount: 1 },
    { name: 'tipoCombustible', maxCount: 1 },
    { name: 'capacidadTanqueCombustible', maxCount: 1 },
    { name: 'capacidadBaul', maxCount: 1 }
]);

// Asegúrate de que esta ruta esté configurada correctamente
router.post('/', upload, modeloController.crearModeloConImagenes);
router.get('/', modeloController.obtenerModelos);
router.get('/:id', modeloController.obtenerModelo);
router.put('/:id', upload, modeloController.actualizarModelo); ///porq con el otro no anda xd

//router.put('/:id', modeloController.actualizarModelo);
router.delete('/:id', modeloController.eliminarModelo);

router.post('/buscarAutoAleatorioDisponible', modeloController.buscarAutoAleatorioDisponible);
router.get('/:idModelo/existe-autos', modeloController.verificarAutosPorModelo);

module.exports = router;
