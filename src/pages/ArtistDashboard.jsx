import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ArtistDashboard.css'
import { getArtistBookings } from '../services/api.js'
import { mockArtists } from '../data/mockData.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import BookingCard from '../components/BookingCard.jsx'
import Badge from '../components/Badge.jsx'
import Button from '../components/Button.jsx'

export default function ArtistDashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('today')
  const navigate = useNavigate()

  // Use mock artist (first one as logged-in artist)
  const artist = mockArtists[0]

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getArtistBookings(1)
        setBookings(data.bookings)
      } catch {
        setBookings([])
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const todayStr = new Date().toISOString().split('T')[0]
  const todayBookings = bookings.filter((b) => b.date === todayStr)
  const upcomingBookings = bookings.filter((b) => b.date > todayStr)
  const pastBookings = bookings.filter((b) => b.date < todayStr || b.status === 'completed')

  const earnings = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + (b.depositPaid ?? 0), 0)

  const profileCompletion = 85 // mock value

  return (
    <div className="artist-dashboard">
      {/* Header */}
      <div className="artist-dash-header">
        <div className="container">
          <div className="artist-dash-header-content">
            <div className="artist-dash-welcome">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="artist-dash-avatar"
              />
              <div>
                <h1 className="artist-dash-title">أهلاً، {artist.name.split(' ')[0]} 👋</h1>
                <p className="artist-dash-subtitle">{artist.businessName}</p>
                <div className="artist-dash-badges">
                  <Badge variant="success" dot>متاحة للحجز</Badge>
                  <Badge variant="gold" icon="⭐">{artist.rating} تقييم</Badge>
                  <Badge variant="info">{artist.city}</Badge>
                </div>
              </div>
            </div>
            <div className="artist-dash-actions">
              <Button variant="outline" size="sm" onClick={() => navigate('/artist/profile/edit')}>
                ✏️ تعديل الملف
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/artist/profile/edit')}>
                ⚙️ إدارة الخدمات
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="artist-dash-body">
          {/* ============ STATS CARDS ============ */}
          <div className="artist-stats-grid">
            <div className="artist-stat-card artist-stat-primary">
              <div className="artist-stat-icon">📅</div>
              <div className="artist-stat-value">{bookings.length}</div>
              <div className="artist-stat-label">إجمالي الحجوزات</div>
            </div>
            <div className="artist-stat-card artist-stat-success">
              <div className="artist-stat-icon">✅</div>
              <div className="artist-stat-value">{todayBookings.length}</div>
              <div className="artist-stat-label">حجوزات اليوم</div>
            </div>
            <div className="artist-stat-card artist-stat-gold">
              <div className="artist-stat-icon">💰</div>
              <div className="artist-stat-value">{earnings.toLocaleString('ar-SA')}</div>
              <div className="artist-stat-label">إجمالي العربون (ر.س)</div>
            </div>
            <div className="artist-stat-card artist-stat-lavender">
              <div className="artist-stat-icon">⭐</div>
              <div className="artist-stat-value">{artist.rating}</div>
              <div className="artist-stat-label">متوسط التقييم</div>
            </div>
          </div>

          <div className="artist-dash-main">
            {/* ============ LEFT COLUMN ============ */}
            <div className="artist-dash-left">
              {/* Profile Completion */}
              <div className="profile-completion-card">
                <div className="completion-header">
                  <h3>اكتمال الملف الشخصي</h3>
                  <span className="completion-percent">{profileCompletion}٪</span>
                </div>
                <div className="completion-bar-wrap">
                  <div
                    className="completion-bar-fill"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
                <div className="completion-tips">
                  <p className="completion-tip">✅ صور البورتفوليو مضافة</p>
                  <p className="completion-tip">✅ الخدمات والأسعار محددة</p>
                  <p className="completion-tip completion-tip-todo">⬜ أضيفي أوقات توفرك</p>
                </div>
                <Link to="/artist/profile/edit" className="completion-edit-btn">
                  أكملي ملفك الآن ←
                </Link>
              </div>

              {/* Availability Quick View */}
              <div className="dash-card">
                <div className="dash-card-header">
                  <h3>📅 مواعيدك هذا الشهر</h3>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/artist/profile/edit')}>
                    تعديل
                  </Button>
                </div>
                <div className="availability-mini-calendar">
                  {artist.availableDates.map((d) => (
                    <div key={d} className="mini-date-chip">
                      {new Date(d).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="dash-card">
                <div className="dash-card-header">
                  <h3>💰 ملخص الأرباح</h3>
                </div>
                <div className="earnings-summary">
                  <div className="earnings-row">
                    <span>عربون مستلم</span>
                    <span className="earnings-value">{earnings.toLocaleString('ar-SA')} ر.س</span>
                  </div>
                  <div className="earnings-row">
                    <span>حجوزات مكتملة</span>
                    <span className="earnings-value">{pastBookings.length}</span>
                  </div>
                  <div className="earnings-row">
                    <span>حجوزات قادمة</span>
                    <span className="earnings-value earnings-highlight">{upcomingBookings.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ RIGHT COLUMN - BOOKINGS ============ */}
            <div className="artist-dash-right">
              <div className="bookings-section">
                <div className="bookings-section-header">
                  <h2>الحجوزات</h2>
                </div>

                {/* Tabs */}
                <div className="bookings-tabs">
                  {[
                    { id: 'today', label: `اليوم (${todayBookings.length})` },
                    { id: 'upcoming', label: `القادمة (${upcomingBookings.length})` },
                    { id: 'past', label: `السابقة (${pastBookings.length})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`bookings-tab ${activeTab === tab.id ? 'bookings-tab-active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {loading ? (
                  <LoadingSpinner text="جاري تحميل الحجوزات..." />
                ) : (
                  <div className="bookings-list">
                    {activeTab === 'today' && (
                      todayBookings.length ? (
                        todayBookings.map((b) => <BookingCard key={b.id} booking={b} />)
                      ) : (
                        <div className="no-bookings">
                          <span>☀️</span>
                          <p>لا توجد حجوزات اليوم</p>
                        </div>
                      )
                    )}
                    {activeTab === 'upcoming' && (
                      upcomingBookings.length ? (
                        upcomingBookings.map((b) => <BookingCard key={b.id} booking={b} />)
                      ) : (
                        <div className="no-bookings">
                          <span>📅</span>
                          <p>لا توجد حجوزات قادمة بعد</p>
                        </div>
                      )
                    )}
                    {activeTab === 'past' && (
                      pastBookings.length ? (
                        pastBookings.map((b) => <BookingCard key={b.id} booking={b} />)
                      ) : (
                        <div className="no-bookings">
                          <span>📋</span>
                          <p>لا توجد حجوزات سابقة</p>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
