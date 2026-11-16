import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { apiRequest } from './api';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sneakers_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async (currentUser) => {
    if (!currentUser) {
      setCartItems([]);
      return;
    }
    try {
      const data = await apiRequest(`/api/cart/${currentUser.id}`);
      setCartItems(data);
    } catch (err) {
      console.error('Failed to load cart:', err.message);
    }
  };

  useEffect(() => {
    fetchCart(user);
  }, [user]);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('sneakers_user', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    localStorage.removeItem('sneakers_user');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} cartCount={totalCartCount} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>Sneakers Catalog</h1>
                  <p>Browse our collection of lifestyle sneakers and football cleats.</p>
                </div>
              }
            />
            <Route
              path="/login"
              element={<div><h2>Login Page (Coming in Step 10)</h2></div>}
            />
            <Route
              path="/register"
              element={<div><h2>Register Page (Coming in Step 10)</h2></div>}
            />
            <Route
              path="/cart"
              element={<div><h2>Shopping Cart (Coming in Step 13)</h2></div>}
            />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Sneakers Shop — Tecnologie Web Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
