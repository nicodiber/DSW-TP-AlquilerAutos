const express = require('express');
const {
  getAllTipos,
  getTipoById,
  createTipo,
  updateTipo,
  deleteTipo,
  deleteAllTipos
} = require('../controllers/tipoController');

const router = express.Router();

router.get('/', getAllTipos);
router.get('/:id', getTipoById);
router.post('/', createTipo);
router.put('/:id', updateTipo);
router.delete('/', deleteAllTipos);
router.delete('/:id', deleteTipo);

module.exports = router;