/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuItems'
import { useCart } from '../context/CartContext'

/* --- Menu Page (/menu) --------------------------------------------------- */
// Full drink catalogue with category sidebar, search, and customisation modal.
// The initialDrinkId can be passed via router state (navigate('/menu', { state: { initialDrinkId } }))

export default function MenuPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [selectedCategory, setSelectedCategory] = useState('All Brews')
  const [selectedDrink, setSelectedDrink] = useState(MENU_ITEMS[0])
  const [sweetness, setSweetness] = useState('Half')
  const [iceLevel, setIceLevel] = useState('Regular')
  const [addons, setAddons] = useState({ boba: true, jellyMix: false, lycheeJelly: false, mangoJelly: false, poppingBoba: false })
  const [selectedFlavor, setSelectedFlavor] = useState('None')
  const [quantity, setQuantity] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  // Handle initial drink pre-selection passed via navigation state
  useEffect(() => {
    const id = location.state?.initialDrinkId
    if (id) {
      const target = MENU_ITEMS.find((i) => i.id === id)
      if (target) {
        setSelectedDrink(target)
        setSelectedCategory(target.category)
        setShowModal(true)
      }
      // Clear the state so a refresh doesn't re-open the modal
      navigate('/menu', { replace: true, state: {} })
    }
  }, [location.state?.initialDrinkId, navigate])

  // Filter items by category + search
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'All Brews' || item.category === selectedCategory
    const q = searchQuery.trim().toLowerCase()
    const matchSearch = !q ||
      item.name.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    return matchCat && matchSearch
  })

  // Price calculation
  const addonCost = (addons.boba ? 0.50 : 0) + (addons.jellyMix ? 0.50 : 0) +
    (addons.lycheeJelly ? 0.50 : 0) + (addons.mangoJelly ? 0.50 : 0) + (addons.poppingBoba ? 0.50 : 0)
  const flavorCost = selectedFlavor !== 'None' ? 0.50 : 0
  const totalCost = ((selectedDrink.price + addonCost + flavorCost) * quantity).toFixed(2)

  const handleSelectDrink = (drink) => {
    setSelectedDrink(drink)
    setSweetness('Half')
    setIceLevel('Regular')
    setAddons({ boba: drink.category === 'Milk Tea' || drink.id === 'special_blend_black_tea', jellyMix: false, lycheeJelly: false, mangoJelly: false, poppingBoba: false })
    setSelectedFlavor('None')
    setQuantity(1)
  }

  const handleAddToOrder = () => {
    addToCart(selectedDrink, sweetness, iceLevel, addons, selectedFlavor, quantity)
    setToastMsg(`${selectedDrink.name} added to cart!`)
    setShowModal(false)
    setTimeout(() => setToastMsg(''), 3000)
  }

  /* Customisation panel markup (shared between modal and desktop) */
  const renderCustomizationPanel = () => (
    <>
      <div className="custom-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
        <div>
          <h2 className="favorite-card-title" style={{ fontSize: '24px', margin: 0 }}>{selectedDrink.name}</h2>
          <p className="favorite-card-desc" style={{ fontSize: '13px', marginTop: '6px', lineHeight: '1.4' }}>{selectedDrink.desc}</p>
        </div>
        <span className="favorite-price" style={{ fontSize: '20px', marginLeft: '12px' }}>${selectedDrink.price.toFixed(2)}</span>
      </div>

      {/* Sweetness */}
      <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span className="custom-section-title">Sweetness Level</span>
        <div className="custom-btn-group">
          {['Regular', 'Half', 'Little'].map((level) => (
            <button key={level} className={`custom-btn ${sweetness === level ? 'active' : ''}`} onClick={() => setSweetness(level)}>{level}</button>
          ))}
        </div>
      </div>

      {/* Ice */}
      <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
        <span className="custom-section-title">Ice Level</span>
        <div className="custom-btn-group">
          {['Regular', 'Half', 'Little'].map((level) => (
            <button key={level} className={`custom-btn ${iceLevel === level ? 'active' : ''}`} onClick={() => setIceLevel(level)}>{level}</button>
          ))}
        </div>
      </div>

      {/* Flavor selector — only for special black tea */}
      {selectedDrink.id === 'special_blend_black_tea' && (
        <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          <span className="custom-section-title">Add Flavor (+$0.50)</span>
          <div className="custom-btn-group" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {['None', 'Lychee', 'Passion Fruit', 'Peach', 'Mango', 'Strawberry'].map((flavor) => (
              <button key={flavor} className={`custom-btn ${selectedFlavor === flavor ? 'active' : ''}`} onClick={() => setSelectedFlavor(flavor)} style={{ padding: '8px 2px', fontSize: '11px', whiteSpace: 'nowrap' }}>
                {flavor}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add-ons */}
      <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
        <span className="custom-section-title">Add-Ons (+$0.50)</span>
        {[
          { key: 'boba', name: 'Boba' },
          { key: 'jellyMix', name: 'Jelly Mix' },
          { key: 'lycheeJelly', name: 'Lychee Jelly' },
          { key: 'mangoJelly', name: 'Mango Jelly' },
          { key: 'poppingBoba', name: 'Popping Boba' }
        ].map((addon) => (
          <div className="addon-row" key={addon.key}>
            <label className="addon-label-side">
              <input type="checkbox" checked={addons[addon.key]} onChange={(e) => setAddons({ ...addons, [addon.key]: e.target.checked })} style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }} />
              {addon.name}
            </label>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+0.50</span>
          </div>
        ))}
      </div>

      {/* Quantity */}
      <div className="quantity-selector-row">
        <span className="custom-section-title" style={{ margin: 0 }}>Quantity</span>
        <div className="quantity-controls">
          <button className="quantity-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
          <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '15px', minWidth: '16px', textAlign: 'center' }}>{quantity}</span>
          <button className="quantity-btn" onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>
      </div>

      <button className="btn-add-to-order" onClick={handleAddToOrder} style={{ marginTop: '12px' }}>
        <span>Add to Order</span>
        <span style={{ opacity: 0.9 }}>${totalCost}</span>
      </button>
    </>
  )

  return (
    <div className="menu-page-wrapper">
      {/* Toast notification */}
      {toastMsg && (
        <div className="toast-notification" style={{ position: 'fixed', bottom: '32px', right: '32px', backgroundColor: 'var(--primary-color)', color: '#FFF', padding: '16px 28px', borderRadius: '16px', boxShadow: '0 12px 32px rgba(var(--primary-rgb), 0.3)', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 100, animation: 'fadeIn 0.3s ease forwards' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {toastMsg}
        </div>
      )}

      {/* Search bar */}
      <div className="menu-search-row">
        <div className="menu-search-input-wrapper">
          <svg className="menu-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="menu-search-input"
            placeholder="Search our botanical infusions (e.g. Matcha, Slush, Oolong)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="menu-search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear Search">✕</button>
          )}
        </div>
      </div>

      <div className="menu-view-container">
        {/* Sidebar categories */}
        <div className="menu-sidebar-left">
          <span className="custom-section-title" style={{ paddingLeft: '12px', marginBottom: '4px' }}>Categories</span>
          {MENU_CATEGORIES.map((cat) => (
            <button key={cat} className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`} onClick={() => setSelectedCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="menu-products-column">
          {filteredItems.length === 0 ? (
            <div className="menu-empty-state">
              <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 10l4 4m0-4l-4 4" />
              </svg>
              <h3 className="empty-state-title">No Infusions Found</h3>
              <p className="empty-state-desc">We couldn't find any infusions matching "{searchQuery}". Try updating your query or choosing a different filter.</p>
              <button className="btn-secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('All Brews') }} style={{ marginTop: '12px' }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="menu-products-grid">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`product-menu-card ${selectedDrink.id === item.id ? 'active-highlight' : ''}`}
                  onClick={() => { handleSelectDrink(item); setShowModal(true) }}
                >
                  <div className="product-img-wrapper">
                    <img src={item.image} alt={item.name} className="product-card-img" />
                    {item.tags.map((tag) => (
                      <span key={tag} className="product-tag-badge">{tag}</span>
                    ))}
                  </div>
                  <div className="product-name-row">
                    <h3 className="product-card-title">{item.name}</h3>
                    <span className="product-card-price">${item.price.toFixed(2)}</span>
                  </div>
                  <button
                    className="btn-customize-add"
                    onClick={(e) => { e.stopPropagation(); handleSelectDrink(item); setShowModal(true) }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Customize &amp; Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Customisation Modal */}
      {showModal && (
        <div className="mobile-drawer-overlay" onClick={() => setShowModal(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-close-bar" onClick={() => setShowModal(false)}>
              <span className="drawer-close-indicator"></span>
            </div>
            {renderCustomizationPanel()}
          </div>
        </div>
      )}
    </div>
  )
}
