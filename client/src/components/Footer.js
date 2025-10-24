import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>
          <strong>About This Project:</strong> This Expense Tracker is a
          full-stack web application built as part of a college software
          engineering project. Its purpose is to provide users with a clean
          and effective tool to manage their personal finances.
        </p>
        <p>
          <strong>How to Use:</strong> Users can create a secure account to
          log, view, and filter their income and expenses. The dashboard
          visualizes spending habits by category and over time, helping users
          understand where their money is going.
        </p>
        <p>
          <strong>Technology:</strong> The app is built with the MERN stack
          (MongoDB, Express.js, React, Node.js) and features a RESTful API,
          JWT authentication, and Chart.js for data visualization.
        </p>
        <p className="footer-copyright">
          Copyright © 2025 Expense Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;