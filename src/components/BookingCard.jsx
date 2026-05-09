import './BookingCard.css'
import Badge from './Badge.jsx'

const statusMap = {
  confirmed: { label: 'مؤكد', variant: 'success' },
  pending: { label: 'قيد الانتظار', variant: 'warning' },
  completed: { label: 'مكتمل', variant: 'info' },
  cancelled: { label: 'ملغي', variant: 'error' },
}

/**
 * Displays a single booking summary card
 */
export default function BookingCard({ booking, onCancel }) {
  const {
    artistName,
    artistBusinessName,
    artistAvatar,
    service,
    date,
    time,
    locationType,
    status,
    totalPrice,
    depositPaid,
    notes,
  } = booking

  const { label, variant } = statusMap[status] ?? { label: status, variant: 'outline' }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className={`booking-card booking-card-${status}`}>
      <div className="booking-card-header">
        <div className="booking-artist-info">
          <img
            src={artistAvatar ?? 'https://picsum.photos/seed/default_av/80/80'}
            alt={artistName}
            className="booking-artist-avatar"
          />
          <div>
            <h4 className="booking-artist-name">{artistName}</h4>
            <span className="booking-business-name">{artistBusinessName}</span>
          </div>
        </div>
        <Badge variant={variant}>{label}</Badge>
      </div>

      <div className="booking-details">
        <div className="booking-detail-row">
          <span className="booking-detail-icon">💅</span>
          <span className="booking-detail-label">الخدمة:</span>
          <span className="booking-detail-value">{service}</span>
        </div>
        <div className="booking-detail-row">
          <span className="booking-detail-icon">📅</span>
          <span className="booking-detail-label">التاريخ:</span>
          <span className="booking-detail-value">{formatDate(date)}</span>
        </div>
        <div className="booking-detail-row">
          <span className="booking-detail-icon">⏰</span>
          <span className="booking-detail-label">الوقت:</span>
          <span className="booking-detail-value">{time}</span>
        </div>
        <div className="booking-detail-row">
          <span className="booking-detail-icon">📍</span>
          <span className="booking-detail-label">الموقع:</span>
          <span className="booking-detail-value">
            {locationType === 'home' ? 'خدمة منزلية' : 'ستوديو الآرتست'}
          </span>
        </div>
      </div>

      {notes && (
        <div className="booking-notes">
          <span className="booking-notes-label">ملاحظات: </span>
          {notes}
        </div>
      )}

      <div className="booking-card-footer">
        <div className="booking-price-info">
          <div className="booking-price-row">
            <span>المبلغ الكلي</span>
            <span className="booking-total-price">{totalPrice?.toLocaleString('ar-SA')} ر.س</span>
          </div>
          <div className="booking-price-row">
            <span>العربون المدفوع</span>
            <span className="booking-deposit">{depositPaid?.toLocaleString('ar-SA')} ر.س</span>
          </div>
          <div className="booking-price-row booking-remaining">
            <span>المبلغ المتبقي</span>
            <span>{((totalPrice ?? 0) - (depositPaid ?? 0)).toLocaleString('ar-SA')} ر.س</span>
          </div>
        </div>
        {status === 'pending' && onCancel && (
          <button className="booking-cancel-btn" onClick={() => onCancel(booking.id)}>
            إلغاء الحجز
          </button>
        )}
      </div>
    </div>
  )
}
