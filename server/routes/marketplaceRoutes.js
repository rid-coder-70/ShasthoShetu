const express = require('express');
const { getMarketplaceItems, addMarketplaceItem } = require('../controllers/marketplaceController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getMarketplaceItems)
    .post(protect, addMarketplaceItem);

module.exports = router;
