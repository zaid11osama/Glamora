import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './ArtistDetails.css'
import { getArtistById } from '../services/api.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import PortfolioGallery from '../components/PortfolioGallery.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import Badge from '../components/Badge.jsx'
import Button from '../components/Button.jsx'

export default function ArtistDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [artist, setArtist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('portfolio')

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const data = await getArtistById(id)
        setArtist(data)
      } catch (err) {
        setError(err.message ?? 'حدث خطأ في تحميل البيانات')
      } finally {
        setLoading(false)
      }
    }
    fetchArtist()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return <LoadingSpinner fullPage text="جاري تحميل ملف الآرتست..." />
  if (error) return (
    <div className="artist-error">
      <span>😔</span>
      <p>{error}</p>
      <Button variant="outline" onClick={() => navigate(-1)}>العودة</Button>
    </div>
  )
  if (!artist) return null

  const {
    name, businessName, city, area, rating, reviewsCount,
    startingPrice, providesHomeService, providesStudioService,
    yearsExperience, portfolioImages, avatar, services,
    bio, reviews, availableDates, availableTimes,
  } = artist

  const renderStars = (r) => '★'.repeat(Math.floor(r)) + (r % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(r))

  const formatDate = (d) => new Date(d).toLocaleDateString('ar-SA', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div className="artist-details-page">
      {/* ============ HERO COVER ============ */}
      <div className="artist-hero-cover">
        <img
          src={portfolioImages?.[0] ?? 'https://picsum.photos/seed/cover_default/1200/400'}
          alt={businessName}
          className="artist-cover-bg"
        />
        <div className="artist-cover-overlay" />
        <div className="artist-hero-breadcrumb container">
          <Link to="/customer/dashboard" className="breadcrumb-link">← العودة للبحث</Link>
        </div>
      </div>

      {/* ============ PROFILE CARD ============ */}
      <div className="container">
        <div className="artist-profile-card">
          <div className="artist-profile-left">
            <div className="artist-profile-avatar-wrap">
              <img
                src={avatar ?? 'https://picsum.photos/seed/default_av/200/200'}
                alt={name}
                className="artist-profile-avatar"
              />
              <div className="artist-online-dot" title="متاحة للحجز" />
            </div>
            <div className="artist-profile-info">
              <h1 className="artist-profile-business">{businessName}</h1>
              <p className="artist-profile-name">{name}</p>
              <div className="artist-profile-meta">
                <span className="artist-meta-item">
                  <span>📍</span> {city}، {area}
                </span>
                {yearsExperience && (
                  <span className="artist-meta-item">
                    <span>⏱</span> {yearsExperience} سنوات خبرة
                  </span>
                )}
              </div>
              <div className="artist-profile-badges">
                {providesHomeService && <Badge variant="success" icon="🏠">خدمة منزلية</Badge>}
                {providesStudioService && <Badge variant="secondary" icon="✨">ستوديو</Badge>}
              </div>
            </div>
          </div>

          <div className="artist-profile-right">
            <div className="artist-rating-summary">
              <div className="big-rating-num">{rating}</div>
              <div>
                <div className="big-rating-stars">{renderStars(rating)}</div>
                <div className="big-rating-count">{reviewsCount?.toLocaleString('ar-SA')} تقييم</div>
              </div>
            </div>
            <div className="artist-starting-price">
              <span className="price-from-label">يبدأ من</span>
              <span className="price-from-value">{startingPrice?.toLocaleString('ar-SA')} ر.س</span>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(`/booking/${id}`)}
              icon="📅"
            >
              احجزي الآن
            </Button>
          </div>
        </div>

        {/* ============ TABS ============ */}
        <div className="artist-tabs">
          {[
            { id: 'portfolio', label: '🎨 البورتفوليو' },
            { id: 'services', label: '💅 الخدمات والأسعار' },
            { id: 'availability', label: '📅 المواعيد المتاحة' },
            { id: 'reviews', label: `⭐ التقييمات (${reviewsCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`artist-tab ${activeTab === tab.id ? 'artist-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============ TAB CONTENT ============ */}
        <div className="artist-tab-content">
          {/* Portfolio */}
          {activeTab === 'portfolio' && (
            <div className="tab-panel">
              <div className="artist-bio-section">
                <h3>عن {name}</h3>
                <p>{bio}</p>
              </div>
              <PortfolioGallery images={portfolioImages} artistName={name} />
            </div>
          )}

          {/* Services */}
          {activeTab === 'services' && (
            <div className="tab-panel">
              <div className="services-grid">
                {services?.map((service) => (
                  <div className="service-card" key={service.id}>
                    <div className="service-card-icon">💄</div>
                    <div className="service-card-info">
                      <h4 className="service-name">{service.name}</h4>
                      <span className="service-duration">⏱ {service.duration}</span>
                    </div>
                    <div className="service-card-price">
                      <span className="service-price">{service.price?.toLocaleString('ar-SA')} ر.س</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/booking/${id}?service=${service.id}`)}
                      >
                        احجزي
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Availability */}
          {activeTab === 'availability' && (
            <div className="tab-panel">
              <div className="availability-section">
                <div className="availability-dates">
                  <h3 className="availability-title">📅 الأيام المتاحة</h3>
                  <div className="dates-grid">
                    {availableDates?.map((date) => (
                      <div key={date} className="date-chip">
                        {formatDate(date)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="availability-times">
                  <h3 className="availability-title">⏰ الأوقات المتاحة</h3>
                  <div className="times-grid">
                    {availableTimes?.map((time) => (
                      <div key={time} className="time-chip-large">{time}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="availability-cta">
                <Button variant="primary" size="lg" onClick={() => navigate(`/booking/${id}`)} icon="📅">
                  تأكيد الحجز
                </Button>
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div className="tab-panel">
              <div className="reviews-overview">
                <div className="reviews-big-rating">
                  <span className="reviews-rating-num">{rating}</span>
                  <div>
                    <div className="reviews-stars-big">{'★'.repeat(Math.floor(rating))}</div>
                    <span className="reviews-rating-label">من 5 — بناءً على {reviewsCount} تقييم</span>
                  </div>
                </div>
              </div>
              <div className="reviews-list">
                {reviews?.length ? (
                  reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <p className="no-reviews">لا توجد تقييمات بعد</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Floating Book Button */}
        <div className="floating-book-bar">
          <div className="floating-book-info">
            <span className="floating-artist-name">{businessName}</span>
            <span className="floating-price">يبدأ من {startingPrice?.toLocaleString('ar-SA')} ر.س</span>
          </div>
          <Button variant="primary" size="md" onClick={() => navigate(`/booking/${id}`)}>
            احجزي الآن 📅
          </Button>
        </div>
      </div>
    </div>
  )
}
