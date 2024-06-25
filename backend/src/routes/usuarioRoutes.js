const express = require('express');
const {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  deleteAllUsuarios
} = require('../controllers/usuarioController');

const router = express.Router();

router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/', deleteAllUsuarios);
router.delete('/:id', deleteUsuario);

module.exports = router;