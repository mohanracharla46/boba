import { useState, useEffect } from 'react'
import bgImage from './assets/botanical_cafe_bg.png'
import avatarImage from './assets/avatar.png'
import heroVideo1 from './assets/herovideo1.mp4'
import heroVideo2 from './assets/herovideo2.mp4'
import heroVideo3 from './assets/herovideo3.mp4'
import './App.css'

// Premium brand products menu content
const THEMES = {
  matcha: {
    badge: '🍃 Premium House Blend',
    title: 'Artisanal Brews, Rooted in Nature',
    desc: 'Experience the perfect harmony of traditional Asian tea craft and modern botanical fusion.',
    accent: '#728D56',
    price: '$6.50',
    tagline: 'Earthy Jasmine Rose',
    detail: 'Stone-ground organic green tea whisked with organic jasmine extract and organic rose petals.',
    homeTag: '🍃 Signature Brew'
  },
  oolong: {
    badge: '🍂 Roasted Mountain Oolong',
    title: 'Golden Harvest, Steeped in Heritage',
    desc: 'Discover the deep, rich roasted notes of hand-selected high mountain rock oolong paired with organic stone fruits.',
    accent: '#C17F38',
    price: '$6.75',
    tagline: 'Oolong Lavender Peach',
    detail: 'Slow-roasted Formosa Oolong cold-brewed with lavender flower buds and fresh organic white peach nectar.',
    homeTag: '🔥 Popular Choice'
  },
  sakura: {
    badge: '🌸 Spring Sakura Blossom',
    title: 'Blossom Infusions, Soft as Spring',
    desc: 'Savor the delicate floral notes of freshly harvested cherry blossom petals paired with sweet, crisp tropical fruits.',
    accent: '#C67C8F',
    price: '$7.00',
    tagline: 'Sakura Lychee White Tea',
    detail: 'Fresh spring cherry blossoms cold-infused with sweet red lychee and delicate silver needle white tea.',
    homeTag: '🌸 Seasonal Craft'
  },
  taro: {
    badge: '🔮 Velvet Taro Lavender',
    title: 'Velvet Lavender, Rich & Calming',
    desc: 'Indulge in a smooth, velvety blend of real organic taro root, soothing lavender blossom essence, and chewy boba.',
    accent: '#8A75AC',
    price: '$6.85',
    tagline: 'Taro Lavender Pearl',
    detail: 'Organic mashed taro root blended with wildflower honey, lavender extract, and organic brown sugar tapioca pearls.',
    homeTag: '🔥 Popular Choice'
  }
}

// Background Playlist of video assets
const VIDEO_PLAYLIST = [heroVideo1, heroVideo2, heroVideo3]

function App() {
  // Theme is locked to our beautiful matcha signature brand styling
  const activeTheme = 'matcha'
  
  // State to manage background video playlist
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0)
  
  // Tab control state
  const [activeTab, setActiveTab] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [initialSelectedDrinkId, setInitialSelectedDrinkId] = useState(null)
  
  // Shopping Cart state and handlers
  const [cart, setCart] = useState([])

  const addToCart = (drink, sweetness, iceLevel, addons, selectedFlavor, quantity) => {
    // Generate a unique fingerprint for this customized item
    const activeAddonsList = Object.entries(addons)
      .filter(([_, checked]) => checked)
      .map(([key]) => key)
      .sort()
      .join(',')
    const customKey = `${drink.id}-${sweetness}-${iceLevel}-${activeAddonsList}-${selectedFlavor}`

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.customKey === customKey)
      if (existingIdx > -1) {
        const newCart = [...prevCart]
        newCart[existingIdx].quantity += quantity
        return newCart
      } else {
        return [
          ...prevCart,
          {
            customKey,
            drink,
            sweetness,
            iceLevel,
            addons: { ...addons },
            selectedFlavor,
            quantity
          }
        ]
      }
    })
  }

  const updateCartItemQuantity = (customKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(customKey)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.customKey === customKey ? { ...item, quantity: newQty } : item))
    )
  }

  const removeFromCart = (customKey) => {
    setCart((prevCart) => prevCart.filter((item) => item.customKey !== customKey))
  }

  const clearCart = () => {
    setCart([])
  }

  const handleSteepNow = (themeKey) => {
    const themeToMenuMap = {
      matcha: 'matcha_latte',
      oolong: 'special_blend_black_tea',
      sakura: 'lychee_slush',
      taro: 'taro_milk_tea'
    }
    setInitialSelectedDrinkId(themeToMenuMap[themeKey])
    setActiveTab('menu')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  
  // Set class on document body on mount
  useEffect(() => {
    document.body.className = ''
    document.body.classList.add(`theme-${activeTheme}`)
  }, [])

  // Transition to next video in playlist when one ends
  const handleVideoEnded = () => {
    setCurrentVideoIdx((prevIdx) => (prevIdx + 1) % VIDEO_PLAYLIST.length)
  }


  const currentContent = THEMES[activeTheme]

  return (
    <div className="app-container">
      {/* Premium Header */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} style={{ cursor: 'pointer' }}>
          <svg className="brand-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L2 14c0-2.21 1.79-4 4-4h12c2.21 0 4 1.79 4 4v7H2.01zM19 14c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v5h14v-5zM12 2C9.24 2 7 4.24 7 7c0 .55-.45 1-1 1s-1-.45-1-1c0-3.87 3.13-7 7-7s7 3.13 7 7c0 .55-.45 1-1 1s-1-.45-1-1c0-2.76-2.24-5-5-5z" />
          </svg>
          Boba District
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li className={activeTab === 'home' ? 'active' : ''}><a href="#home" onClick={(e) => { e.preventDefault(); setActiveTab('home'); setIsMobileMenuOpen(false); }}>Home</a></li>
          <li className={activeTab === 'menu' ? 'active' : ''}><a href="#menu" onClick={(e) => { e.preventDefault(); setActiveTab('menu'); setIsMobileMenuOpen(false); }}>Menu</a></li>
          <li className={activeTab === 'favorites' ? 'active' : ''}><a href="#favorites" onClick={(e) => { e.preventDefault(); setActiveTab('favorites'); setIsMobileMenuOpen(false); }}>Favorites</a></li>
          <li className={activeTab === 'about' ? 'active' : ''}><a href="#about" onClick={(e) => { e.preventDefault(); setActiveTab('about'); setIsMobileMenuOpen(false); }}>About Us</a></li>
          <li className={activeTab === 'contact' ? 'active' : ''}><a href="#contact" onClick={(e) => { e.preventDefault(); setActiveTab('contact'); setIsMobileMenuOpen(false); }}>Contact</a></li>
        </ul>

        <div className="nav-actions">
          {/* Order Now CTA button in header */}
          <button className="btn-nav-order" onClick={() => { setActiveTab('menu'); setIsMobileMenuOpen(false); }}>
            Order Now
          </button>

          {/* Cart Icon */}
          <button 
            className={`nav-btn cart-nav-btn ${activeTab === 'cart' ? 'active-tab-cart' : ''}`} 
            aria-label="View Cart" 
            title="Cart"
            onClick={() => { setActiveTab('cart'); setIsMobileMenuOpen(false); }}
            style={{ position: 'relative' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '22px', height: '22px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && (
              <span className="nav-cart-badge">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Login Button */}
          <button className="btn-nav-login" title="Login to account">
            Login
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button 
            className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            title="Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Conditional Rendering of Views */}
      {activeTab === 'home' && (
        <>
          {/* Hero Section Container */}
          <section className="hero-section" id="menu">
            <div className="hero-card">
              {/* Fallback Glass Blur Border */}
              <div className="hero-card-blur"></div>

              {/* Ambient Leaf drifting particles */}
              <div className="leaf-container">
                <span className="leaf"></span>
                <span className="leaf"></span>
                <span className="leaf"></span>
                <span className="leaf"></span>
              </div>

              {/* Sequential Playlist BG Video Player */}
              <div className="hero-bg-media">
                <video
                  key={VIDEO_PLAYLIST[currentVideoIdx]}
                  className="hero-video"
                  src={VIDEO_PLAYLIST[currentVideoIdx]}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                />
              </div>

              {/* Clean Color Blend Mask */}
              <div className="hero-overlay"></div>

              {/* Core Content Box */}
              <div className="hero-content">
                <div className="hero-badge">
                  {currentContent.badge}
                </div>
                
                <h1 className="hero-title">
                  {currentContent.title.split(',')[0]}, <br />
                  <span>{currentContent.title.split(',')[1]?.trim() || ''}</span>
                </h1>

                <p className="hero-desc">
                  {currentContent.desc}
                </p>

                <div className="hero-cta">
                  <button className="btn-primary" onClick={() => document.getElementById('specialties')?.scrollIntoView({ behavior: 'smooth' })}>
                    Order Drink
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                  <button className="btn-secondary" onClick={() => setActiveTab('about')}>
                    View Infusion Chart
                  </button>
                </div>
              </div>


            </div>
          </section>

          {/* Botanical Specialties Section - static product showcase */}
          <section className="specialties-section" id="specialties">
            <div className="section-header">
              <h2 className="section-title">Signature Botanical Infusions</h2>
              <span className="section-subtitle">Browse our organic signature menu and slow-brewed house infusions</span>
            </div>

            <div className="specialty-grid">
              {Object.entries(THEMES).map(([key, item], idx) => (
                <div 
                  key={key}
                  className="specialty-card"
                  onClick={() => handleSteepNow(key)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '8px' }}>
                    <div className="drink-badge-circle">
                      0{idx + 1}
                    </div>
                    <span className={`specialty-type-badge ${item.homeTag.includes('Popular') ? 'badge-popular' : item.homeTag.includes('Seasonal') ? 'badge-seasonal' : 'badge-signature'}`}>
                      {item.homeTag}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                    <h3 className="card-title">{item.tagline}</h3>
                    <p className="card-desc">{item.detail}</p>
                  </div>
                  <div className="card-footer">
                    <span className="card-price">{item.price}</span>
                    <span className="card-action">
                      Steep Now
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Full Menu Button */}
            <div className="specialties-view-more" style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
              <button className="btn-primary" onClick={() => { setActiveTab('menu'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
                Explore Full Menu
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px', width: '18px', height: '18px', transition: 'transform 0.3s ease' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </section>

          {/* Botanical Philosophy Section - Magazine Asymmetrical Editorial Layout */}
          <section className="philosophy-section">
            <div className="philosophy-header-editorial">
              <span className="philosophy-badge-tag">Our Craft</span>
              <h2 className="philosophy-editorial-title">The Art of Slow Steeping</h2>
              <p className="philosophy-editorial-subtitle">
                Brewing artisanal boba is an exercise in time, patience, and absolute botanical precision. Here is how we prepare your cup.
              </p>
            </div>

            <div className="philosophy-editorial-body">
              <div className="philosophy-step-row">
                <div className="philosophy-step-num">01</div>
                <div className="philosophy-step-content">
                  <span className="philosophy-step-tag">🍃 The Harvest</span>
                  <h3 className="philosophy-step-title">Direct-Trade Single Estates</h3>
                  <p className="philosophy-step-text">
                    Our journey begins in the high-elevation mist of Uji, Japan, and the volcanic slopes of Formosa. We skip wholesale brokers entirely, partnering directly with family growers who hand-harvest organic leaves at the absolute peak of their natural botanical steep.
                  </p>
                </div>
              </div>

              <div className="philosophy-step-row alt-row">
                <div className="philosophy-step-num">02</div>
                <div className="philosophy-step-content">
                  <span className="philosophy-step-tag">🌸 The Distillation</span>
                  <h3 className="philosophy-step-title">Fresh Flower Distillates</h3>
                  <p className="philosophy-step-text">
                    Instead of chemical flavour compounds or heavy synthetic syrups, we steam-distill fresh jasmine flowers and lavender blossoms. This pure floral distillate is folded directly into our cold-brewed cream bases, creating an ambient aroma that blooms in the glass.
                  </p>
                </div>
              </div>

              <div className="philosophy-step-row">
                <div className="philosophy-step-num">03</div>
                <div className="philosophy-step-content">
                  <span className="philosophy-step-tag">🔮 The Simmer</span>
                  <h3 className="philosophy-step-title">Forty-Five Minute Tapioca Fire</h3>
                  <p className="philosophy-step-text">
                    We cook our organic brown sugar tapioca pearls in large copper kettles for exactly 45 minutes, then steep them in hot wildflower honey. To guarantee perfect texture, we brew entirely fresh batches every three hours and discard any unused pearl bases.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'menu' && (
        <MenuView 
          initialSelectedDrinkId={initialSelectedDrinkId} 
          clearInitialSelected={() => setInitialSelectedDrinkId(null)} 
          addToCart={addToCart}
        />
      )}

      {activeTab === 'cart' && (
        <CartPage 
          cart={cart} 
          updateQuantity={updateCartItemQuantity} 
          removeItem={removeFromCart} 
          clearCart={clearCart} 
          onExploreMenu={() => setActiveTab('menu')} 
        />
      )}

      {activeTab === 'about' && (
        <AboutPage onBackToMenu={() => setActiveTab('home')} />
      )}

      {activeTab === 'favorites' && (
        <FavoritesPage onExplore={() => setActiveTab('home')} />
      )}

      {activeTab === 'contact' && (
        <ContactPage />
      )}

      {/* Premium Multi-Column Brand Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column brand-col">
            <div className="footer-brand">
              <svg className="brand-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L2 14c0-2.21 1.79-4 4-4h12c2.21 0 4 1.79 4 4v7H2.01zM19 14c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v5h14v-5zM12 2C9.24 2 7 4.24 7 7c0 .55-.45 1-1 1s-1-.45-1-1c0-3.87 3.13-7 7-7s7 3.13 7 7c0 .55-.45 1-1 1s-1-.45-1-1c0-2.76-2.24-5-5-5z" />
              </svg>
              Boba District
            </div>
            <p className="footer-desc">
              Experience the tranquil, healing art of the traditional steep. Wild jasmine, organic matcha, steam-distilled botanicals, and slow-cooked tapioca.
            </p>
            <div className="footer-socials">
              <a href="#instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#twitter" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href="#facebook" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-column links-col">
            <h3 className="footer-col-title">Sanctuary Pages</h3>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); setActiveTab('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Home</a></li>
              <li><a href="#menu" onClick={(e) => { e.preventDefault(); setActiveTab('menu'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Menu</a></li>
              <li><a href="#favorites" onClick={(e) => { e.preventDefault(); setActiveTab('favorites'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Favorites</a></li>
              <li><a href="#cart" onClick={(e) => { e.preventDefault(); setActiveTab('cart'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Shopping Cart</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); setActiveTab('about'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>About Us</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); setActiveTab('contact'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-column hours-col">
            <h3 className="footer-col-title">Brewing Hours</h3>
            <div className="footer-hours">
              <p><span>Monday - Friday</span> 8:00 AM - 9:00 PM</p>
              <p><span>Saturday</span> 9:00 AM - 10:00 PM</p>
              <p><span>Sunday</span> 10:00 AM - 8:00 PM</p>
            </div>
          </div>
          
          <div className="footer-column newsletter-col">
            <h3 className="footer-col-title">Weekly Steeps</h3>
            <p className="newsletter-text">Subscribe to receive organic high tea recipes and physical shop event invitations.</p>
            <form className="footer-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
              <input type="email" placeholder="tea-lover@nature.com" required className="footer-input" />
              <button type="submit" className="footer-form-btn" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Boba District. Steeped in Stillness. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

/* --- About Page Component --- */
/* --- About Page Component --- */
function AboutPage({ onBackToMenu }) {
  return (
    <div className="page-container">
      {/* Manifesto Section */}
      <div className="about-manifesto">
        <span className="about-manifesto-badge">Our Manifesto</span>
        <h1 className="about-manifesto-title">
          A Return to <span>Stillness</span>
        </h1>
        <p className="about-manifesto-lead">
          We built Boba District out of a simple frustration: modern bubble tea had lost its connection to the earth. The bright neon powders, synthetic syrups, and high-fructose compounds of contemporary shops had completely replaced the tranquil, healing art of the traditional steep.
        </p>
        <p className="about-manifesto-body">
          We set out to create a sanctuary. An oasis of sensory calm where high-mountain organic tea leaves meet freshly steam-distilled botanicals. No shortcuts, no artificial additions. Just wild jasmine, sweet rose petals, and slow-cooked tapioca prepared from scratch daily.
        </p>
      </div>

      {/* Asymmetrical Collage Section */}
      <div className="about-collage-section">
        <div className="collage-text-block">
          <span className="collage-num">01</span>
          <h2 className="collage-block-title">Direct-Trade Estates</h2>
          <p className="collage-block-text">
            Our search for the perfect leaf led us to family-run estates in Uji, Japan, and the high-elevation valleys of Formosa. By dealing directly with growers who practice biological polyculture, we ensure that every leaf is harvested ethically, chemical-free, and at the absolute peak of its natural flavor.
          </p>
        </div>
        <div className="collage-image-block">
          <img src={bgImage} alt="Serene tea room table" className="collage-img" />
          <div className="collage-floating-tag">Direct Farm Trade</div>
        </div>
      </div>

      {/* Philosophy Callout Quote */}
      <div className="philosophy-quote-block">
        <div className="quote-marks">“</div>
        <blockquote className="philosophy-quote">
          Tea is not a beverage. It is a bridge between the botanical world and human stillness.
        </blockquote>
        <cite className="philosophy-cite">— Master Brewer Chen</cite>
      </div>

      {/* The Daily Ritual Timeline */}
      <div className="ritual-section">
        <h2 className="ritual-section-title">Our Daily Ritual</h2>
        <p className="ritual-section-subtitle">Crafting the daily infusion requires unwavering time and botanical precision. Here is how we prepare your cup every single day.</p>
        
        <div className="ritual-timeline">
          <div className="timeline-item">
            <div className="timeline-time">05:00 AM</div>
            <div className="timeline-dot-connector"></div>
            <div className="timeline-content">
              <h3 className="timeline-title">The Sorting</h3>
              <p className="timeline-text">Our brewers arrive before sunrise to hand-select and inspect the organic stone-ground green leaves, discarding any that do not meet our grading standards.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-time">08:00 AM</div>
            <div className="timeline-dot-connector"></div>
            <div className="timeline-content">
              <h3 className="timeline-title">Steam Distillation</h3>
              <p className="timeline-text">We steam-distill fresh jasmine flowers and lavender buds. This floral distillate is infused directly into our fresh cold-brewed milk bases to create a natural, ambient scent.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-time">11:00 AM</div>
            <div className="timeline-dot-connector"></div>
            <div className="timeline-content">
              <h3 className="timeline-title">Tapioca Fire</h3>
              <p className="timeline-text">We cook our organic brown sugar tapioca pearls from scratch in large copper kettles. They boil for precisely 45 minutes, then rest in hot honey syrup to achieve their signature chew.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-time">02:00 PM</div>
            <div className="timeline-dot-connector"></div>
            <div className="timeline-content">
              <h3 className="timeline-title">Fresh Batches</h3>
              <p className="timeline-text">To guarantee absolute freshness, we discard any unused tea bases and cooked tapioca pearls every three hours, whisking and brewing entirely fresh batches in real-time.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Minimalist Editorial CTA */}
      <div className="about-editorial-cta">
        <div className="cta-border-line"></div>
        <div className="cta-flex-row">
          <h2 className="cta-editorial-heading">Ready to Experience <br />the Sanctuary?</h2>
          <button className="btn-primary" onClick={onBackToMenu}>
            Explore the Menu
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px', width: '18px', height: '18px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

/* --- Favorites Page Component --- */
function FavoritesPage({ onExplore }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Botanical Sanctuary</h1>
        <p className="page-subtitle">Your personally selected, highly curated menu choices saved for quick steeping.</p>
      </div>

      <div className="favorites-grid">
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
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }} onClick={onExplore}>
              Steep Now
            </button>
          </div>
        </div>

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
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }} onClick={onExplore}>
              Steep Now
            </button>
          </div>
        </div>

        <div className="favorite-card" style={{ borderStyle: 'dashed', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '12px' }}>
          <div className="value-icon-circle" style={{ width: '56px', height: '56px' }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <h3 className="value-card-title" style={{ fontSize: '18px' }}>Add More Signatures</h3>
          <p className="value-card-desc" style={{ fontSize: '13px', maxWidth: '200px' }}>Save your next favorite botanical infusion from our specialties catalog.</p>
          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px', marginTop: '8px' }} onClick={onExplore}>
            Browse Menu
          </button>
        </div>
      </div>
    </div>
  )
}

/* --- Contact Page Component --- */
function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Find Our Tea House</h1>
        <p className="page-subtitle">Visit our physical space, send us a question, or let us curate your next high tea.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-column">
          <div className="contact-card-box">
            <div className="contact-info-item">
              <div className="contact-icon-wrapper">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div className="contact-info-text">
                <span className="contact-info-label">Address</span>
                <span className="contact-info-value">77 Botanical Lane, Blossom Estate, NY 10012</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-wrapper">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div className="contact-info-text">
                <span className="contact-info-label">Steep Hotline</span>
                <span className="contact-info-value">+1 (555) 777-BOBA</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-wrapper">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="contact-info-text">
                <span className="contact-info-label">E-Mail Address</span>
                <span className="contact-info-value">hello@bobabotanicals.com</span>
              </div>
            </div>
          </div>

          <div className="contact-card-box opening-hours-box">
            <h2 className="opening-hours-title">Brewing Hours</h2>
            <div className="hours-row">
              <span className="hours-day">Monday - Friday</span>
              <span className="hours-time">8:00 AM - 9:00 PM</span>
            </div>
            <div className="hours-row">
              <span className="hours-day">Saturday</span>
              <span className="hours-time">9:00 AM - 10:00 PM</span>
            </div>
            <div className="hours-row">
              <span className="hours-day">Sunday</span>
              <span className="hours-time">10:00 AM - 8:00 PM</span>
            </div>
          </div>
        </div>

        <div className="contact-form-box">
          <h2 className="contact-form-title">Send a Botanical Request</h2>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
              <div className="value-icon-circle" style={{ width: '72px', height: '72px', backgroundColor: 'var(--primary-color)', color: '#FFF' }}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="value-card-title">Message Received!</h3>
              <p className="value-card-desc" style={{ maxWidth: '280px' }}>Your message has been whisked to our tea craftspeople. We will reply to your inbox within 24 hours.</p>
              <button className="btn-secondary" style={{ marginTop: '16px' }} onClick={() => setSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" required placeholder="Sip Master" />
                </div>
                <div className="form-group">
                  <label className="form-label">E-Mail</label>
                  <input type="email" className="form-input" required placeholder="sip@nature.com" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input type="text" className="form-input" required placeholder="Infusion Query" />
              </div>
              <div className="form-group">
                <label className="form-label">Your message</label>
                <textarea className="form-textarea" required placeholder="Tell us how you would like to customize your boba buds..."></textarea>
              </div>
              <button type="submit" className="btn-form-submit">
                Whisk Message
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

/* --- Cart Page Component --- */
function CartPage({ cart, updateQuantity, removeItem, clearCart, onExploreMenu }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  // Calculations
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
    setTimeout(() => {
      setIsCheckingOut(false)
      setCheckoutSuccess(true)
    }, 1500)
  }

  const handleCloseSuccess = () => {
    setCheckoutSuccess(false)
    clearCart()
    onExploreMenu()
  }

  if (cart.length === 0) {
    return (
      <div className="page-container">
        <div className="cart-empty-state" style={{ textAlign: 'center', padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div className="cart-empty-icon-wrapper" style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '40px', height: '40px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h1 className="page-title" style={{ fontSize: '32px' }}>Your Sanctuary is Empty</h1>
          <p className="page-subtitle" style={{ maxWidth: '400px', marginInline: 'auto' }}>
            It seems you haven't added any slow-brewed signature teas to your cart yet. Let's explore our botanicals!
          </p>
          <button className="btn-primary" onClick={onExploreMenu} style={{ marginTop: '16px' }}>
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
        {/* Left Column: Cart Items list */}
        <div className="cart-items-column">
          {cart.map((item) => {
            const addonCost = 
              (item.addons.boba ? 0.50 : 0) + 
              (item.addons.jellyMix ? 0.50 : 0) + 
              (item.addons.lycheeJelly ? 0.50 : 0) + 
              (item.addons.mangoJelly ? 0.50 : 0) + 
              (item.addons.poppingBoba ? 0.50 : 0)
            const flavorCost = item.selectedFlavor !== 'None' ? 0.50 : 0
            const itemPrice = item.drink.price + addonCost + flavorCost
            const activeAddons = Object.entries(item.addons)
              .filter(([_, checked]) => checked)
              .map(([key]) => key === 'jellyMix' ? 'Jelly Mix' : key === 'lycheeJelly' ? 'Lychee Jelly' : key === 'mangoJelly' ? 'Mango Jelly' : key === 'poppingBoba' ? 'Popping Boba' : 'Boba')

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
                  
                  {/* Selected Options Badges */}
                  <div className="cart-item-options-list">
                    <span className="option-badge">🌿 {item.sweetness} Sweet</span>
                    <span className="option-badge">🧊 {item.iceLevel} Ice</span>
                    {item.selectedFlavor !== 'None' && (
                      <span className="option-badge">✨ {item.selectedFlavor} Flavor</span>
                    )}
                    {activeAddons.length > 0 && (
                      <span className="option-badge">➕ Addons: {activeAddons.join(', ')}</span>
                    )}
                  </div>

                  <div className="cart-item-actions-row">
                    {/* Quantity controls */}
                    <div className="quantity-controls" style={{ padding: '4px 12px' }}>
                      <button className="quantity-btn" onClick={() => updateQuantity(item.customKey, item.quantity - 1)}>−</button>
                      <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '14px', minWidth: '14px', textAlign: 'center' }}>{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => updateQuantity(item.customKey, item.quantity + 1)}>+</button>
                    </div>

                    {/* Remove button */}
                    <button className="cart-remove-btn" onClick={() => removeItem(item.customKey)} aria-label="Remove item" title="Remove Item">
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

        {/* Right Column: Checkout receipt summary */}
        <div className="cart-summary-column">
          <div className="cart-receipt-card">
            <h2 className="receipt-title">Order Summary</h2>
            <div className="receipt-divider"></div>
            
            <div className="receipt-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="receipt-row">
              <span>Squeezed Sales Tax (8.25%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="receipt-divider dotted"></div>

            <div className="receipt-row total-row">
              <span>Total Cost</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button 
              className={`btn-add-to-order checkout-submit-btn ${isCheckingOut ? 'loading' : ''}`} 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              style={{ marginTop: '24px', justifyContent: 'center' }}
            >
              {isCheckingOut ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="animate-spin" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" fill="none" opacity="0.25" />
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.0434 16.4528" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Steeping Order...
                </>
              ) : (
                <>
                  Reserve for Pickup
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px', width: '18px', height: '18px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </>
              )}
            </button>

            <div className="checkout-badge-guarantee">
              🍃 Direct Pick-Up: Ready in 15 Minutes
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Success Modal Overlay */}
      {checkoutSuccess && (
        <div className="mobile-drawer-overlay success-modal-overlay" onClick={handleCloseSuccess}>
          <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="success-modal-title">Steep Reserved!</h2>
            <p className="success-modal-number">Order Ref: <strong>#BD-{Math.floor(Math.random() * 8999 + 1000)}</strong></p>
            
            <div className="success-modal-divider"></div>
            
            <div className="success-modal-detail">
              <p>Your slow-brewed botanical custom infusions are being prepared in our kettles.</p>
              <div className="success-pickup-timeline">
                ⏱️ <strong>Pickup Time:</strong> Ready in 15 mins (at 77 Botanical Lane)
              </div>
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

/* --- Brand Menu Items Dataset --- */
const MENU_ITEMS = [
  // SMOOTHIES (5.95)
  {
    id: 'mango_lassi_smoothie',
    name: 'Mango Lassi Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Creamy blend of sweet organic mangoes and fresh cold yogurt.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'strawberry_banana_smoothie',
    name: 'Strawberry Banana Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'A classic rich fusion of fresh organic strawberries and sweet ripe bananas.',
    image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'matcha_green_tea_smoothie',
    name: 'Matcha Green Tea Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Ceremonial stone-ground green tea whisked and blended into a cold creamy base.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'taro_smoothie',
    name: 'Taro Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Rich, velvet blend of real organic purple taro root with sweet creamy milk.',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'oreo_smoothie',
    name: 'Oreo Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Indulgent, creamy blend loaded with crushed Oreo cookies and sweet vanilla cream.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'honeydew_smoothie',
    name: 'Honeydew Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Refreshing and sweet blend of ripe, sweet honeydew melon and fresh milk base.',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1ebb846d?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'thai_tea_smoothie',
    name: 'Thai Tea Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Spiced sweet Thai tea leaves slow-infused and blended into a creamy smoothie.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },

  // SLUSHES (5.95)
  {
    id: 'pina_colada_slush',
    name: 'Pina Colada Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Tropical icy slush of sweet golden pineapple nectar and rich coconut milk.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'lychee_slush',
    name: 'Lychee Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Fragrant and sweet cold-blended tropical lychee fruit slush.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'passionfruit_slush',
    name: 'Passionfruit Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Tangy and sweet cold-infused tropical purple passionfruit pulp slush.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'peach_slush',
    name: 'Peach Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Refreshing sweet icy slush crafted from fresh hand-picked ripe white peaches.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'mango_slush',
    name: 'Mango Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Ice-blended pure sweet mango nectar slush for a refreshing tropical escape.',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'pineapple_slush',
    name: 'Pineapple Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Chilled and refreshing gold pineapple juice ice-blended slush.',
    image: 'https://images.unsplash.com/photo-1628258334864-3fdb1c4de6bc?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },

  // CLASSIC TEA (5.25)
  {
    id: 'special_blend_black_tea',
    name: 'Special Blend Black Tea',
    price: 5.25,
    category: 'Classic Tea',
    desc: 'Slow-steeped signature high-mountain black tea leaves with a bold, rich aroma.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },

  // MILK TEA (5.25)
  {
    id: 'tiger_brown_sugar_milk_tea',
    name: 'Tiger Brown Sugar Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Creamy milk tea drizzled with caramel-like house brown sugar syrup stripes.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'classic_milk_tea',
    name: 'Classic Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Traditional high-mountain black milk tea brewed to rich, smooth perfection.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'thai_milk_tea',
    name: 'Thai Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Sweet, spiced orange Thai black tea topped with rich, creamy milk layer.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'chai_milk_tea',
    name: 'Chai Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Exotic blend of robust black tea leaves, warm aromatic spices, and cream.',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc5c1a61cff?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'taro_milk_tea',
    name: 'Taro Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Sweet, velvety smooth milk tea infused with sweet organic purple taro root.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'honeydew_milk_tea',
    name: 'Honeydew Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Refreshing sweet blend of ripe, aromatic honeydew melon and classic milk tea.',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1ebb846d?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'chocolate_milk_tea',
    name: 'Chocolate Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Rich, smooth milk tea infused with decadent organic cocoa and dark chocolate.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'dark_roast_coffee',
    name: 'Dark Roast Coffee',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Decadent slow-dripped bold espresso blended with sweet, creamy dairy.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },

  // LEMONADES (5.25)
  {
    id: 'ice_cold_lemonade',
    name: 'Ice Cold Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'Traditional freshly squeezed tart organic lemons sweetened with pure cane sugar.',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'mango_lemonade',
    name: 'Mango Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'Sweet, tropical Alphonso mango nectar mixed with our signature fresh lemonade.',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'strawberry_lemonade',
    name: 'Strawberry Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'A vibrant sweet blend of fresh organic strawberry puree and refreshing lemonade.',
    image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'peach_lemonade',
    name: 'Peach Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'Juicy summer peach nectar blended with a refreshing, tart squeezed lemonade base.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'passionfruit_lemonade',
    name: 'Passionfruit Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'Fragrant tropical purple passionfruit pulp combined with chilled fresh lemonade.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'pineapple_lemonade',
    name: 'Pineapple Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'Sweet golden pineapple nectar combined with tart fresh hand-squeezed lemonade.',
    image: 'https://images.unsplash.com/photo-1628258334864-3fdb1c4de6bc?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },

  // MATCHA SPECIALS (5.95)
  {
    id: 'matcha_latte',
    name: 'Matcha Latte',
    price: 5.95,
    category: 'Matcha Specials',
    desc: 'Ceremonial green tea green tea whisked with creamy organic milk.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'matcha_lemonade',
    name: 'Matcha Lemonade',
    price: 5.95,
    category: 'Matcha Specials',
    desc: 'Fragrant organic green tea layered with tart, freshly squeezed iced lemonade.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'matcha_mango',
    name: 'Matcha Mango',
    price: 5.95,
    category: 'Matcha Specials',
    desc: 'Tropical layered drink combining sweet mango nectar and ceremonial green matcha.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'matcha_strawberry',
    name: 'Matcha Strawberry',
    price: 5.95,
    category: 'Matcha Specials',
    desc: 'Premium green tea layers floating above sweet organic strawberries and cold milk.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },

  // SEA SALT CREME (5.95)
  {
    id: 'milk_tea_creme',
    name: 'Milk Tea w/ Crème de Sea Salt',
    price: 5.95,
    category: 'Sea Salt Creme',
    desc: 'Signature robust milk tea topped with our dense, salty sea salt cream foam.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'chai_tea_creme',
    name: 'Chai Tea w/ Crème de Sea Salt',
    price: 5.95,
    category: 'Sea Salt Creme',
    desc: 'Rich, spiced chai tea layered beneath our signature savory velvet sea salt cream.',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc5c1a61cff?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'thai_tea_creme',
    name: 'Thai Tea w/ Crème de Sea Salt',
    price: 5.95,
    category: 'Sea Salt Creme',
    desc: 'Sweet orange spiced Thai tea topped with a luxurious cap of salty velvet sea salt foam.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'dark_coffee_creme',
    name: 'Dark Coffee w/ Crème de Sea Salt',
    price: 5.95,
    category: 'Sea Salt Creme',
    desc: 'Decadent slow-dripped bold iced coffee topped with sweet and salty sea salt cream layers.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  }
]

const MENU_CATEGORIES = [
  'All Brews',
  'Smoothies',
  'Slushes',
  'Classic Tea',
  'Milk Tea',
  'Lemonades',
  'Matcha Specials',
  'Sea Salt Creme'
]

/* --- MenuView Page Component --- */
function MenuView({ initialSelectedDrinkId, clearInitialSelected, addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All Brews')
  const [selectedDrink, setSelectedDrink] = useState(MENU_ITEMS[0])
  const [sweetness, setSweetness] = useState('Half')
  const [iceLevel, setIceLevel] = useState('Regular')
  const [addons, setAddons] = useState({
    boba: true,
    jellyMix: false,
    lycheeJelly: false,
    mangoJelly: false,
    poppingBoba: false
  })
  const [selectedFlavor, setSelectedFlavor] = useState('None')
  const [quantity, setQuantity] = useState(1)
  const [showMobileDrawer, setShowMobileDrawer] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    if (initialSelectedDrinkId) {
      const targetItem = MENU_ITEMS.find(item => item.id === initialSelectedDrinkId)
      if (targetItem) {
        setSelectedDrink(targetItem)
        setSelectedCategory(targetItem.category)
        if (window.innerWidth < 1024) {
          setShowMobileDrawer(true)
        }
      }
      clearInitialSelected()
    }
  }, [initialSelectedDrinkId])

  const [searchQuery, setSearchQuery] = useState('')

  // Filter items based on active category and search query
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All Brews' || item.category === selectedCategory
    const matchesSearch = searchQuery.trim() === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    
    return matchesCategory && matchesSearch
  })

  // Calculate dynamic customization total cost
  const addonCost = 
    (addons.boba ? 0.50 : 0) + 
    (addons.jellyMix ? 0.50 : 0) + 
    (addons.lycheeJelly ? 0.50 : 0) + 
    (addons.mangoJelly ? 0.50 : 0) + 
    (addons.poppingBoba ? 0.50 : 0)
  
  const flavorCost = selectedFlavor !== 'None' ? 0.50 : 0
  const totalCost = ((selectedDrink.price + addonCost + flavorCost) * quantity).toFixed(2)

  // Handle drink choice selection
  const handleSelectDrink = (drink) => {
    setSelectedDrink(drink)
    // Preset standard add-on sets
    setSweetness('Half')
    setIceLevel('Regular')
    setAddons({
      boba: drink.category === 'Milk Tea' || drink.id === 'special_blend_black_tea',
      jellyMix: false,
      lycheeJelly: false,
      mangoJelly: false,
      poppingBoba: false
    })
    setSelectedFlavor('None')
    setQuantity(1)
  }

  // Handle item add submission
  const handleAddToOrder = () => {
    if (addToCart) {
      addToCart(selectedDrink, sweetness, iceLevel, addons, selectedFlavor, quantity)
    }
    setToastMsg(`${selectedDrink.name} added to cart!`)
    setShowMobileDrawer(false)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // Helper render for customization panel
  const renderCustomizationPanel = () => (
    <>
      <div className="custom-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
        <div>
          <h2 className="favorite-card-title" style={{ fontSize: '24px', margin: 0 }}>{selectedDrink.name}</h2>
          <p className="favorite-card-desc" style={{ fontSize: '13px', marginTop: '6px', lineHeight: '1.4' }}>{selectedDrink.desc}</p>
        </div>
        <span className="favorite-price" style={{ fontSize: '20px', marginLeft: '12px' }}>${selectedDrink.price.toFixed(2)}</span>
      </div>

      <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span className="custom-section-title">Sweetness Level</span>
        <div className="custom-btn-group">
          {['Regular', 'Half', 'Little'].map(level => (
            <button
              key={level}
              className={`custom-btn ${sweetness === level ? 'active' : ''}`}
              onClick={() => setSweetness(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
        <span className="custom-section-title">Ice Level</span>
        <div className="custom-btn-group">
          {['Regular', 'Half', 'Little'].map(level => (
            <button
              key={level}
              className={`custom-btn ${iceLevel === level ? 'active' : ''}`}
              onClick={() => setIceLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Black Tea Flavor Selector */}
      {selectedDrink.id === 'special_blend_black_tea' && (
        <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          <span className="custom-section-title">Add Flavor (+$0.50)</span>
          <div className="custom-btn-group" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {['None', 'Lychee', 'Passion Fruit', 'Peach', 'Mango', 'Strawberry'].map(flavor => (
              <button
                key={flavor}
                className={`custom-btn ${selectedFlavor === flavor ? 'active' : ''}`}
                onClick={() => setSelectedFlavor(flavor)}
                style={{ padding: '8px 2px', fontSize: '11px', whiteSpace: 'nowrap' }}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add-ons Checklist */}
      <div className="custom-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
        <span className="custom-section-title">Add-Ons (+$0.50)</span>
        {[
          { key: 'boba', name: 'Boba' },
          { key: 'jellyMix', name: 'Jelly Mix' },
          { key: 'lycheeJelly', name: 'Lychee Jelly' },
          { key: 'mangoJelly', name: 'Mango Jelly' },
          { key: 'poppingBoba', name: 'Popping Boba' }
        ].map(addon => (
          <div className="addon-row" key={addon.key}>
            <label className="addon-label-side">
              <input 
                type="checkbox" 
                checked={addons[addon.key]} 
                onChange={(e) => setAddons({ ...addons, [addon.key]: e.target.checked })}
                style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              {addon.name}
            </label>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+0.50</span>
          </div>
        ))}
      </div>

      <div className="quantity-selector-row">
        <span className="custom-section-title" style={{ margin: 0 }}>Quantity</span>
        <div className="quantity-controls">
          <button className="quantity-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
          <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '15px', minWidth: '16px', textAlign: 'center' }}>{quantity}</span>
          <button className="quantity-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
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
      {/* Toast Notification */}
      {toastMsg && (
        <div className="toast-notification" style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          backgroundColor: 'var(--primary-color)',
          color: '#FFF',
          padding: '16px 28px',
          borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(var(--primary-rgb), 0.3)',
          fontWeight: '700',
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 100,
          animation: 'fadeIn 0.3s ease forwards'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {toastMsg}
        </div>
      )}

      {/* Premium Search Banner Bar */}
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
            <button className="menu-search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear Search">
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="menu-view-container">
        {/* Left Sidebar filters - responsive */}
        <div className="menu-sidebar-left">
          <span className="custom-section-title" style={{ paddingLeft: '12px', marginBottom: '4px' }}>Categories</span>
          {MENU_CATEGORIES.map(category => (
            <button
              key={category}
              className={`filter-pill-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Center products catalog grid */}
        <div className="menu-products-column">
          {filteredItems.length === 0 ? (
            <div className="menu-empty-state">
              <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 10l4 4m0-4l-4 4" />
              </svg>
              <h3 className="empty-state-title">No Infusions Found</h3>
              <p className="empty-state-desc">We couldn't find any infusions matching "{searchQuery}" under the category "{selectedCategory}". Try updating your query or choosing a different filter.</p>
              <button className="btn-secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('All Brews'); }} style={{ marginTop: '12px' }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="menu-products-grid">
              {filteredItems.map(item => (
                <div 
                  key={item.id}
                  className={`product-menu-card ${selectedDrink.id === item.id ? 'active-highlight' : ''}`}
                  onClick={() => {
                    handleSelectDrink(item)
                    setShowMobileDrawer(true)
                  }}
                >
                  <div className="product-img-wrapper">
                    <img src={item.image} alt={item.name} className="product-card-img" />
                    {item.tags.map(tag => (
                      <span key={tag} className="product-tag-badge">{tag}</span>
                    ))}
                  </div>
                  <div className="product-name-row">
                    <h3 className="product-card-title">{item.name}</h3>
                    <span className="product-card-price">${item.price.toFixed(2)}</span>
                  </div>
                  <button 
                    className="btn-customize-add"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectDrink(item)
                      setShowMobileDrawer(true)
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Customize & Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Customization Modal Popup overlay */}
      {showMobileDrawer && (
        <div className="mobile-drawer-overlay" onClick={() => setShowMobileDrawer(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-close-bar" onClick={() => setShowMobileDrawer(false)}>
              <span className="drawer-close-indicator"></span>
            </div>
            {renderCustomizationPanel()}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
