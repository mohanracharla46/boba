import { useState } from 'react'

/* --- Contact Page (/contact) --------------------------------------------- */

export default function ContactPage() {
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
        {/* Info column */}
        <div className="contact-info-column">
          <div className="contact-card-box">
            {[
              {
                icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
                label: 'Address',
                value: '77 Botanical Lane, Blossom Estate, NY 10012'
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                label: 'Steep Hotline',
                value: '+1 (555) 777-BOBA'
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                label: 'E-Mail Address',
                value: 'hello@bobabotanicals.com'
              }
            ].map(({ icon, label, value }) => (
              <div className="contact-info-item" key={label}>
                <div className="contact-icon-wrapper">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                </div>
                <div className="contact-info-text">
                  <span className="contact-info-label">{label}</span>
                  <span className="contact-info-value">{value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-card-box opening-hours-box">
            <h2 className="opening-hours-title">Brewing Hours</h2>
            {[
              { day: 'Monday - Friday', hours: '8:00 AM - 9:00 PM' },
              { day: 'Saturday', hours: '9:00 AM - 10:00 PM' },
              { day: 'Sunday', hours: '10:00 AM - 8:00 PM' }
            ].map(({ day, hours }) => (
              <div className="hours-row" key={day}>
                <span className="hours-day">{day}</span>
                <span className="hours-time">{hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form column */}
        <div className="contact-form-box">
          <h2 className="contact-form-title">Send a Botanical Request</h2>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
              <div className="value-icon-circle" style={{ width: '72px', height: '72px', backgroundColor: 'var(--primary-color)', color: '#FFF' }}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
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
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
