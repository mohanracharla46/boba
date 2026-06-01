/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { isLoggedIn, user, updateUser } = useAuth()

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [sweetness, setSweetness] = useState(user?.defaultSweetness || 'Half')
  const [iceLevel, setIceLevel] = useState(user?.defaultIce || 'Regular')
  const [favoriteTheme, setFavoriteTheme] = useState(user?.favoriteTheme || 'Matcha Green')
  const [toastMsg, setToastMsg] = useState('')
  const [activeView, setActiveView] = useState('security') // 'security' | 'orders' | 'membership' | 'preferences' | 'themes' | 'help'

  // Stateful support ticket data
  const [tickets, setTickets] = useState([
    {
      id: 'TCKT-8392',
      category: 'Order Issue',
      subject: 'Jasmine Peach surcharges incorrect',
      message: 'I was charged twice for the Lychee Jelly toppings on my Jasmine Peach tea pickup last Sunday.',
      urgency: 'Medium',
      status: 'Resolved',
      date: 'May 24, 2026',
      response: 'Surcharge error identified and refunded back to your payment account. Please allow 2-3 business days for it to appear.'
    },
    {
      id: 'TCKT-9421',
      category: 'Other',
      subject: 'Oolong theme is highly appealing',
      message: 'The Oolong theme visuals look gorgeous. Thank you so much!',
      urgency: 'Low',
      status: 'Open',
      date: 'May 26, 2026',
      response: null
    }
  ])
  const [expandedTicketId, setExpandedTicketId] = useState(null)
  const [ticketCategory, setTicketCategory] = useState('Order Issue')
  const [ticketSubject, setTicketSubject] = useState('')
  const [ticketMessage, setTicketMessage] = useState('')
  const [ticketUrgency, setTicketUrgency] = useState('Medium')

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setSweetness(user.defaultSweetness || 'Half')
      setIceLevel(user.defaultIce || 'Regular')
      setFavoriteTheme(user.favoriteTheme || 'Matcha Green')
    }
  }, [user])

  if (!isLoggedIn || !user) {
    return null
  }

  const handleSaveChanges = (e) => {
    e.preventDefault()
    updateUser({
      name,
      email,
      defaultSweetness: sweetness,
      defaultIce: iceLevel,
      favoriteTheme
    })

    // Update dynamic body class theme if user changed favoriteTheme
    document.body.className = ''
    const map = {
      'Matcha Green': 'theme-matcha',
      'Oolong Gold': 'theme-oolong',
      'Sakura Blossom': 'theme-sakura',
      'Taro Lavender': 'theme-taro'
    }
    document.body.classList.add(map[favoriteTheme] || 'theme-matcha')

    setToastMsg('Sanctuary settings updated successfully!')
    setTimeout(() => setToastMsg(''), 3000)
  }

  const handleRaiseTicket = (e) => {
    e.preventDefault()
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      return
    }

    const newTicket = {
      id: 'TCKT-' + Math.floor(1000 + Math.random() * 9000),
      category: ticketCategory,
      subject: ticketSubject.trim(),
      message: ticketMessage.trim(),
      urgency: ticketUrgency,
      status: 'Open',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      response: null
    }

    setTickets((prev) => [newTicket, ...prev])
    setTicketSubject('')
    setTicketMessage('')
    setTicketUrgency('Medium')
    setTicketCategory('Order Issue')
    
    setToastMsg('Support ticket raised successfully!')
    setTimeout(() => setToastMsg(''), 3000)
  }

  const orderHistory = [
    {
      id: 'STEEP-98214',
      date: 'May 24, 2026',
      items: ['Signature Matcha Latte (x1)', 'Lychee Slush (x2)'],
      total: '$20.50',
      status: 'Steeped & Picked Up'
    },
    {
      id: 'STEEP-97451',
      date: 'May 12, 2026',
      items: ['Earthy Jasmine Rose (x1)'],
      total: '$6.50',
      status: 'Steeped & Picked Up'
    },
    {
      id: 'STEEP-95412',
      date: 'April 28, 2026',
      items: ['Taro Milk Tea (x2)', 'Special Blend Black Tea (x1)'],
      total: '$21.00',
      status: 'Steeped & Picked Up'
    }
  ]

  const navItems = [
    {
      key: 'security',
      label: 'Login & Security',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      key: 'orders',
      label: 'Your Infusions',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      key: 'membership',
      label: 'Sanctuary Rewards',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      key: 'preferences',
      label: 'Tea Customization',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      key: 'themes',
      label: 'Sanctuary Themes',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      key: 'help',
      label: 'Support Tickets',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ]

  return (
    <div className="page-container">
      {/* Toast notification */}
      {toastMsg && (
        <div className="toast-notification" style={{ position: 'fixed', bottom: '32px', right: '32px', backgroundColor: 'var(--primary-color)', color: '#FFF', padding: '16px 28px', borderRadius: '16px', boxShadow: '0 12px 32px rgba(var(--primary-rgb), 0.3)', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 100, animation: 'fadeIn 0.3s ease forwards' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {toastMsg}
        </div>
      )}

      {/* Profile Header */}
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <h1 className="page-title">Your Account Sanctuary</h1>
        <p className="page-subtitle">Manage details, customized infusions, rewards cards, and visual color styles.</p>
      </div>

      <div className="profile-sidebar-layout">
        {/* Left Column: Sidebar menu list */}
        <aside className="profile-navigation-sidebar">
          {/* User Card */}
          <div className="sidebar-user-card">
            <div className="sidebar-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="sidebar-username">{user.name}</h3>
            <span className="sidebar-membership-badge">Gold Steep Member</span>
          </div>

          <div className="sidebar-divider" />

          {/* Navigation Links */}
          <nav className="sidebar-nav-menu">
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`sidebar-nav-item ${activeView === item.key ? 'active' : ''}`}
                onClick={() => setActiveView(item.key)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Column: Active Content Panel */}
        <main className="profile-active-content">
          {activeView === 'orders' && (
            <div className="profile-panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 className="favorite-card-title" style={{ fontSize: '22px', margin: 0 }}>Steeping Order History</h3>
                <p className="favorite-card-desc" style={{ fontSize: '13.5px', marginTop: '6px' }}>Review your previous slow-brewed house infusions and botanical pick-up records.</p>
              </div>

              <div className="order-history-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {orderHistory.map((order) => (
                  <div className="order-history-card" key={order.id} style={{ border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px', backgroundColor: 'var(--bg-color)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <span className="profile-info-val" style={{ fontSize: '16px', display: 'block' }}>{order.id}</span>
                        <span className="profile-info-label" style={{ fontSize: '12px', display: 'block', marginTop: '2px' }}>Ordered on {order.date}</span>
                      </div>
                      <span className="favorite-badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)' }}>{order.status}</span>
                    </div>

                    <div className="dropdown-divider" style={{ borderBottom: '1px dashed var(--border-color)', height: 0, margin: 0 }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {order.items.map((item, idx) => (
                        <span key={idx} style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{item}</span>
                      ))}
                    </div>

                    <div className="dropdown-divider" style={{ borderBottom: '1px dashed var(--border-color)', height: 0, margin: 0 }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary-color)' }}>{order.total}</span>
                      <button
                        className="btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '12px' }}
                        onClick={() => {
                          alert('Simulating reorder: Items added to order basket!');
                          navigate('/cart');
                        }}
                      >
                        Re-Steep Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'security' && (
            <div className="profile-panel-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h3 className="favorite-card-title" style={{ fontSize: '20px', marginBottom: '8px' }}>Login & Security</h3>
              <p className="favorite-card-desc" style={{ fontSize: '13.5px', marginBottom: '24px' }}>Edit your botanical sanctuary name and registered email details below.</p>
              <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-primary auth-submit-btn" style={{ marginTop: '12px' }}>
                  Save Account Changes
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </form>
            </div>
          )}

          {activeView === 'membership' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
              {/* Virtual Glassmorphic Member Card */}
              <div className="virtual-member-card">
                <div className="virtual-card-glass-glow" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                  <div>
                    <span className="virtual-card-brand">Boba District</span>
                    <span className="virtual-card-tier">GOLD STEEP MEMBER</span>
                  </div>
                  <div className="virtual-card-chip">
                    <svg viewBox="0 0 24 24" fill="var(--primary-color)" style={{ width: '32px', height: '32px', opacity: 0.8 }}>
                      <rect x="3" y="6" width="18" height="12" rx="2" />
                      <line x1="8" y1="6" x2="8" y2="18" stroke="#FFF" strokeWidth="1.5" />
                      <line x1="16" y1="6" x2="16" y2="18" stroke="#FFF" strokeWidth="1.5" />
                      <line x1="3" y1="12" x2="21" y2="12" stroke="#FFF" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

                <div style={{ marginTop: '48px', position: 'relative', zIndex: 2 }}>
                  <div className="virtual-card-holder-label">Sanctuary Patron</div>
                  <div className="virtual-card-holder-name">{user.name}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '24px', position: 'relative', zIndex: 2 }}>
                  <div>
                    <div className="virtual-card-holder-label">Sanctuary Joined</div>
                    <div className="virtual-card-holder-val">{user.joinedDate}</div>
                  </div>
                  <div>
                    <div className="virtual-card-holder-label">Gold QR Code Slip</div>
                    {/* Simulated barcode for store scanners */}
                    <div className="virtual-card-barcode" style={{ padding: '6px 12px', backgroundColor: '#FFF', borderRadius: '8px', display: 'flex', gap: '2px', height: '32px', alignItems: 'center' }}>
                      {[4, 2, 8, 1, 6, 2, 4, 1, 8, 2, 6, 4, 1, 2, 6, 8, 2, 4].map((w, idx) => (
                        <div key={idx} style={{ backgroundColor: '#000', width: `${w}px`, height: '20px' }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Privilege List */}
              <div className="profile-panel-card">
                <h3 className="favorite-card-title" style={{ fontSize: '20px', marginBottom: '8px' }}>Your Gold Tier Perks</h3>
                <p className="favorite-card-desc" style={{ fontSize: '13.5px', marginBottom: '20px' }}>You enjoy high mountain teas and custom perks in our tea house.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="profile-info-row" style={{ padding: '12px 0', borderBottom: '1px dashed var(--border-color)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '20px' }}>⚡</span>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '15px' }}>Free Double Toppings</strong>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Add two ingredients (e.g. grass jelly, popping pearls) on any premium recipe at no extra charge.</span>
                    </div>
                  </div>
                  <div className="profile-info-row" style={{ padding: '12px 0', borderBottom: '1px dashed var(--border-color)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '20px' }}>🎁</span>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '15px' }}>Birthday Infusion Reward</strong>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Receive one slow-brewed infusion of your choice during your birthday month, ready for pick up.</span>
                    </div>
                  </div>
                  <div className="profile-info-row" style={{ padding: '12px 0', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '20px' }}>⏱️</span>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '15px' }}>Express Counter Checkout</strong>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Scan your virtual Gold Barcode at our physical counter terminal for skip-the-line pickup priority.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'preferences' && (
            <div className="profile-panel-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h3 className="favorite-card-title" style={{ fontSize: '20px', marginBottom: '8px' }}>Tea Customization</h3>
              <p className="favorite-card-desc" style={{ fontSize: '13.5px', marginBottom: '24px' }}>Configure default sweetness and ice levels below. New menu card selections will default to these choices.</p>
              <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="form-group">
                  <label className="form-label">Default Sweetness Level</label>
                  <div className="custom-btn-group" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    {['Regular', 'Half', 'Little'].map((level) => (
                      <button
                        type="button"
                        key={level}
                        className={`custom-btn ${sweetness === level ? 'active' : ''}`}
                        onClick={() => setSweetness(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Default Ice Level</label>
                  <div className="custom-btn-group" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    {['Regular', 'Half', 'Little'].map((level) => (
                      <button
                        type="button"
                        key={level}
                        className={`custom-btn ${iceLevel === level ? 'active' : ''}`}
                        onClick={() => setIceLevel(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn-primary auth-submit-btn" style={{ marginTop: '12px' }}>
                  Save Customization Defaults
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </form>
            </div>
          )}

          {activeView === 'themes' && (
            <div className="profile-panel-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h3 className="favorite-card-title" style={{ fontSize: '20px', marginBottom: '8px' }}>Sanctuary Themes</h3>
              <p className="favorite-card-desc" style={{ fontSize: '13.5px', marginBottom: '24px' }}>Select your favorite visual color profiles.Bob District dynamically changes accent tones based on this choice.</p>
              <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Sanctuary Visual Theme</label>
                  <select
                    className="form-input"
                    value={favoriteTheme}
                    onChange={(e) => setFavoriteTheme(e.target.value)}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', outline: 'none', cursor: 'pointer' }}
                  >
                    <option>Matcha Green</option>
                    <option>Oolong Gold</option>
                    <option>Sakura Blossom</option>
                    <option>Taro Lavender</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary auth-submit-btn" style={{ marginTop: '12px' }}>
                  Apply Visual Theme
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </form>
            </div>
          )}

          {activeView === 'help' && (
            <div className="support-tickets-layout">
              {/* Left Column: FAQs & Tickets List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* FAQs */}
                <div className="profile-panel-card" style={{ padding: '32px' }}>
                  <h3 className="favorite-card-title" style={{ fontSize: '20px', marginBottom: '16px' }}>Sanctuary FAQ</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: '700', marginBottom: '6px' }}>⏱️ How fast is tea preparation?</h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>All online orders are slow-brewed to order and ready for quick pickup in 15 minutes at our counter.</p>
                    </div>
                    <div className="dropdown-divider" style={{ borderBottom: '1px solid var(--border-color)', height: 0, margin: 0 }} />
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: '700', marginBottom: '6px' }}>🌾 Can I adjust sugar and sweetness levels?</h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Yes. You can customize sweetness to Regular, Half, or Little Sweet. You can also specify these as default values inside "Tea Customization" defaults.</p>
                    </div>
                    <div className="dropdown-divider" style={{ borderBottom: '1px solid var(--border-color)', height: 0, margin: 0 }} />
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: '700', marginBottom: '6px' }}>📍 Where is Boba District located?</h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Our tea house and pickup counter is located at 77 Botanical Lane. We are open daily from 9:00 AM to 10:00 PM.</p>
                    </div>
                  </div>
                </div>

                {/* Ticket List */}
                <div className="profile-panel-card" style={{ padding: '32px' }}>
                  <h3 className="favorite-card-title" style={{ fontSize: '20px', marginBottom: '8px' }}>Your Support Tickets</h3>
                  <p className="favorite-card-desc" style={{ fontSize: '13px', marginBottom: '20px' }}>Click on a ticket card below to expand and view response updates from our head brewers.</p>
                  
                  <div className="ticket-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {tickets.length === 0 ? (
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', padding: '16px' }}>No support tickets raised yet.</p>
                    ) : (
                      tickets.map((t) => {
                        const isExpanded = expandedTicketId === t.id
                        return (
                          <div 
                            key={t.id} 
                            className={`ticket-history-card ${isExpanded ? 'expanded' : ''}`}
                            onClick={() => setExpandedTicketId(isExpanded ? null : t.id)}
                            style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', backgroundColor: 'var(--bg-color)', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', gap: '12px' }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary-color)' }}>{t.id}</span>
                                <span className={`ticket-badge status-${t.status.toLowerCase()}`} style={{ fontSize: '11px', fontWeight: '800', padding: '2px 8px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.02em', backgroundColor: t.status === 'Resolved' ? 'rgba(74, 117, 86, 0.15)' : 'rgba(193, 127, 56, 0.15)', color: t.status === 'Resolved' ? '#4a7556' : '#C17F38' }}>{t.status}</span>
                                <span className={`ticket-badge urgency-${t.urgency.toLowerCase()}`} style={{ fontSize: '11px', fontWeight: '800', padding: '2px 8px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.02em', backgroundColor: 'rgba(128, 128, 128, 0.15)', color: 'var(--text-secondary)' }}>{t.urgency}</span>
                              </div>
                              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t.date}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{t.subject}</h4>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease', color: 'var(--text-secondary)' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>

                            {isExpanded && (
                              <div style={{ animation: 'fadeIn 0.2s ease forwards', display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '10px', borderTop: '1px dashed var(--border-color)', marginTop: '6px' }}>
                                <div>
                                  <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)', marginBottom: '4px' }}>Category</span>
                                  <span style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: '600' }}>{t.category}</span>
                                </div>
                                <div>
                                  <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)', marginBottom: '4px' }}>Description</span>
                                  <p style={{ fontSize: '13.5px', color: 'var(--text-primary)', margin: 0, lineHeight: '1.5' }}>{t.message}</p>
                                </div>
                                {t.response ? (
                                  <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', borderLeft: '3px solid var(--primary-color)' }}>
                                    <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '4px' }}>Brewer Response</span>
                                    <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0, lineHeight: '1.5', fontWeight: '600' }}>{t.response}</p>
                                  </div>
                                ) : (
                                  <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(128, 128, 128, 0.05)', borderLeft: '3px solid var(--text-secondary)' }}>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic' }}>⏱️ Ticket is open. A master brewer will review your details soon.</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Raise Ticket Form */}
              <div className="profile-panel-card support-raise-ticket-card" style={{ padding: '32px' }}>
                <h3 className="favorite-card-title" style={{ fontSize: '20px', marginBottom: '8px' }}>Raise a Support Ticket</h3>
                <p className="favorite-card-desc" style={{ fontSize: '13px', marginBottom: '24px' }}>Encountered a problem or have feedback? Submit a formal ticket here and our team will check it.</p>
                
                <form onSubmit={handleRaiseTicket} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Ticket Category</label>
                    <select
                      className="form-input"
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', outline: 'none', cursor: 'pointer' }}
                    >
                      <option>Order Issue</option>
                      <option>Pickup/Delivery</option>
                      <option>Account Benefits</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="Summary of the issue..."
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Urgency Level</label>
                    <div className="custom-btn-group" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                      {['Low', 'Medium', 'High'].map((urg) => (
                        <button
                          type="button"
                          key={urg}
                          className={`custom-btn ${ticketUrgency === urg ? 'active' : ''}`}
                          onClick={() => setTicketUrgency(urg)}
                        >
                          {urg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Details / Message</label>
                    <textarea
                      className="form-input"
                      required
                      rows="4"
                      placeholder="Please explain the details..."
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      style={{ resize: 'none', fontFamily: 'inherit', padding: '12px 16px' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary auth-submit-btn" style={{ marginTop: '8px', justifyContent: 'center' }}>
                    Submit Support Ticket
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
