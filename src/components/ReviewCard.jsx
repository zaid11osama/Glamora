import './ReviewCard.css'

/**
 * Displays a single customer review
 */
export default function ReviewCard({ review }) {
  const { customerName, rating, comment, date, service, avatar } = review

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-avatar-wrap">
          {avatar ? (
            <img src={avatar} alt={customerName} className="review-avatar" />
          ) : (
            <div className="review-avatar-placeholder">
              {customerName?.charAt(0) ?? '؟'}
            </div>
          )}
        </div>
        <div className="review-meta">
          <h4 className="review-customer-name">{customerName}</h4>
          <span className="review-service">{service}</span>
        </div>
        <div className="review-rating-wrap">
          <div className="review-stars">
            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
          </div>
          <span className="review-date">{formatDate(date)}</span>
        </div>
      </div>
      <p className="review-comment">"{comment}"</p>
    </div>
  )
}
