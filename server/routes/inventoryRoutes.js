const express = require('express');
const { getInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getInventory)
    .post(protect, addInventoryItem);

router.route('/:id')
    .put(protect, updateInventoryItem)
    .delete(protect, deleteInventoryItem);

module.exports = router;
