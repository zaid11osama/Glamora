import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom'
import './Booking.css'
import { getArtistById, createBooking } from '../services/api.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import PaymentBox from '../components/PaymentBox.jsx'
import Button from '../components/Button.jsx'

export default function Booking() {
  const { artistId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [artist, setArtist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [bookingRef, setBookingRef] = useState(null)

  const [form, setForm] = useState({
    serviceId: searchParams.get('service') ?? '',
    date: '',
    time: '',
    locationType: 'home',
    notes: '',
    paymentMethod: 'credit',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getArtistById(artistId)
        setArtist(data)
        if (!form.serviceId && data.services?.length) {
          setForm((prev) => ({ ...prev, serviceId: String(data.services[0].id) }))
        }
      } catch {
        navigate(-1)
      } finally {
        setLoading(false)
      }
    }
    fetch()
    window.scrollTo(0, 0)
  }, [artistId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.serviceId) errs.serviceId = 'يرجى اختيار الخدمة'
    if (!form.date) errs.date = 'يرجى اختيار التاريخ'
    if (!form.time) errs.time = 'يرجى اختيار الوقت'
    if (!form.paymentMethod) errs.paymentMethod = 'يرجى اختيار طريقة الدفع'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    try {
      const result = await createBooking({ artistId, ...form })
      setBookingRef(result.booking.id)
      setSuccess(true)
      window.scrollTo(0, 0)
    } catch (err) {
      setErrors({ general: err.message ?? 'حدث خطأ في إتمام الحجز' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner fullPage text="جاري تحميل بيانات الحجز..." />

  if (success) {
    return (
      <div className="booking-success-page">
        <div className="booking-success-card">
          <div className="booking-success-icon">🎉</div>
          <h2 className="booking-success-title">تم تأكيد حجزك بنجاح!</h2>
          <p className="booking-success-desc">
            تم إرسال تفاصيل الحجز على رقم هاتفك. ستتواصل معك الآرتست لتأكيد الموعد.
          </p>
          <div className="booking-success-ref">
            رقم الحجز: <strong>#{bookingRef}</strong>
          </div>
          <div className="booking-success-summary">
            <div className="success-summary-row">
              <span>الآرتست</span>
              <strong>{artist?.businessName}</strong>
            </div>
            <div className="success-summary-row">
              <span>الخدمة</span>
              <strong>{artist?.services?.find((s) => String(s.id) === form.serviceId)?.name}</strong>
            </div>
            <div className="success-summary-row">
              <span>التاريخ</span>
              <strong>{form.date}</strong>
            </div>
            <div className="success-summary-row">
              <span>الوقت</span>
              <strong>{form.time}</strong>
            </div>
            <div className="success-summary-row">
              <span>نوع الخدمة</span>
              <strong>{form.locationType === 'home' ? 'خدمة منزلية 🏠' : 'ستوديو الآرتست ✨'}</strong>
            </div>
          </div>
          <div className="booking-success-actions">
            <Button variant="primary" onClick={() => navigate('/customer/dashboard')}>
              بحث عن آرتست أخرى
            </Button>
            <Button variant="ghost" onClick={() => navigate('/')}>
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const selectedService = artist?.services?.find((s) => String(s.id) === form.serviceId)

  return (
    <div className="booking-page">
      {/* Header */}
      <div className="booking-page-header">
        <div className="container">
          <Link to={`/artists/${artistId}`} className="booking-back-link">
            ← العودة لملف الآرتست
          </Link>
          <h1 className="booking-page-title">إتمام الحجز</h1>
          <p className="booking-page-subtitle">مع {artist?.businessName}</p>
        </div>
      </div>

      <div className="container">
        <div className="booking-layout">
          {/* Form */}
          <form className="booking-form-section" onSubmit={handleSubmit} noValidate>
            {errors.general && (
              <div className="booking-general-error">
                <span>⚠️</span> {errors.general}
              </div>
            )}

            {/* Artist summary */}
            <div className="booking-artist-summary">
              <img
                src={artist?.avatar ?? 'https://picsum.photos/seed/default_av/80/80'}
                alt={artist?.name}
                className="booking-artist-avatar"
              />
              <div>
                <h3>{artist?.businessName}</h3>
                <p>{artist?.city}، {artist?.area}</p>
                <div className="booking-artist-rating">
                  <span style={{ color: 'var(--accent)' }}>★ {artist?.rating}</span>
                  <span>({artist?.reviewsCount} تقييم)</span>
                </div>
              </div>
            </div>

            {/* Step 1: Service */}
            <div className="booking-step">
              <div className="booking-step-header">
                <span className="booking-step-num">1</span>
                <h3>اختاري الخدمة</h3>
              </div>
              <div className="services-select-grid">
                {artist?.services?.map((service) => (
                  <label
                    key={service.id}
                    className={`service-select-card ${form.serviceId === String(service.id) ? 'service-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="serviceId"
                      value={String(service.id)}
                      checked={form.serviceId === String(service.id)}
                      onChange={handleChange}
                      className="service-radio"
                    />
                    <div className="service-select-name">{service.name}</div>
                    <div className="service-select-duration">⏱ {service.duration}</div>
                    <div className="service-select-price">{service.price?.toLocaleString('ar-SA')} ر.س</div>
                  </label>
                ))}
              </div>
              {errors.serviceId && <span className="field-error">{errors.serviceId}</span>}
            </div>

            {/* Step 2: Date & Time */}
            <div className="booking-step">
              <div className="booking-step-header">
                <span className="booking-step-num">2</span>
                <h3>اختاري التاريخ والوقت</h3>
              </div>
              <div className="datetime-grid">
                <div className="booking-field">
                  <label className="booking-label">التاريخ *</label>
                  <select name="date" value={form.date} onChange={handleChange} className="booking-select">
                    <option value="">اختاري التاريخ</option>
                    {artist?.availableDates?.map((d) => (
                      <option key={d} value={d}>
                        {new Date(d).toLocaleDateString('ar-SA', {
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                        })}
                      </option>
                    ))}
                  </select>
                  {errors.date && <span className="field-error">{errors.date}</span>}
                </div>
                <div className="booking-field">
                  <label className="booking-label">الوقت *</label>
                  <div className="time-chips-select">
                    {artist?.availableTimes?.map((t) => (
                      <label key={t} className={`time-select-chip ${form.time === t ? 'time-selected' : ''}`}>
                        <input
                          type="radio"
                          name="time"
                          value={t}
                          checked={form.time === t}
                          onChange={handleChange}
                          className="time-radio"
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                  {errors.time && <span className="field-error">{errors.time}</span>}
                </div>
              </div>
            </div>

            {/* Step 3: Location */}
            <div className="booking-step">
              <div className="booking-step-header">
                <span className="booking-step-num">3</span>
                <h3>نوع الخدمة</h3>
              </div>
              <div className="location-type-grid">
                {[
                  { value: 'home', label: 'في البيت', icon: '🏠', desc: 'الآرتست تأتي إليك' },
                  { value: 'studio', label: 'عند الآرتست', icon: '✨', desc: 'تذهبين لستوديوها' },
                ].map((opt) => (
                  <label key={opt.value} className={`location-type-card ${form.locationType === opt.value ? 'location-selected' : ''}`}>
                    <input
                      type="radio"
                      name="locationType"
                      value={opt.value}
                      checked={form.locationType === opt.value}
                      onChange={handleChange}
                      className="location-radio"
                    />
                    <span className="location-icon">{opt.icon}</span>
                    <strong>{opt.label}</strong>
                    <span className="location-desc">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 4: Notes */}
            <div className="booking-step">
              <div className="booking-step-header">
                <span className="booking-step-num">4</span>
                <h3>ملاحظات إضافية (اختياري)</h3>
              </div>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="أي تفاصيل إضافية تودين إخبار الآرتست بها (نوع اللوك، مناسبة خاصة، ...)"
                className="booking-notes-field"
                rows={3}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={submitting}>
              تأكيد الحجز ودفع العربون 💳
            </Button>
          </form>

          {/* Payment Box */}
          <div className="booking-payment-side">
            <PaymentBox
              service={selectedService}
              price={selectedService?.price ?? 0}
              paymentMethod={form.paymentMethod}
              onPaymentMethodChange={(m) => setForm((p) => ({ ...p, paymentMethod: m }))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
