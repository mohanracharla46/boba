import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import FavoritesPage from './pages/FavoritesPage'
import CartPage from './pages/CartPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import { AuthProvider } from './context/AuthContext'
import bobaLogo from './assets/bobalogo.png'
import './App.css'

/* --- Scroll to top on every route change --------------------------------- */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

/* --- App Shell ----------------------------------------------------------- */
// Thin wrapper that provides CartContext, renders the shared Header / Footer,
// and delegates all page content to react-router <Routes>.
//
// URL slugs:
//   /            → HomePage
//   /menu        → MenuPage
//   /favorites   → FavoritesPage
//   /cart        → CartPage
//   /about       → AboutPage
//   /contact     → ContactPage

export default function App() {
  const [loading, setLoading] = useState(true)
  const [fadeout, setFadeout] = useState(false)

  useEffect(() => {
    // Lock scroll when preloader is active
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Set duration for preloader
    const timer = setTimeout(() => {
      setFadeout(true)
      const removeTimer = setTimeout(() => {
        setLoading(false)
      }, 600) // matches CSS transition duration
      return () => clearTimeout(removeTimer)
    }, 1500)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <AuthProvider>
      <CartProvider>
        {loading && (
          <div className={`preloader-overlay ${fadeout ? 'fade-out' : ''}`}>
            <div className="preloader-content">
              <div className="preloader-ring"></div>
              <div className="preloader-logo-container">
                <img className="preloader-logo" src={bobaLogo} alt="Boba District Logo" />
              </div>
              <div className="preloader-text-container">
                <h1 className="preloader-title">Boba District</h1>
                <div className="preloader-progress-track">
                  <div className="preloader-progress-bar"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="app-container">
          {/* Shared header — visible on every page */}
          <Header />

          {/* Auto-scroll to top between routes */}
          <ScrollToTop />

          {/* Page content — routed by URL */}
          <Routes>
            <Route path="/"          element={<HomePage />} />
            <Route path="/menu"      element={<MenuPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart"      element={<CartPage />} />
            <Route path="/about"     element={<AboutPage />} />
            <Route path="/contact"   element={<ContactPage />} />
            <Route path="/login"     element={<LoginPage />} />
            <Route path="/signup"    element={<SignupPage />} />
            <Route path="/profile"   element={<ProfilePage />} />
            {/* Catch-all: redirect unknown paths to home */}
            <Route path="*"          element={<HomePage />} />
          </Routes>

          {/* Shared footer — visible on every page */}
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
