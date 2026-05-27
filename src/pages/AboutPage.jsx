import { useNavigate } from 'react-router-dom'
import bgImage from '../assets/botanical_cafe_bg.png'

/* --- About Page (/about) ------------------------------------------------- */

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      {/* Manifesto */}
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

      {/* Asymmetric collage */}
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

      {/* Philosophy quote */}
      <div className="philosophy-quote-block">
        <div className="quote-marks">"</div>
        <blockquote className="philosophy-quote">
          Tea is not a beverage. It is a bridge between the botanical world and human stillness.
        </blockquote>
        <cite className="philosophy-cite">— Master Brewer Chen</cite>
      </div>

      {/* Daily ritual timeline */}
      <div className="ritual-section">
        <h2 className="ritual-section-title">Our Daily Ritual</h2>
        <p className="ritual-section-subtitle">Crafting the daily infusion requires unwavering time and botanical precision. Here is how we prepare your cup every single day.</p>

        <div className="ritual-timeline">
          {[
            { time: '05:00 AM', title: 'The Sorting', text: 'Our brewers arrive before sunrise to hand-select and inspect the organic stone-ground green leaves, discarding any that do not meet our grading standards.' },
            { time: '08:00 AM', title: 'Steam Distillation', text: 'We steam-distill fresh jasmine flowers and lavender buds. This floral distillate is infused directly into our fresh cold-brewed milk bases to create a natural, ambient scent.' },
            { time: '11:00 AM', title: 'Tapioca Fire', text: 'We cook our organic brown sugar tapioca pearls from scratch in large copper kettles. They boil for precisely 45 minutes, then rest in hot honey syrup to achieve their signature chew.' },
            { time: '02:00 PM', title: 'Fresh Batches', text: 'To guarantee absolute freshness, we discard any unused tea bases and cooked tapioca pearls every three hours, whisking and brewing entirely fresh batches in real-time.' }
          ].map(({ time, title, text }) => (
            <div className="timeline-item" key={time}>
              <div className="timeline-time">{time}</div>
              <div className="timeline-dot-connector"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">{title}</h3>
                <p className="timeline-text">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial CTA */}
      <div className="about-editorial-cta">
        <div className="cta-border-line"></div>
        <div className="cta-flex-row">
          <h2 className="cta-editorial-heading">Ready to Experience <br />the Sanctuary?</h2>
          <button className="btn-primary" onClick={() => navigate('/menu')}>
            Explore the Menu
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginLeft: '8px', width: '18px', height: '18px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
