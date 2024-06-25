const express = require('express');
const {
  getAllConductores,
  getConductorById,
  createConductor,
  updateConductor,
  deleteConductor,
  deleteAllConductores
} = require('../controllers/conductorController');

const router = express.Router();

router.get('/', getAllConductores);
router.get('/:id', getConductorById);
router.post('/', createConductor);
router.put('/:id', updateConductor);
router.delete('/', deleteAllConductores);
router.delete('/:id', deleteConductor);

module.exports = router;