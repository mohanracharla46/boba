import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import heroVideo1 from '../assets/herovideo1.mp4'
import heroVideo2 from '../assets/herovideo2.mp4'
import heroVideo3 from '../assets/herovideo3.mp4'
import { THEMES } from '../data/themes'

/* --- Home Page (/) -------------------------------------------------------- */
// Hero video carousel → Signature specialty cards → Philosophy steps
// All layout is driven by CSS classes so mobile breakpoints work cleanly.

const VIDEO_PLAYLIST = [heroVideo1, heroVideo2, heroVideo3]

export default function HomePage() {
  const navigate = useNavigate()
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0)

  const currentContent = THEMES['matcha']

  // Set brand theme class on body
  useEffect(() => {
    document.body.className = ''
    document.body.classList.add('theme-matcha')
  }, [])

  const handleVideoEnded = () => {
    setCurrentVideoIdx((prev) => (prev + 1) % VIDEO_PLAYLIST.length)
  }

  // Navigate to /menu with a pre-selected drink id
  const handleSteepNow = (themeKey) => {
    const map = {
      matcha: 'matcha_latte',
      oolong: 'special_blend_black_tea',
      sakura: 'lychee_slush',
      taro: 'taro_milk_tea'
    }
    navigate('/menu', { state: { initialDrinkId: map[themeKey] } })
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
      <section className="hero-section" id="hero" aria-label="Hero banner">
        <div className="hero-card">

          {/* Glassmorphism blur on left edge (desktop only) */}
          <div className="hero-card-blur" aria-hidden="true" />

          {/* Floating leaf particles */}
          <div className="leaf-container" aria-hidden="true">
            <span className="leaf" />
            <span className="leaf" />
            <span className="leaf" />
            <span className="leaf" />
          </div>

          {/* Looping background video */}
          <div className="hero-bg-media">
            <video
              key={VIDEO_PLAYLIST[currentVideoIdx]}
              className="hero-video"
              src={VIDEO_PLAYLIST[currentVideoIdx]}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
              aria-hidden="true"
            />
          </div>

          {/* Dark gradient overlay */}
          <div className="hero-overlay" aria-hidden="true" />

          {/* Hero copy */}
          <div className="hero-content">
            <div className="hero-badge">{currentContent.badge}</div>

            <h1 className="hero-title">
              {currentContent.title.split(',')[0]},<br />
              <span>{currentContent.title.split(',')[1]?.trim() || ''}</span>
            </h1>

            <p className="hero-desc">{currentContent.desc}</p>

            <div className="hero-cta">
              <button
                className="btn-primary"
                onClick={() =>
                  document.getElementById('specialties')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Order Drink
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button className="btn-secondary" onClick={() => navigate('/about')}>
                View Infusion Chart
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ══ SIGNATURE SPECIALTIES ══════════════════════════════════════════ */}
      <section className="specialties-section" id="specialties" aria-label="Signature drinks">
        <div className="section-header">
          <h2 className="section-title">Signature Botanical Infusions</h2>
          <span className="section-subtitle">
            Browse our organic signature menu and slow-brewed house infusions
          </span>
        </div>

        <div className="specialty-grid">
          {Object.entries(THEMES).map(([key, item], idx) => (
            <div
              key={key}
              className="specialty-card"
              onClick={() => handleSteepNow(key)}
              role="button"
              tabIndex={0}
              aria-label={`Steep ${item.tagline}`}
              onKeyDown={(e) => e.key === 'Enter' && handleSteepNow(key)}
            >
              {/* Card header row: number badge + type tag */}
              <div className="specialty-card-header">
                <div className="drink-badge-circle">0{idx + 1}</div>
                <span
                  className={`specialty-type-badge ${
                    item.homeTag.includes('Popular')
                      ? 'badge-popular'
                      : item.homeTag.includes('Seasonal')
                      ? 'badge-seasonal'
                      : 'badge-signature'
                  }`}
                >
                  {item.homeTag}
                </span>
              </div>

              {/* Card body: title + description */}
              <div className="specialty-card-body">
                <h3 className="card-title">{item.tagline}</h3>
                <p className="card-desc">{item.detail}</p>
              </div>

              {/* Card footer: price + CTA */}
              <div className="card-footer">
                <span className="card-price">{item.price}</span>
                <span className="card-action">
                  Steep Now
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Full menu CTA */}
        <div className="specialties-view-more">
          <button
            className="btn-primary"
            onClick={() => { navigate('/menu'); window.scrollTo({ top: 0 }) }}
          >
            Explore Full Menu
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"
              style={{ marginLeft: '8px', width: '18px', height: '18px' }} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ══ PHILOSOPHY STEPS ═══════════════════════════════════════════════ */}
      <section className="philosophy-section" aria-label="Our craft">
        <div className="philosophy-header-editorial">
          <span className="philosophy-badge-tag">Our Craft</span>
          <h2 className="philosophy-editorial-title">The Art of Slow Steeping</h2>
          <p className="philosophy-editorial-subtitle">
            Brewing artisanal boba is an exercise in time, patience, and absolute botanical
            precision. Here is how we prepare your cup.
          </p>
        </div>

        <div className="philosophy-editorial-body">
          {[
            {
              num: '01',
              tag: '🍃 The Harvest',
              title: 'Direct-Trade Single Estates',
              text: 'Our journey begins in the high-elevation mist of Uji, Japan, and the volcanic slopes of Formosa. We skip wholesale brokers entirely, partnering directly with family growers who hand-harvest organic leaves at the absolute peak of their natural botanical steep.',
              alt: false
            },
            {
              num: '02',
              tag: '🌸 The Distillation',
              title: 'Fresh Flower Distillates',
              text: 'Instead of chemical flavour compounds or heavy synthetic syrups, we steam-distill fresh jasmine flowers and lavender blossoms. This pure floral distillate is folded directly into our cold-brewed cream bases, creating an ambient aroma that blooms in the glass.',
              alt: true
            },
            {
              num: '03',
              tag: '🔮 The Simmer',
              title: 'Forty-Five Minute Tapioca Fire',
              text: 'We cook our organic brown sugar tapioca pearls in large copper kettles for exactly 45 minutes, then steep them in hot wildflower honey. To guarantee perfect texture, we brew entirely fresh batches every three hours and discard any unused pearl bases.',
              alt: false
            }
          ].map(({ num, tag, title, text, alt }) => (
            <div key={num} className={`philosophy-step-row${alt ? ' alt-row' : ''}`}>
              <div className="philosophy-step-num" aria-hidden="true">{num}</div>
              <div className="philosophy-step-content">
                <span className="philosophy-step-tag">{tag}</span>
                <h3 className="philosophy-step-title">{title}</h3>
                <p className="philosophy-step-text">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
