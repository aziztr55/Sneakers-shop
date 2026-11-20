import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest, getImageUrl } from '../api';

function CartPage({ user, cartItems, onRemoveItem, onCheckoutSuccess }) {
  const [orders, setOrders] = useState([]);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const data = await apiRequest(`/api/orders/${user.id}`);
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="cart-empty-card">
        <h2>Your Shopping Cart</h2>
        <p>Please login to view your shopping cart and place orders.</p>
        <Link to="/login" className="btn-primary">Go to Login</Link>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.sneaker ? item.sneaker.price : 0;
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    setError('');
    setCheckingOut(true);
    try {
      await apiRequest('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ user_id: user.id })
      });
      await onCheckoutSuccess();
      await fetchOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {error && <div className="alert-error">{error}</div>}

      {cartItems.length === 0 ? (
        <div className="cart-empty-card">
          <p>Your cart is currently empty.</p>
          <Link to="/" className="btn-primary">Browse Sneakers</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                {item.sneaker && (
                  <>
                    <img
                      src={getImageUrl(item.sneaker.image_url)}
                      alt={item.sneaker.name}
                      className="cart-item-img"
                    />
                    <div className="cart-item-info">
                      <span className="sneaker-brand">{item.sneaker.brand}</span>
                      <h3>{item.sneaker.name}</h3>
                      <p className="cart-item-meta">
                        EU Size: <strong>{item.size}</strong> &bull; Quantity: <strong>{item.quantity}</strong>
                      </p>
                    </div>
                    <div className="cart-item-actions">
                      <span className="cart-item-price">
                        €{(item.sneaker.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        className="btn-remove"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Items ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="btn-primary btn-block"
              onClick={handleCheckout}
              disabled={checkingOut}
            >
              {checkingOut ? 'Placing Order...' : 'Checkout & Place Order'}
            </button>
          </div>
        </div>
      )}

      {orders.length > 0 && (
        <div className="orders-section">
          <h3>Your Past Orders</h3>
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <strong>Order #{order.id}</strong>
                  <span className="order-date">{order.created_at}</span>
                </div>
                <p className="order-items">{order.items_summary}</p>
                <p className="order-total">Total Paid: <strong>€{order.total_price.toFixed(2)}</strong></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;

