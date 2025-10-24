import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import DashboardCharts from '../components/DashboardCharts';
import { useNavigate } from 'react-router-dom';
import SummaryCards from '../components/SummaryCards';

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterDate, setFilterDate] = useState(''); // <-- 1. Add new state for the filter
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'https://expense-tracker-api-bohr.onrender.com/api',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/transactions');
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTransaction = async (transactionData) => {
    try {
      const res = await api.post('/transactions', transactionData);
      setTransactions([res.data, ...transactions]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // --- 2. Filter Logic ---
  // This creates a new array based on the filter
  const filteredTransactions = transactions.filter(transaction => {
    if (!filterDate) return true; // If no filter is set, show all
    
    // Get "YYYY-MM" from the transaction's date
    const transactionDate = new Date(transaction.date);
    const transactionMonthYear = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`;
    
    return transactionMonthYear === filterDate;
  });

  return (
    <div className="dashboard-container">
      <Header />
      <main className="dashboard-main">
        
        {/* --- 3. Add Filter UI --- */}
        <div className="filter-container">
          <label htmlFor="month-filter">Filter by Month:</label>
          <input
            type="month"
            id="month-filter"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={() => setFilterDate('')}>
            Clear Filter
          </button>
        </div>
        <SummaryCards transactions={filteredTransactions} />

        <div className="dashboard-content">
        
          {/* --- LEFT COLUMN (Inputs & History) --- */}
          <div className="dashboard-column-1">
            <TransactionForm onAddTransaction={handleAddTransaction} />
            <TransactionList
              transactions={filteredTransactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>

          {/* --- RIGHT COLUMN (Charts) --- */}
          <div className="dashboard-column-2">
            <DashboardCharts transactions={filteredTransactions} type="spending" />
            <DashboardCharts transactions={filteredTransactions} type="income" />
          </div>

        </div>
    </main>
    </div>
  );
};

export default DashboardPage;