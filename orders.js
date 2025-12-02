const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all orders
router.get('/', (req, res) => {
    db.query('SELECT * FROM Orders', (err, results) => {
        if(err) return res.status(500).json(err);
        res.json(results);
    });
});

// Get order by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Orders WHERE order_id = ?', [req.params.id], (err, results) => {
        if(err) return res.status(500).json(err);
        res.json(results[0]);
    });
});

// Create a new order
router.post('/', (req, res) => {
    const { product_id, quantity } = req.body;
    db.query('INSERT INTO Orders (product_id, quantity) VALUES (?, ?)', [product_id, quantity], (err, results) => {
        if(err) return res.status(500).json(err);
        res.json({ message: 'Order created', orderId: results.insertId });
    });
});

// Update an order
router.put('/:id', (req, res) => {
    const { product_id, quantity } = req.body;
    db.query('UPDATE Orders SET product_id = ?, quantity = ? WHERE order_id = ?', [product_id, quantity, req.params.id], (err) => {
        if(err) return res.status(500).json(err);
        res.json({ message: 'Order updated' });
    });
});

// Delete an order
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Orders WHERE order_id = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json(err);
        res.json({ message: 'Order deleted' });
    });
});

module.exports = router;
