import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

/* --- Cart Page (/cart) --------------------------------------------------- */

export default function CartPage() {
  const navigate = useNavigate()
  const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [orderRef, setOrderRef] = useState('')

  // Price calculations
  const subtotal = cart.reduce((sum, item) => {
    const addonCost =
      (item.addons.boba ? 0.50 : 0) +
      (item.addons.jellyMix ? 0.50 : 0) +
      (item.addons.lycheeJelly ? 0.50 : 0) +
      (item.addons.mangoJelly ? 0.50 : 0) +
      (item.addons.poppingBoba ? 0.50 : 0)
    const flavorCost = item.selectedFlavor !== 'None' ? 0.50 : 0
    return sum + (item.drink.price + addonCost + flavorCost) * item.quantity
  }, 0)

  const tax = subtotal * 0.0825
  const total = subtotal + tax

  const handleCheckout = () => {
    setIsCheckingOut(true)
    const ref = 'BD-' + Math.floor(1000 + Math.random() * 9000)
    setOrderRef(ref)
    setTimeout(() => { setIsCheckingOut(false); setCheckoutSuccess(true) }, 1500)
  }

  const handleCloseSuccess = () => {
    setCheckoutSuccess(false)
    clearCart()
    navigate('/menu')
  }

  /* Empty state */
  if (cart.length === 0) {
    return (
      <div className="page-container">
        <div className="cart-empty-state" style={{ textAlign: 'center', padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '40px', height: '40px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h1 className="page-title" style={{ fontSize: '32px' }}>Your Sanctuary is Empty</h1>
          <p className="page-subtitle" style={{ maxWidth: '400px', marginInline: 'auto' }}>
            It seems you haven't added any slow-brewed signature teas to your cart yet. Let's explore our botanicals!
          </p>
          <button className="btn-primary" onClick={() => navigate('/menu')} style={{ marginTop: '16px' }}>
            Explore the Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: '12px' }}>
        <h1 className="page-title">Shopping Cart</h1>
        <p className="page-subtitle">Review your custom-steeped selections before reserving your pick up.</p>
      </div>

      <div className="cart-layout">
        {/* Cart item list */}
        <div className="cart-items-column">
          {cart.map((item) => {
            const addonCost =
              (item.addons.boba ? 0.50 : 0) + (item.addons.jellyMix ? 0.50 : 0) +
              (item.addons.lycheeJelly ? 0.50 : 0) + (item.addons.mangoJelly ? 0.50 : 0) +
              (item.addons.poppingBoba ? 0.50 : 0)
            const flavorCost = item.selectedFlavor !== 'None' ? 0.50 : 0
            const itemPrice = item.drink.price + addonCost + flavorCost
            const activeAddons = Object.entries(item.addons)
              .filter(([, v]) => v)
              .map(([k]) => ({ boba: 'Boba', jellyMix: 'Jelly Mix', lycheeJelly: 'Lychee Jelly', mangoJelly: 'Mango Jelly', poppingBoba: 'Popping Boba' }[k]))

            return (
              <div className="cart-item-card" key={item.customKey}>
                <div className="cart-item-image-wrapper">
                  <img src={item.drink.image} alt={item.drink.name} className="cart-item-img" />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-title-row">
                    <h3 className="cart-item-name">{item.drink.name}</h3>
                    <span className="cart-item-unit-price">${itemPrice.toFixed(2)}</span>
                  </div>
                  <div className="cart-item-options-list">
                    <span className="option-badge">🌿 {item.sweetness} Sweet</span>
                    <span className="option-badge">🧊 {item.iceLevel} Ice</span>
                    {item.selectedFlavor !== 'None' && <span className="option-badge">✨ {item.selectedFlavor} Flavor</span>}
                    {activeAddons.length > 0 && <span className="option-badge">➕ Addons: {activeAddons.join(', ')}</span>}
                  </div>
                  <div className="cart-item-actions-row">
                    <div className="quantity-controls" style={{ padding: '4px 12px' }}>
                      <button className="quantity-btn" onClick={() => updateCartItemQuantity(item.customKey, item.quantity - 1)}>−</button>
                      <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '14px', minWidth: '14px', textAlign: 'center' }}>{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => updateCartItemQuantity(item.customKey, item.quantity + 1)}>+</button>
                    </div>
                    <button className="cart-remove-btn" onClick={() => removeFromCart(item.customKey)} aria-label="Remove item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: '18px', height: '18px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order summary */}
        <div className="cart-summary-column">
          <div className="cart-receipt-card">
            <h2 className="receipt-title">Order Summary</h2>
            <div className="receipt-divider"></div>
            <div className="receipt-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="receipt-row"><span>Sales Tax (8.25%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="receipt-divider dotted"></div>
            <div className="receipt-row total-row"><span>Total Cost</span><span>${total.toFixed(2)}</span></div>

            <button
              className={`btn-add-to-order checkout-submit-btn ${isCheckingOut ? 'loading' : ''}`}
              onClick={handleCheckout}
              disabled={isCheckingOut}
              style={{ marginTop: '24px', justifyContent: 'center' }}
            >
              {isCheckingOut ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeLinecap="round" fill="none" opacity="0.25" />
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.0434 16.4528" strokeLinecap="round" />
                  </svg>
                  Steeping Order...
                </>
              ) : (
                <>
                  Reserve for Pickup
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginLeft: '8px', width: '18px', height: '18px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
            <div className="checkout-badge-guarantee">🍃 Direct Pick-Up: Ready in 15 Minutes</div>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {checkoutSuccess && (
        <div className="mobile-drawer-overlay success-modal-overlay" onClick={handleCloseSuccess}>
          <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="success-modal-title">Steep Reserved!</h2>
            <p className="success-modal-number">Order Ref: <strong>#{orderRef}</strong></p>
            <div className="success-modal-divider"></div>
            <div className="success-modal-detail">
              <p>Your slow-brewed botanical custom infusions are being prepared in our kettles.</p>
              <div className="success-pickup-timeline">⏱️ <strong>Pickup Time:</strong> Ready in 15 mins (at 77 Botanical Lane)</div>
            </div>
            <button className="btn-primary" onClick={handleCloseSuccess} style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }}>
              Return to Tea House
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
