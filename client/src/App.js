import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; // Import our styles

// Import Components
import PrivateRoute from './components/PrivateRoute';

// Import Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // Import the new page
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-wrapper">
      <main className="main-content">
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Private Route */}
      {/* This is the magic! */}
      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } 
      />
    </Routes>
    </main>
    <Footer />
    </div>
  );
}

export default App;