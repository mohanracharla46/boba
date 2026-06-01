import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import bobaLogo from '../assets/bobalogo.png'

/* --- Header / Navbar Component ------------------------------------------ */
// Uses react-router NavLink so the active route is automatically highlighted.
// Cart badge is driven by CartContext so it stays in sync across all pages.

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { cartCount } = useCart()
  const { isLoggedIn, user, logout } = useAuth()
  const navigate = useNavigate()

  const close = () => setIsMobileMenuOpen(false)

  return (
    <>
      <nav className="navbar">
        {/* Brand Logo */}
        <div
          className="nav-brand"
          onClick={() => { navigate('/'); close() }}
          style={{ cursor: 'pointer' }}
        >
          <img className="brand-icon" src={bobaLogo} alt="Boba District Logo" />
        </div>

        {/* Desktop + Mobile Nav Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <NavLink to="/" end onClick={close} className={({ isActive }) => isActive ? 'active-link' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" onClick={close} className={({ isActive }) => isActive ? 'active-link' : ''}>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" onClick={close} className={({ isActive }) => isActive ? 'active-link' : ''}>
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={close} className={({ isActive }) => isActive ? 'active-link' : ''}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={close} className={({ isActive }) => isActive ? 'active-link' : ''}>
              Contact
            </NavLink>
          </li>
          {/* Mobile-only session-based menu items */}
          <li className="mobile-only-link">
            {isLoggedIn ? (
              <NavLink to="/profile" onClick={close} className={({ isActive }) => isActive ? 'active-link' : ''}>
                My Profile
              </NavLink>
            ) : (
              <NavLink to="/login" onClick={close} className={({ isActive }) => isActive ? 'active-link' : ''}>
                Login
              </NavLink>
            )}
          </li>
          {isLoggedIn && (
            <li className="mobile-only-link">
              <button 
                className="mobile-logout-btn" 
                onClick={() => { logout(); close(); alert('Logged out successfully.') }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Right-side action buttons */}
        <div className="nav-actions">
          {/* Order Now CTA */}
          <button className="btn-nav-order" onClick={() => { navigate('/menu'); close() }}>
            Order Now
          </button>

          {/* Cart icon with live badge */}
          <button
            className="nav-btn cart-nav-btn"
            aria-label="View Cart"
            title="Cart"
            onClick={() => { navigate('/cart'); close() }}
            style={{ position: 'relative' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '22px', height: '22px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="nav-cart-badge">{cartCount}</span>
            )}
          </button>

          {/* Login / User Profile Dropdown */}
          {isLoggedIn ? (
            <div className="user-profile-container" style={{ position: 'relative' }}>
              <button
                className="user-profile-btn"
                aria-label="User Profile Menu"
                onClick={() => setIsDropdownOpen((o) => !o)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {isDropdownOpen && (
                <>
                  <div 
                    className="dropdown-overlay" 
                    onClick={() => setIsDropdownOpen(false)} 
                    style={{ position: 'fixed', inset: 0, zIndex: 998, background: 'transparent' }}
                  />
                  <div className="user-dropdown-menu" style={{ zIndex: 999 }}>
                    <div className="dropdown-user-info">
                      <span className="dropdown-username">{user?.name}</span>
                      <span className="dropdown-email">{user?.email}</span>
                    </div>
                    <div className="dropdown-divider" />
                    <button
                      className="user-dropdown-item"
                      onClick={() => { navigate('/profile'); setIsDropdownOpen(false) }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px', marginRight: '8px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile
                    </button>
                    <button
                      className="user-dropdown-item logout-item"
                      onClick={() => { logout(); setIsDropdownOpen(false); alert('Logged out successfully.') }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px', marginRight: '8px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button className="btn-nav-login" title="Login to account" onClick={() => { navigate('/login'); close() }}>
              Login
            </button>
          )}

          {/* Hamburger toggle */}
          <button
            className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-label="Toggle Navigation Menu"
            title="Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>
    </>
  )
}
