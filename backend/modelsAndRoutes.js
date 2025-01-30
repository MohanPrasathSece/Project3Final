// /backend/modelsAndRoutes.js
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB Config
const mongoURI = 'mongodb+srv://mohanprasath:0110@cluster0.4gcqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Models
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }
});
const Product = mongoose.model('Product', ProductSchema);

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true }
});
const Supplier = mongoose.model('Supplier', SupplierSchema);

// Product Routes
router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().populate('supplierId', 'name');
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/api/products/add', async (req, res) => {
  const { name, category, price, quantity, supplierId } = req.body;
  const product = new Product({ name, category, price, quantity, supplierId });

  try {
    const newProduct = await product.save();
    res.json({ product: newProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/api/products/update/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { quantity } },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supplier Routes
router.get('/api/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/api/suppliers/add', async (req, res) => {
  const { name, contact } = req.body;
  const supplier = new Supplier({ name, contact });

  try {
    const newSupplier = await supplier.save();
    res.json({ supplier: newSupplier });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = { mongoURI, router };
