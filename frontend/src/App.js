// /frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [supplierContact, setSupplierContact] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.log('Error fetching products:', error));

    axios.get('http://localhost:5000/api/suppliers')
      .then(response => setSuppliers(response.data))
      .catch(error => console.log('Error fetching suppliers:', error));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/products/add', { name, category, price, quantity, supplierId })
      .then(response => {
        setProducts([...products, response.data.product]);
        setName('');
        setCategory('');
        setPrice('');
        setQuantity('');
        setSupplierId('');
      })
      .catch(error => console.log('Error adding product:', error));
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/suppliers/add', { name: supplierName, contact: supplierContact })
      .then(response => {
        setSuppliers([...suppliers, response.data.supplier]);
        setSupplierName('');
        setSupplierContact('');
      })
      .catch(error => console.log('Error adding supplier:', error));
  };

  const handleUpdateStock = (productId, quantity) => {
    axios.put(`http://localhost:5000/api/products/update/${productId}`, { quantity })
      .then(response => {
        const updatedProduct = response.data;
        setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
      })
      .catch(error => console.log('Error updating stock:', error));
  };

  return (
    <div className="App">
      <h1>Stock Management</h1>

      <form onSubmit={handleAddSupplier}>
        <h2>Add Supplier</h2>
        <input type="text" placeholder="Supplier Name" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} required />
        <input type="text" placeholder="Supplier Contact" value={supplierContact} onChange={(e) => setSupplierContact(e.target.value)} required />
        <button type="submit">Add Supplier</button>
      </form>

      <form onSubmit={handleAddProduct}>
        <h2>Add Product</h2>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)} required>
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
          ))}
        </select>
        <button type="submit">Add Product</button>
      </form>

      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Supplier: {product.supplierId ? product.supplierId.name : 'No supplier'}</p>
            <input 
              type="number" 
              placeholder="Update Quantity" 
              onChange={(e) => handleUpdateStock(product._id, e.target.value)} 
            />
          </div>
        ))}
      </div>

      <h2>Suppliers</h2>
      <div className="supplier-list">
        {suppliers.map((supplier) => (
          <div key={supplier._id} className="supplier-card">
            <h3>{supplier.name}</h3>
            <p>{supplier.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
