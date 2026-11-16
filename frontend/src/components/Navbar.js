import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, cartCount, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          SNEAKERS<span>SHOP</span>
        </Link>

        <nav className="navbar-links">
          <Link to="/" className="nav-link">Catalog</Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="nav-user">
              <span className="welcome-text">Hi, <strong>{user.username}</strong></span>
              <button onClick={onLogout} className="btn-outline">Logout</button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

