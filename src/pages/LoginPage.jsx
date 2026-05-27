import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setSubmitted(true)
    login(email, 'Boba Lover')
    setToastMsg('Welcome back to the Sanctuary!')
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
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to access your curated favorites, steep history, and custom blends.</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
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

          <div className="auth-utilities-row">
            <label className="addon-label-side" style={{ margin: 0 }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              Remember Me
            </label>
            <a href="#forgot" className="auth-forgot-link" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your email.') }}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="btn-primary auth-submit-btn" disabled={submitted}>
            {submitted ? 'Entering...' : 'Enter the Sanctuary'}
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        <div className="auth-footer">
          <p>
            New to the Sanctuary?{' '}
            <Link to="/signup" className="auth-footer-link">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
