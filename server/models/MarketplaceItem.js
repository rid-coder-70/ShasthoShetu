const mongoose = require('mongoose');

const marketplaceItemSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    price: { type: Number, required: true }, // Price per unit
    expiryDate: { type: Date },
    description: { type: String },
    status: {
        type: String,
        default: 'Available',
        enum: ['Available', 'Sold']
    }
}, { timestamps: true });

module.exports = mongoose.model('MarketplaceItem', marketplaceItemSchema);
