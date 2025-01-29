// /backend/routes/products.js
const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('supplierId', 'name');
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add new product
router.post('/add', async (req, res) => {
  const { name, category, price, quantity, supplierId } = req.body;
  const product = new Product({ name, category, price, quantity, supplierId });

  try {
    const newProduct = await product.save();
    res.json({ product: newProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update stock quantity
router.put('/update/:id', async (req, res) => {
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

module.exports = router;
