const Inventory = require('../models/Inventory');

exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find({ user: req.user.id });
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addInventoryItem = async (req, res) => {
    const { name, genericName, category, quantity, unit, expiryDate, batchNumber, supplier, threshold } = req.body;

    try {
        const item = await Inventory.create({
            user: req.user.id,
            name,
            genericName,
            category,
            quantity,
            unit,
            expiryDate,
            batchNumber,
            supplier,
            threshold
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateInventoryItem = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteInventoryItem = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
