const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Transaction = require('../models/Transaction'); // Import the Transaction model
const User = require('../models/User'); // We might not need this, but good to have

// --- GET ALL TRANSACTIONS ---
// @route   GET /api/transactions
// @desc    Get all transactions for the logged-in user
// @access  Private (because we use authMiddleware)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // req.user.id was added by the authMiddleware
    // Find transactions and sort by date (newest first)
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// --- ADD A NEW TRANSACTION ---
// @route   POST /api/transactions
// @desc    Add a new transaction
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;

    const newTransaction = new Transaction({
      amount,
      description,
      category,
      date,
      user: req.user.id // Link the transaction to the logged-in user
    });

    const transaction = await newTransaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// --- DELETE A TRANSACTION ---
// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    // 1. Check if transaction exists
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    // 2. Check if the user owns this transaction
    // Make sure transaction.user (ObjectId) is a string
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this' });
    }

    // 3. If they own it, delete it
    await transaction.deleteOne(); // Use this new method instead of .remove()
    res.json({ msg: 'Transaction removed' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// You can also add a PUT route for updating, following the same logic as DELETE
// (Find by ID, check ownership, then update)

module.exports = router;