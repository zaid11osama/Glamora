import { Link } from 'react-router-dom'
import './ArtistCard.css'
import Badge from './Badge.jsx'

/**
 * Artist listing card — used in CustomerDashboard and Landing page
 */
export default function ArtistCard({ artist }) {
  const {
    id,
    name,
    businessName,
    city,
    area,
    rating,
    reviewsCount,
    startingPrice,
    providesHomeService,
    providesStudioService,
    portfolioImages,
    avatar,
    availableTimes,
  } = artist

  const coverImage = portfolioImages?.[0] ?? 'https://picsum.photos/seed/default_cover/400/300'

  const renderStars = (r) => {
    const full = Math.floor(r)
    const half = r % 1 >= 0.5
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0))
  }

  return (
    <div className="artist-card">
      {/* Cover image */}
      <div className="artist-card-cover">
        <img src={coverImage} alt={`أعمال ${businessName}`} className="artist-cover-img" />
        <div className="artist-card-overlay" />

        {/* Service badges */}
        <div className="artist-service-badges">
          {providesHomeService && (
            <span className="service-badge service-home">🏠 منزلية</span>
          )}
          {providesStudioService && (
            <span className="service-badge service-studio">✨ ستوديو</span>
          )}
        </div>

        {/* Rating */}
        <div className="artist-card-rating">
          <span className="rating-star">★</span>
          <span className="rating-value">{rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="artist-card-body">
        <div className="artist-card-header">
          <img
            src={avatar ?? 'https://picsum.photos/seed/default_av/80/80'}
            alt={name}
            className="artist-avatar"
          />
          <div className="artist-card-info">
            <h3 className="artist-business-name">{businessName}</h3>
            <p className="artist-name">{name}</p>
          </div>
        </div>

        <div className="artist-location">
          <span className="location-icon">📍</span>
          <span>{city}، {area}</span>
        </div>

        <div className="artist-card-stats">
          <div className="artist-stars-wrap">
            <span className="artist-stars">{renderStars(rating)}</span>
            <span className="artist-reviews">({reviewsCount?.toLocaleString('ar-SA')} تقييم)</span>
          </div>
        </div>

        {availableTimes && availableTimes.length > 0 && (
          <div className="artist-times">
            {availableTimes.slice(0, 3).map((t) => (
              <span key={t} className="time-chip">{t}</span>
            ))}
            {availableTimes.length > 3 && (
              <span className="time-chip time-chip-more">+{availableTimes.length - 3}</span>
            )}
          </div>
        )}

        <div className="artist-card-footer">
          <div className="artist-price">
            <span className="price-label">يبدأ من</span>
            <span className="price-value">{startingPrice?.toLocaleString('ar-SA')} ر.س</span>
          </div>
          <Link to={`/artists/${id}`} className="artist-view-btn">
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </div>
  )
}
