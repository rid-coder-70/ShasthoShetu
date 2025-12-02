const express = require('express');
const { getShortagePredictions } = require('../controllers/predictionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getShortagePredictions);

module.exports = router;
