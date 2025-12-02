const Inventory = require('../models/Inventory');

exports.getShortagePredictions = async (req, res) => {
    try {
        // Basic logic: Find items where quantity is below threshold
        // In a real system, this would use historical data and ML models
        const shortages = await Inventory.find({
            user: req.user.id,
            $expr: { $lt: ["$quantity", "$threshold"] }
        });

        const predictions = shortages.map(item => ({
            item: item.name,
            currentStock: item.quantity,
            threshold: item.threshold,
            predictedStockout: 'Immediate', // Placeholder
            recommendation: 'Restock immediately'
        }));

        res.json(predictions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
