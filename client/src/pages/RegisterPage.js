import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To store error messages
  const navigate = useNavigate(); // Hook for redirection

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Send the request to your backend API
      const response = await axios.post('http://localhost:5000/api/users/register', {
        email,
        password
      });

      // If successful, server sends back a token. We'll store it in the browser.
      localStorage.setItem('token', response.data.token);
      
      // Redirect to the home page (which will be our dashboard)
      navigate('/'); 
      
    } catch (err) {
      // Handle errors from the server (e.g., "User already exists")
      if (err.response && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h1 className="form-title">Expense Tracker</h1>
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
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
          <button type="submit" className="btn">Register</button>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;