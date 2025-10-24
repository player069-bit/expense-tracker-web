import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// We must register the components we want to use
Chart.register(ArcElement, Tooltip, Legend);

const DashboardCharts = ({ transactions, type }) => {
  // --- 1. SPENDING DATA (Existing Logic) ---
  const spendingData = transactions.filter(
    (transaction) => transaction.amount < 0
  );
  const spendingCategoryTotals = spendingData.reduce((acc, transaction) => {
    const category = transaction.category;
    const amount = Math.abs(transaction.amount);
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});
  const spendingChartLabels = Object.keys(spendingCategoryTotals);
  const spendingChartValues = Object.values(spendingCategoryTotals);

  const spendingChartData = {
    labels: spendingChartLabels,
    datasets: [
      {
        label: 'Spending by Category',
        data: spendingChartValues,
        backgroundColor: [
          '#FF6384', // Red
          '#FF9F40', // Orange
          '#FFCE56', // Yellow
          '#9966FF', // Purple
          '#C9CBCF', // Grey
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const spendingOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }, // We'll use our own h3
    },
  };


  // --- 2. INCOME DATA (New Logic) ---
  const incomeData = transactions.filter(
    (transaction) => transaction.amount > 0
  );
  const incomeCategoryTotals = incomeData.reduce((acc, transaction) => {
    const category = transaction.category;
    const amount = transaction.amount; // No Math.abs() needed
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});
  const incomeChartLabels = Object.keys(incomeCategoryTotals);
  const incomeChartValues = Object.values(incomeCategoryTotals);

  const incomeChartData = {
    labels: incomeChartLabels,
    datasets: [
      {
        label: 'Income by Category',
        data: incomeChartValues,
        backgroundColor: [
          '#36A2EB', // Blue
          '#4BC0C0', // Teal
          '#28a745', // Green
          '#A0D468', // Light Green
        ],
        borderWidth: 1,
      },
    ],
  };

  const incomeOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }, // We'll use our own h3
    },
  };


  // --- 3. RENDER BOTH CHARTS ---
  // --- 3. RENDER ONE CHART BASED ON TYPE ---

if (type === 'spending') {
  return (
    <div className="chart-wrapper">
      <h3>Spending Summary</h3>
      {spendingChartLabels.length > 0 ? (
        <Doughnut data={spendingChartData} options={spendingOptions} />
      ) : (
        <p>No spending data to display yet. Add some expenses!</p>
      )}
    </div>
  );
}

if (type === 'income') {
  return (
    <div className="chart-wrapper">
      <h3>Income Summary</h3>
      {incomeChartLabels.length > 0 ? (
        <Doughnut data={incomeChartData} options={incomeOptions} />
      ) : (
        <p>No income data to display yet. Add some income!</p>
      )}
    </div>
  );
}

return null; // Return nothing if no type is specified
};

export default DashboardCharts;