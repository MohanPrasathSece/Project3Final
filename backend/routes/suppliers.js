// /backend/routes/suppliers.js
const express = require('express');
const Supplier = require('../models/supplier');
const router = express.Router();

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add new supplier
router.post('/add', async (req, res) => {
  const { name, contact } = req.body;
  const supplier = new Supplier({ name, contact });

  try {
    const newSupplier = await supplier.save();
    res.json({ supplier: newSupplier });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
