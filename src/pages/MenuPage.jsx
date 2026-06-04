import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuItems'

export default function MenuPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [selectedCategory, setSelectedCategory] = useState('All Dishes')
  const [selectedItem, setSelectedItem] = useState(MENU_ITEMS[0])
  const [spiceLevel, setSpiceLevel] = useState('Medium')
  const [protein, setProtein] = useState('Chicken')
  const [addons, setAddons] = useState({
    friedEgg: false,
    extraTofu: false,
    extraVeggies: false,
    chiliCrisp: false,
    coconutDrizzle: false,
    toastedSesame: false,
    extraMango: false,
    springRoll: false
  })
  const [sweetness, setSweetness] = useState('Regular Sweet')
  const [entree, setEntree] = useState('Bangkok Fire Basil Rice')
  const [quantity, setQuantity] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  // Handle initial item pre-selection passed via navigation state
  useEffect(() => {
    const id = location.state?.initialDrinkId
    if (id) {
      const target = MENU_ITEMS.find((i) => i.id === id)
      if (target) {
        handleSelectItem(target)
        setSelectedCategory(target.category)
        setShowModal(true)
      }
      // Clear the state so a refresh doesn't re-open the modal
      navigate('/menu', { replace: true, state: {} })
    }
  }, [location.state?.initialDrinkId, navigate])

  // Filter items by category + search
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'All Dishes' || item.category === selectedCategory
    const q = searchQuery.trim().toLowerCase()
    const matchSearch = !q ||
      item.name.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    return matchCat && matchSearch
  })

  const getCustomizedPrice = () => {
    let price = selectedItem.price
    
    // Protein price addition
    if (selectedItem.category === 'Fried Rice' || selectedItem.category === 'Southeast Asian Street Kitchen' || selectedItem.category === 'Plant-Based Kitchen') {
      if (protein === 'Beef' || protein === 'Pork' || protein === 'Vegan Chicken') {
        price += 2.00
      } else if (protein === 'Shrimp') {
        price += 3.00
      }
    }
    
    // Addons price addition
    if (addons.friedEgg) price += 1.50
    if (addons.extraTofu) price += 1.50
    if (addons.extraVeggies) price += 1.50
    if (addons.chiliCrisp) price += 0.75
    if (addons.coconutDrizzle) price += 0.50
    if (addons.toastedSesame) price += 0.50
    if (addons.extraMango) price += 2.00
    if (addons.springRoll) price += 1.50
    
    return price
  }

  const totalCost = (getCustomizedPrice() * quantity).toFixed(2)

  const handleSelectItem = (item) => {
    setSelectedItem(item)
    setQuantity(1)
    
    // Set smart defaults based on category
    if (item.category === 'Plant-Based Kitchen') {
      setProtein('Tofu')
      setSpiceLevel('Medium')
    } else if (item.category === 'Fried Rice' || item.category === 'Southeast Asian Street Kitchen') {
      setProtein('Chicken')
      setSpiceLevel('Medium')
    } else {
      setProtein('')
      setSpiceLevel('')
    }
    
    setSweetness('Regular Sweet')
    setEntree('Bangkok Fire Basil Rice')
    setAddons({
      friedEgg: false,
      extraTofu: false,
      extraVeggies: false,
      chiliCrisp: false,
      coconutDrizzle: false,
      toastedSesame: false,
      extraMango: false,
      springRoll: false
    })
  }

  const handleAddToOrder = () => {
    const customizations = {}
    
    if (selectedItem.category === 'Fried Rice' || selectedItem.category === 'Southeast Asian Street Kitchen' || selectedItem.category === 'Plant-Based Kitchen') {
      customizations.spiceLevel = spiceLevel
      customizations.protein = protein
      customizations.addons = {
        friedEgg: addons.friedEgg,
        extraTofu: addons.extraTofu,
        extraVeggies: addons.extraVeggies,
        chiliCrisp: addons.chiliCrisp
      }
    } else if (selectedItem.category === 'Sweet Endings') {
      customizations.sweetness = sweetness
      customizations.addons = {
        coconutDrizzle: addons.coconutDrizzle,
        toastedSesame: addons.toastedSesame,
        extraMango: addons.extraMango
      }
    } else if (selectedItem.category === 'Lunch Experience') {
      customizations.entree = entree
      customizations.addons = {
        friedEgg: addons.friedEgg,
        springRoll: addons.springRoll
      }
    }
    
    addToCart(selectedItem, customizations, quantity)
    setToastMsg(`${selectedItem.name} added to cart!`)
    setShowModal(false)
    setTimeout(() => setToastMsg(''), 3000)
  }

  /* Customisation panel markup (shared between modal and desktop) */
  const renderCustomizationPanel = () => {
    const isMainDish = selectedItem.category === 'Fried Rice' || selectedItem.category === 'Southeast Asian Street Kitchen' || selectedItem.category === 'Plant-Based Kitchen'
    const isDessert = selectedItem.category === 'Sweet Endings'
    const isLunch = selectedItem.category === 'Lunch Experience'
    
    return (
      <>
        <div className="custom-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
          <div>
            <h2 className="favorite-card-title" style={{ fontSize: '24px', margin: 0 }}>{selectedItem.name}</h2>
            <p className="favorite-card-desc" style={{ fontSize: '13px', marginTop: '6px', lineHeight: '1.4' }}>{selectedItem.desc}</p>
          </div>
          <span className="favorite-price" style={{ fontSize: '20px', marginLeft: '12px' }}>${selectedItem.price.toFixed(2)}</span>
        </div>

        {/* 1. Spice Level (for Main Dishes) */}
        {isMainDish && (
          <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="custom-section-title">Spice Level</span>
            <div className="custom-btn-group" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
              {['None', 'Mild', 'Medium', 'Spicy', 'Thai Hot'].map((level) => (
                <button key={level} className={`custom-btn ${spiceLevel === level ? 'active' : ''}`} onClick={() => setSpiceLevel(level)} style={{ fontSize: '11px', padding: '6px 2px' }}>
                  {level === 'Thai Hot' ? '🌶️ Thai Hot' : level}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. Protein Choice (for Main Dishes) */}
        {isMainDish && (
          <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
            <span className="custom-section-title">Protein Choice</span>
            <div className="custom-btn-group" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {selectedItem.category === 'Plant-Based Kitchen' ? (
                ['Tofu', 'Veggies', 'Vegan Chicken'].map((p) => {
                  const extra = p === 'Vegan Chicken' ? ' (+$2.00)' : ''
                  return (
                    <button key={p} className={`custom-btn ${protein === p ? 'active' : ''}`} onClick={() => setProtein(p)} style={{ fontSize: '11px', padding: '8px 2px' }}>
                      {p}{extra}
                    </button>
                  )
                })
              ) : (
                ['Chicken', 'Tofu', 'Veggies', 'Beef', 'Pork', 'Shrimp'].map((p) => {
                  const extra = (p === 'Beef' || p === 'Pork') ? ' (+$2.00)' : p === 'Shrimp' ? ' (+$3.00)' : ''
                  return (
                    <button key={p} className={`custom-btn ${protein === p ? 'active' : ''}`} onClick={() => setProtein(p)} style={{ fontSize: '11px', padding: '8px 2px' }}>
                      {p}{extra}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* 3. Sweetness Level (for Desserts) */}
        {isDessert && (
          <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="custom-section-title">Sweetness Level</span>
            <div className="custom-btn-group">
              {['Less Sweet', 'Regular Sweet', 'Extra Sweet'].map((level) => (
                <button key={level} className={`custom-btn ${sweetness === level ? 'active' : ''}`} onClick={() => setSweetness(level)}>
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Entree Choice (for Lunch Experience) */}
        {isLunch && (
          <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="custom-section-title">Select Entree</span>
            <div className="custom-btn-group" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {['Bangkok Fire Basil Rice', 'Classic Thai Fried Rice', 'Vegetarian Pad Thai', 'Tofu Khee Mao'].map((ent) => (
                <button key={ent} className={`custom-btn ${entree === ent ? 'active' : ''}`} onClick={() => setEntree(ent)} style={{ fontSize: '11px', padding: '8px 2px' }}>
                  {ent}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 5. Add-ons based on category */}
        {(isMainDish || isDessert || isLunch) && (
          <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
            <span className="custom-section-title">Add-Ons</span>
            {isMainDish && (
              <>
                {selectedItem.category !== 'Plant-Based Kitchen' && (
                  <div className="addon-row">
                    <label className="addon-label-side">
                      <input type="checkbox" checked={addons.friedEgg} onChange={(e) => setAddons({ ...addons, friedEgg: e.target.checked })} style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }} />
                      Fried Egg
                    </label>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+$1.50</span>
                  </div>
                )}
                <div className="addon-row">
                  <label className="addon-label-side">
                    <input type="checkbox" checked={addons.extraTofu} onChange={(e) => setAddons({ ...addons, extraTofu: e.target.checked })} style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }} />
                    Extra Tofu
                  </label>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+$1.50</span>
                </div>
                <div className="addon-row">
                  <label className="addon-label-side">
                    <input type="checkbox" checked={addons.extraVeggies} onChange={(e) => setAddons({ ...addons, extraVeggies: e.target.checked })} style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }} />
                    Extra Veggies
                  </label>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+$1.50</span>
                </div>
                <div className="addon-row">
                  <label className="addon-label-side">
                    <input type="checkbox" checked={addons.chiliCrisp} onChange={(e) => setAddons({ ...addons, chiliCrisp: e.target.checked })} style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }} />
                    Thai Chili Crisp
                  </label>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+$0.75</span>
                </div>
              </>
            )}
            
            {isDessert && (
              <>
                <div className="addon-row">
                  <label className="addon-label-side">
                    <input type="checkbox" checked={addons.coconutDrizzle} onChange={(e) => setAddons({ ...addons, coconutDrizzle: e.target.checked })} style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }} />
                    Extra Coconut Cream Drizzle
                  </label>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+$0.50</span>
                </div>
                <div className="addon-row">
                  <label className="addon-label-side">
                    <input type="checkbox" checked={addons.toastedSesame} onChange={(e) => setAddons({ ...addons, toastedSesame: e.target.checked })} style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }} />
                    Toasted Sesame Seeds
                  </label>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+$0.50</span>
                </div>
                {selectedItem.id.includes('mango') && (
                  <div className="addon-row">
                    <label className="addon-label-side">
                      <input type="checkbox" checked={addons.extraMango} onChange={(e) => setAddons({ ...addons, extraMango: e.target.checked })} style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }} />
                      Extra Sweet Mango Slices
                    </label>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+$2.00</span>
                  </div>
                )}
              </>
            )}

            {isLunch && (
              <>
                <div className="addon-row">
                  <label className="addon-label-side">
                    <input type="checkbox" checked={addons.friedEgg} onChange={(e) => setAddons({ ...addons, friedEgg: e.target.checked })} style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }} />
                    Fried Egg
                  </label>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+$1.50</span>
                </div>
                <div className="addon-row">
                  <label className="addon-label-side">
                    <input type="checkbox" checked={addons.springRoll} onChange={(e) => setAddons({ ...addons, springRoll: e.target.checked })} style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }} />
                    Crispy Spring Roll (1 pc)
                  </label>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+$1.50</span>
                </div>
              </>
            )}
          </div>
        )}

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
  }

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
            placeholder="Search our street kitchen menu (e.g. Basil Rice, Pad Thai, Khao Soi)..."
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
              <h3 className="empty-state-title">No Dishes Found</h3>
              <p className="empty-state-desc">We couldn't find any items matching "{searchQuery}". Try updating your query or choosing a different filter.</p>
              <button className="btn-secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('All Dishes') }} style={{ marginTop: '12px' }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="menu-products-grid">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`product-menu-card ${selectedItem.id === item.id ? 'active-highlight' : ''}`}
                  onClick={() => { handleSelectItem(item); setShowModal(true) }}
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
                    onClick={(e) => { e.stopPropagation(); handleSelectItem(item); setShowModal(true) }}
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
