const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  // This is the CRITICAL link to the User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Connects this to the User model
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number']
  },
  description: {
    type: String,
    trim: true, // Trims whitespace
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;