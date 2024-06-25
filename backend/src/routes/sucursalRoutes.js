const express = require('express');
const {
  getAllSucursales,
  getSucursalById,
  createSucursal,
  updateSucursal,
  deleteSucursal,
  deleteAllSucursales
} = require('../controllers/sucursalController');

const router = express.Router();

router.get('/', getAllSucursales);
router.get('/:id', getSucursalById);
router.post('/', createSucursal);
router.put('/:id', updateSucursal);
router.delete('/', deleteAllSucursales);
router.delete('/:id', deleteSucursal);

module.exports = router;