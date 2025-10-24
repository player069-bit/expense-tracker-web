import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To store error messages
  const navigate = useNavigate(); // Hook for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Send the request to your backend API
      const response = await axios.post('https://expense-tracker-api-bohr.onrender.com/api/users/login', {
        email,
        password
      });

      // If successful, store the token
      localStorage.setItem('token', response.data.token);
      
      // Redirect to the home page (dashboard)
      navigate('/');

    } catch (err) {
      // Handle errors (e.g., "Invalid credentials")
      if (err.response && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Login failed. Please try again.');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h1 className="form-title">Expense Tracker</h1>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>} {/* <-- UPDATED */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;