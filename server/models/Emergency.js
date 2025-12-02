const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        required: true,
        enum: ['Medicine Shortage', 'Equipment Failure', 'Blood Requirement', 'Other']
    },
    description: { type: String, required: true },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'Resolved']
    },
    location: {
        lat: Number,
        lng: Number,
        address: String
    },
    contactNumber: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Emergency', emergencySchema);
