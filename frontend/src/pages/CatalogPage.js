import React, { useState, useEffect } from 'react';
import { apiRequest, getImageUrl } from '../api';

const BRANDS = ['All', 'Adidas', 'Jordan', 'New Balance', 'Puma', 'Nike'];
const CATEGORIES = ['All', 'Lifestyle', 'Calcio'];

function CatalogPage({ onSelectSneaker }) {
  const [sneakers, setSneakers] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSneakers = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (selectedBrand !== 'All') params.append('brand', selectedBrand);
        if (selectedCategory !== 'All') params.append('category', selectedCategory);
        if (searchQuery.trim()) params.append('search', searchQuery.trim());

        const queryString = params.toString() ? `?${params.toString()}` : '';
        const data = await apiRequest(`/api/sneakers${queryString}`);
        setSneakers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSneakers();
  }, [selectedBrand, selectedCategory, searchQuery]);

  return (
    <div className="catalog-page">
      <div className="hero-banner">
        <h1>Step Into Style</h1>
        <p>Explore our curated collection of iconic streetwear sneakers and high-performance football cleats.</p>
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          <span className="filter-label">Category:</span>
          <div className="filter-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Brand:</span>
          <div className="filter-pills">
            {BRANDS.map((brand) => (
              <button
                key={brand}
                className={`pill-btn ${selectedBrand === brand ? 'active' : ''}`}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search sneakers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {loading ? (
        <p className="status-text">Loading sneakers...</p>
      ) : sneakers.length === 0 ? (
        <p className="status-text">No sneakers match your current filters.</p>
      ) : (
        <div className="sneakers-grid">
          {sneakers.map((sneaker) => (
            <div key={sneaker.id} className="sneaker-card">
              <div className="sneaker-image-wrap">
                <img
                  src={getImageUrl(sneaker.image_url)}
                  alt={sneaker.name}
                  className="sneaker-image"
                />
                <span className="category-tag">{sneaker.category}</span>
              </div>
              <div className="sneaker-info">
                <span className="sneaker-brand">{sneaker.brand}</span>
                <h3 className="sneaker-name">{sneaker.name}</h3>
                <p className="sneaker-desc">{sneaker.description}</p>
                <div className="sneaker-footer">
                  <span className="sneaker-price">€{sneaker.price.toFixed(2)}</span>
                  <button
                    className="btn-primary"
                    onClick={() => onSelectSneaker && onSelectSneaker(sneaker)}
                  >
                    Select Size
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CatalogPage;

