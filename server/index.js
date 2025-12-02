const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/emergency', require('./routes/emergencyRoutes'));
app.use('/api/marketplace', require('./routes/marketplaceRoutes'));
app.use('/api/predictions', require('./routes/predictionRoutes'));

app.get('/', (req, res) => {
    res.send('ShasthoShetu Backend is running');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
