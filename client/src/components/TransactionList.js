import React from 'react';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="list-wrapper">
      <h3>History</h3>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((transaction) => {
            // 1. Format the date
            // This will create a user-friendly local date, e.g., "10/24/2025" or "24/10/2025"
           // 1. Format the date and time
        const date = new Date(transaction.date);

        // e.g., "10/24/2025"
        const formattedDate = date.toLocaleDateString(); 

        // e.g., "10:30 AM" (formats time without seconds)
        const formattedTime = date.toLocaleTimeString('en-US', { 
         hour: '2-digit', 
         minute: '2-digit' 
        });

            return (
              <li
                key={transaction._id}
                className={transaction.amount < 0 ? 'expense' : 'income'}
              >
                {/* 2. Create a left-side group */}
                <div className="transaction-info">
                  <span className="description">{transaction.description}</span>
                  <span className="transaction-date">{formattedDate} at {formattedTime}</span>
                </div>

                {/* 3. Create a right-side group */}
                <div className="transaction-details">
                  <span className={`category-tag ${transaction.category.toLowerCase()}`}>
                        {transaction.category}
                            </span>
                  <span className="amount">
                    {transaction.amount < 0 ? '-' : '+'}₹
                    {Math.abs(transaction.amount)}
                  </span>
                  <button
                    onClick={() => onDeleteTransaction(transaction._id)}
                    className="delete-btn"
                  >
                    X
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;