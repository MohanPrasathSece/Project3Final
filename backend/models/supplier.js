// /backend/models/supplier.js
const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Supplier', SupplierSchema);
