import React, { useState } from 'react';
import { getImageUrl } from '../api';

const EU_SIZES = ['39', '40', '41', '42', '43', '44', '45'];

function SneakerModal({ sneaker, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('42');
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  if (!sneaker) return null;

  const handleAdd = async () => {
    setSubmitting(true);
    try {
      await onAddToCart(sneaker, selectedSize, quantity);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        <div className="modal-body">
          <div className="modal-image-box">
            <img
              src={getImageUrl(sneaker.image_url)}
              alt={sneaker.name}
              className="modal-image"
            />
          </div>

          <div className="modal-details">
            <span className="sneaker-brand">{sneaker.brand} &bull; {sneaker.category}</span>
            <h2>{sneaker.name}</h2>
            <p className="modal-price">€{sneaker.price.toFixed(2)}</p>
            <p className="modal-desc">{sneaker.description}</p>

            <div className="size-selector">
              <label>Select EU Size:</label>
              <div className="size-grid">
                {EU_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="qty-selector">
              <label htmlFor="qty-input">Quantity:</label>
              <input
                id="qty-input"
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
              />
            </div>

            <button
              className="btn-primary btn-block"
              onClick={handleAdd}
              disabled={submitting}
            >
              {submitting ? 'Adding...' : `Add to Cart — €${(sneaker.price * quantity).toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SneakerModal;

