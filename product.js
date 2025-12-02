const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products
router.get('/', (req, res) => {
    db.query('SELECT * FROM Products', (err, results) => {
        if(err) return res.status(500).json(err);
        res.json(results);
    });
});

// Get product by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Products WHERE product_id = ?', [req.params.id], (err, results) => {
        if(err) return res.status(500).json(err);
        res.json(results[0]);
    });
});

// Create a new product
router.post('/', (req, res) => {
    const { name, price } = req.body;
    db.query('INSERT INTO Products (name, price) VALUES (?, ?)', [name, price], (err, results) => {
        if(err) return res.status(500).json(err);
        res.json({ message: 'Product created', productId: results.insertId });
    });
});

// Update a product
router.put('/:id', (req, res) => {
    const { name, price } = req.body;
    db.query('UPDATE Products SET name = ?, price = ? WHERE product_id = ?', [name, price, req.params.id], (err) => {
        if(err) return res.status(500).json(err);
        res.json({ message: 'Product updated' });
    });
});

// Delete a product
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Products WHERE product_id = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json(err);
        res.json({ message: 'Product deleted' });
    });
});

module.exports = router;
