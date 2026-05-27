import { useNavigate } from 'react-router-dom'

/* --- Favorites Page (/favorites) ----------------------------------------- */

export default function FavoritesPage() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Botanical Sanctuary</h1>
        <p className="page-subtitle">Your personally selected, highly curated menu choices saved for quick steeping.</p>
      </div>

      <div className="favorites-grid">
        {/* Saved favourite #1 */}
        <div className="favorite-card">
          <div className="favorite-heart-tag">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span className="favorite-badge">🍃 Earthy Accent</span>
          <h2 className="favorite-card-title">Earthy Jasmine Rose</h2>
          <p className="favorite-card-desc">Stone-ground organic green tea whisked with organic jasmine buds and freshly dried rose petals.</p>
          <div className="favorite-footer">
            <span className="favorite-price">$6.50</span>
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }} onClick={() => navigate('/')}>
              Steep Now
            </button>
          </div>
        </div>

        {/* Saved favourite #2 */}
        <div className="favorite-card">
          <div className="favorite-heart-tag">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span className="favorite-badge">🌸 Sweet Blossom</span>
          <h2 className="favorite-card-title">Sakura Lychee White Tea</h2>
          <p className="favorite-card-desc">Fresh spring cherry blossom cold-infused with sweet red lychee and delicate silver needle white tea.</p>
          <div className="favorite-footer">
            <span className="favorite-price">$7.00</span>
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }} onClick={() => navigate('/')}>
              Steep Now
            </button>
          </div>
        </div>

        {/* Add more card */}
        <div className="favorite-card" style={{ borderStyle: 'dashed', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '12px' }}>
          <div className="value-icon-circle" style={{ width: '56px', height: '56px' }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="value-card-title" style={{ fontSize: '18px' }}>Add More Signatures</h3>
          <p className="value-card-desc" style={{ fontSize: '13px', maxWidth: '200px' }}>Save your next favorite botanical infusion from our specialties catalog.</p>
          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px', marginTop: '8px' }} onClick={() => navigate('/menu')}>
            Browse Menu
          </button>
        </div>
      </div>
    </div>
  )
}
