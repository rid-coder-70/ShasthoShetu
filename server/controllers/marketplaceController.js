const MarketplaceItem = require('../models/MarketplaceItem');

exports.getMarketplaceItems = async (req, res) => {
    try {
        const items = await MarketplaceItem.find({ status: 'Available' }).populate('seller', 'name organizationName location');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addMarketplaceItem = async (req, res) => {
    const { name, quantity, unit, price, expiryDate, description } = req.body;

    try {
        const item = await MarketplaceItem.create({
            seller: req.user.id,
            name,
            quantity,
            unit,
            price,
            expiryDate,
            description
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
