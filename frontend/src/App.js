import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SneakerModal from './components/SneakerModal';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { apiRequest } from './api';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sneakers_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cartItems, setCartItems] = useState([]);
  const [selectedSneaker, setSelectedSneaker] = useState(null);
  const [notification, setNotification] = useState('');

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

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
    showToast(`Welcome, ${loggedInUser.username}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    localStorage.removeItem('sneakers_user');
    showToast('Logged out successfully.');
  };

  const handleAddToCart = async (sneaker, size, quantity) => {
    if (!user) {
      showToast('Please login first to add items to your cart.');
      setSelectedSneaker(null);
      return;
    }
    try {
      await apiRequest('/api/cart', {
        method: 'POST',
        body: JSON.stringify({
          user_id: user.id,
          sneaker_id: sneaker.id,
          size,
          quantity
        })
      });
      await fetchCart(user);
      setSelectedSneaker(null);
      showToast(`Added ${sneaker.name} (EU ${size}) to cart!`);
    } catch (err) {
      showToast(err.message);
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} cartCount={totalCartCount} onLogout={handleLogout} />

        {notification && <div className="toast-banner">{notification}</div>}

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<CatalogPage onSelectSneaker={(s) => setSelectedSneaker(s)} />}
            />
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/register"
              element={<RegisterPage onLoginSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/cart"
              element={<div><h2>Shopping Cart (Coming in Step 13)</h2></div>}
            />
          </Routes>
        </main>

        <SneakerModal
          sneaker={selectedSneaker}
          onClose={() => setSelectedSneaker(null)}
          onAddToCart={handleAddToCart}
        />

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Sneakers Shop — Tecnologie Web Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
