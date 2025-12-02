const Emergency = require('../models/Emergency');

exports.getEmergencies = async (req, res) => {
    try {
        // In a real app, we might filter by location or show all active emergencies
        const emergencies = await Emergency.find({ status: 'Active' }).populate('user', 'name organizationName');
        res.json(emergencies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEmergency = async (req, res) => {
    const { type, description, location, contactNumber } = req.body;

    try {
        const emergency = await Emergency.create({
            user: req.user.id,
            type,
            description,
            location,
            contactNumber
        });
        res.status(201).json(emergency);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resolveEmergency = async (req, res) => {
    try {
        const emergency = await Emergency.findById(req.params.id);

        if (!emergency) {
            return res.status(404).json({ message: 'Emergency not found' });
        }

        if (emergency.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        emergency.status = 'Resolved';
        await emergency.save();
        res.json(emergency);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
