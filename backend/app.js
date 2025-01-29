// /backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const supplierRoutes = require('./routes/suppliers');
const config = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);

// Connect to MongoDB Atlas
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('MongoDB connection error:', err));

module.exports = app;
