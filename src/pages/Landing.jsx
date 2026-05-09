import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'
import ArtistCard from '../components/ArtistCard.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { mockArtists, mockTestimonials, faqs } from '../data/mockData.js'

export default function Landing() {
  const [openFaq, setOpenFaq] = useState(null)
  const popularArtists = mockArtists.slice(0, 4)

  return (
    <div className="landing">
      {/* ============ HERO ============ */}
      <section className="hero-section">
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge">✨ منصة الميكب #1 في المملكة</div>
            <h1 className="hero-title">
              احجزي ميكب آرتستك
              <span className="hero-title-accent"> في ثوانٍ</span>
              <br />
              وتألقي بثقة
            </h1>
            <p className="hero-subtitle">
              Glamora تربطك بأفضل الميكب آرتست القريبات منك. ابحثي، قارني، واحجزي خدمة منزلية أو في الستوديو — كل ذلك في مكان واحد.
            </p>
            <div className="hero-cta">
              <Link to="/customer/dashboard" className="hero-cta-primary">
                💄 احجزي ميكب آرتست
              </Link>
              <Link to="/register/artist" className="hero-cta-secondary">
                انضمي كميكب آرتست ←
              </Link>
            </div>
            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-num">+500</span>
                <span className="trust-label">ميكب آرتست</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <span className="trust-num">+15,000</span>
                <span className="trust-label">حجز ناجح</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <span className="trust-num">4.9★</span>
                <span className="trust-label">متوسط التقييم</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-cards-stack">
              <div className="floating-card floating-card-1">
                <img src="https://picsum.photos/seed/hero1/200/260" alt="" className="floating-card-img" />
              </div>
              <div className="floating-card floating-card-2">
                <img src="https://picsum.photos/seed/hero2/200/260" alt="" className="floating-card-img" />
              </div>
              <div className="floating-card floating-card-3">
                <img src="https://picsum.photos/seed/hero3/180/220" alt="" className="floating-card-img" />
              </div>
              <div className="hero-booking-chip">
                <span>🎉</span>
                <div>
                  <strong>تم الحجز!</strong>
                  <p>ميكب عروس - سارة الأحمدي</p>
                </div>
              </div>
              <div className="hero-rating-chip">
                <span>⭐ 4.9</span>
                <span>تقييمات ممتازة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="stats-bar">
        <div className="container stats-grid">
          {[
            { icon: '💄', num: '+500', label: 'ميكب آرتست محترفة' },
            { icon: '🌆', num: '+20', label: 'مدينة في المملكة' },
            { icon: '✅', num: '+15K', label: 'حجز ناجح' },
            { icon: '⭐', num: '4.9/5', label: 'متوسط التقييم' },
          ].map((stat) => (
            <div className="stat-item" key={stat.label}>
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-num">{stat.num}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="section bg-section">
        <div className="container">
          <SectionTitle
            title="كيف تعمل Glamora؟"
            subtitle="خطوات بسيطة للحصول على أفضل تجربة تجميل"
            accent="كيف تعمل"
          />
          <div className="steps-grid">
            {[
              {
                step: '1',
                icon: '🔍',
                title: 'ابحثي',
                desc: 'ابحثي عن ميكب آرتست حسب مدينتك وتاريخك وميزانيتك بكل سهولة',
                color: 'primary',
              },
              {
                step: '2',
                icon: '💅',
                title: 'اختاري',
                desc: 'تصفحي البورتفوليو والتقييمات واختاري الخدمة المناسبة لك',
                color: 'secondary',
              },
              {
                step: '3',
                icon: '📅',
                title: 'احجزي',
                desc: 'اختاري الوقت المناسب وأكملي الحجز بأمان في دقيقتين',
                color: 'accent',
              },
              {
                step: '4',
                icon: '✨',
                title: 'تألقي',
                desc: 'استقبلي الآرتست في بيتك أو اذهبي لستوديوها وتألقي بجمالك',
                color: 'gold',
              },
            ].map((step) => (
              <div className={`step-card step-card-${step.color}`} key={step.step}>
                <div className="step-number">{step.step}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="لماذا Glamora؟"
            subtitle="كل ما تحتاجينه لتجربة تجميل مثالية"
            accent="مميزاتنا"
          />
          <div className="features-grid">
            {[
              { icon: '🏠', title: 'خدمة منزلية', desc: 'الآرتست تأتي إليك أينما كنت في المدينة' },
              { icon: '⭐', title: 'تقييمات حقيقية', desc: 'آراء عميلات حقيقيات قبل ما تحجزي' },
              { icon: '💰', title: 'أسعار شفافة', desc: 'لا رسوم مخفية. كل شيء واضح من البداية' },
              { icon: '🔒', title: 'دفع آمن', desc: 'نظام دفع مشفر وآمن بالكامل' },
              { icon: '🎨', title: 'بورتفوليو حقيقي', desc: 'شاهدي أعمال الآرتست قبل الحجز' },
              { icon: '📱', title: 'حجز سهل', desc: 'احجزي في أقل من دقيقتين من هاتفك' },
            ].map((feat) => (
              <div className="feature-card" key={feat.title}>
                <div className="feature-icon">{feat.icon}</div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POPULAR ARTISTS ============ */}
      <section className="section bg-section">
        <div className="container">
          <div className="section-header-with-link">
            <SectionTitle
              title="ميكب آرتست مميزات"
              subtitle="تصفحي أبرز الآرتست على المنصة"
              accent="الأكثر حجزاً"
              centered={false}
            />
            <Link to="/customer/dashboard" className="see-all-link">
              عرض الكل ←
            </Link>
          </div>
          <div className="artists-grid">
            {popularArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="ماذا تقول عميلاتنا؟"
            subtitle="آراء حقيقية من عميلات سعيدات"
            accent="التقييمات"
          />
          <div className="testimonials-grid">
            {mockTestimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
                <p className="testimonial-comment">"{t.comment}"</p>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div>
                    <strong className="testimonial-name">{t.name}</strong>
                    <span className="testimonial-role">{t.role} • {t.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ARTIST CTA ============ */}
      <section className="artist-cta-section">
        <div className="container">
          <div className="artist-cta-content">
            <div className="artist-cta-text">
              <h2 className="artist-cta-title">أنتِ ميكب آرتست؟<br />انضمي إلى Glamora</h2>
              <p className="artist-cta-desc">
                انضمي لأكثر من 500 آرتست على المنصة واحصلي على حجوزات أكثر وعملاء جدد كل يوم. سهّلي إدارة مواعيدك وأسعارك وبورتفوليوك من مكان واحد.
              </p>
              <div className="artist-cta-features">
                <span>✅ تسجيل مجاني</span>
                <span>✅ لوحة تحكم احترافية</span>
                <span>✅ حجوزات مباشرة</span>
                <span>✅ دفع مضمون</span>
              </div>
              <Link to="/register/artist" className="artist-cta-btn">
                سجلي الآن مجاناً 💄
              </Link>
            </div>
            <div className="artist-cta-image">
              <img src="https://picsum.photos/seed/artist_cta/500/400" alt="انضمي كميكب آرتست" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="أسئلة شائعة"
            subtitle="إجابات على الأسئلة الأكثر شيوعاً"
            accent="FAQ"
          />
          <div className="faq-list">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`faq-item ${openFaq === faq.id ? 'faq-open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  aria-expanded={openFaq === faq.id}
                >
                  <span>{faq.question}</span>
                  <span className="faq-arrow">{openFaq === faq.id ? '▲' : '▼'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
