const express = require('express');
const { getEmergencies, createEmergency, resolveEmergency } = require('../controllers/emergencyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getEmergencies)
    .post(protect, createEmergency);

router.route('/:id/resolve')
    .put(protect, resolveEmergency);

module.exports = router;
