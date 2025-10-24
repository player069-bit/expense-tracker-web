import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login
  };

  return (
    <header className="header">
      <h1>Expense Tracker</h1>
      <button onClick={onLogout} className="btn btn-logout">
        Logout
      </button>
    </header>
  );
};

export default Header;