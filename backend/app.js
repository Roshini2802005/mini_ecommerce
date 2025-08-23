const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');

// Load environment variables for local development
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Routes
const products = require('./routes/product');
const orders = require('./routes/order');

// Connect to MongoDB
connectDatabase();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/v1/', products);
app.use('/api/v1/', orders);

// Start server
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} in ${NODE_ENV}`);
});
