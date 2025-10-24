import React from 'react';

// Helper function to format the number as currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
};

const SummaryCards = ({ transactions }) => {
  // 1. Calculate the totals
  const { income, expenses, balance } = transactions.reduce(
    (acc, transaction) => {
      if (transaction.amount > 0) {
        acc.income += transaction.amount;
      } else {
        acc.expenses += transaction.amount;
      }
      acc.balance = acc.income + acc.expenses;
      return acc;
    },
    { income: 0, expenses: 0, balance: 0 } // Initial values
  );

  return (
    <div className="summary-cards-container">
      {/* Income Card */}
      <div className="card card-income">
        <h4>Total Income</h4>
        <p>{formatCurrency(income)}</p>
      </div>

      {/* Expenses Card */}
      <div className="card card-expense">
        <h4>Total Expenses</h4>
        <p>{formatCurrency(expenses)}</p>
      </div>

      {/* Balance Card */}
      <div className="card card-balance">
        <h4>Current Balance</h4>
        <p>{formatCurrency(balance)}</p>
      </div>
    </div>
  );
};

export default SummaryCards;