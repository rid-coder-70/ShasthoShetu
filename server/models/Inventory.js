const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    genericName: { type: String },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    expiryDate: { type: Date },
    batchNumber: { type: String },
    supplier: { type: String },
    threshold: { type: Number, default: 10 } // Low stock threshold
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
