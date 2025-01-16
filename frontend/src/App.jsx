import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './app/Login/LoginPage';
import RegisterPage from './app/Register/RegisterPage';
import Home from './app/Home/Home';

function App() {
  const isLoggedIn = !!localStorage.getItem("userToken"); // Periksa token di localStorage

  return (
    <Router>
      <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App

