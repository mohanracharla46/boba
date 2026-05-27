import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const handleSignup = (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }

    if (!agree) {
      setErrorMsg('You must agree to the Terms & Conditions.')
      return
    }

    setSubmitted(true)
    login(email, name)
    setToastMsg('Account created! Welcome to the Sanctuary.')
    setTimeout(() => {
      setToastMsg('')
      navigate('/')
    }, 1500)
  }

  return (
    <div className="page-container auth-page-wrapper">
      {/* Toast notification */}
      {toastMsg && (
        <div className="toast-notification" style={{ position: 'fixed', bottom: '32px', right: '32px', backgroundColor: 'var(--primary-color)', color: '#FFF', padding: '16px 28px', borderRadius: '16px', boxShadow: '0 12px 32px rgba(var(--primary-rgb), 0.3)', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 100, animation: 'fadeIn 0.3s ease forwards' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {toastMsg}
        </div>
      )}

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Join the Sanctuary</h1>
          <p className="auth-subtitle">Create an account to start curating your dream boba infusions and saving your custom recipes.</p>
        </div>

        {errorMsg && (
          <div className="auth-error-banner" style={{ backgroundColor: '#FFF3F0', border: '1px solid rgba(192, 92, 70, 0.2)', padding: '12px 16px', borderRadius: '12px', color: '#C05C46', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errorMsg}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="Boba Enthusiast"
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
              placeholder="tea-lover@nature.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-utilities-row" style={{ marginTop: '8px' }}>
            <label className="addon-label-side" style={{ margin: 0 }}>
              <input
                type="checkbox"
                required
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              I agree to the Sanctuary Terms & Conditions
            </label>
          </div>

          <button type="submit" className="btn-primary auth-submit-btn" disabled={submitted}>
            {submitted ? 'Creating Account...' : 'Create Account'}
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-footer-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
