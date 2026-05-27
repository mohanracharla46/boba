import { Link } from 'react-router-dom'

/* --- Footer Component ---------------------------------------------------- */
// Multi-column brand footer. Uses react-router <Link> for all internal nav
// so the SPA router handles navigation without a full page reload.

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand column */}
        <div className="footer-column brand-col">
          <div className="footer-brand">
            <svg className="brand-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="13" y="1" width="2" height="6" rx="0.5" />
              <rect x="5" y="6" width="14" height="2" rx="1" />
              <path fillRule="evenodd" clipRule="evenodd" d="M7 8h10l-1.5 11.5c-.1.8-.8 1.5-1.6 1.5h-5.8c-.8 0-1.5-.7-1.6-1.5L7 8zm2.5 9.5a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 0 0-2.4 0zm3.5-1.5a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 0 0-2.4 0zm-2-3a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 0 0-2.4 0zm-1.5 3a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 0 0-2.4 0zm4.5 1.5a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 0 0-2.4 0z" />
            </svg>
            Boba District
          </div>
          <p className="footer-desc">
            Experience the tranquil, healing art of the traditional steep. Wild jasmine, organic matcha,
            steam-distilled botanicals, and slow-cooked tapioca.
          </p>
          <div className="footer-socials">
            <a href="#instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#twitter" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
            <a href="#facebook" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Sanctuary page links */}
        <div className="footer-column links-col">
          <h3 className="footer-col-title">Sanctuary Pages</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Brewing hours */}
        <div className="footer-column hours-col">
          <h3 className="footer-col-title">Brewing Hours</h3>
          <div className="footer-hours">
            <p><span>Monday - Friday</span> 8:00 AM - 9:00 PM</p>
            <p><span>Saturday</span> 9:00 AM - 10:00 PM</p>
            <p><span>Sunday</span> 10:00 AM - 8:00 PM</p>
          </div>
        </div>

        {/* Newsletter sign-up */}
        <div className="footer-column newsletter-col">
          <h3 className="footer-col-title">Weekly Steeps</h3>
          <p className="newsletter-text">Subscribe to receive organic high tea recipes and physical shop event invitations.</p>
          <form className="footer-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!') }}>
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
  )
}
