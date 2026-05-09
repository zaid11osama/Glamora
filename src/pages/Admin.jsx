import { useState, useEffect } from 'react'
import './Admin.css'
import { getAdminStats } from '../services/api.js'
import { mockArtists, mockBookings } from '../data/mockData.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import Badge from '../components/Badge.jsx'

export default function Admin() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner fullPage text="جاري تحميل لوحة الإدارة..." />

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <div>
              <h1 className="admin-title">⚙️ لوحة الإدارة</h1>
              <p className="admin-subtitle">نظرة عامة على منصة Glamora</p>
            </div>
            <div className="admin-header-badge">
              <Badge variant="error" dot>تجريبية — للعرض فقط</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Overview Stats */}
        <div className="admin-stats-grid">
          {[
            { icon: '👥', label: 'إجمالي المستخدمين', value: stats?.totalUsers?.toLocaleString('ar-SA'), color: 'primary', change: '+12٪' },
            { icon: '💄', label: 'الميكب آرتست', value: stats?.totalArtists?.toLocaleString('ar-SA'), color: 'secondary', change: '+8٪' },
            { icon: '📅', label: 'إجمالي الحجوزات', value: stats?.totalBookings?.toLocaleString('ar-SA'), color: 'success', change: '+18٪' },
            { icon: '💰', label: 'الإيرادات (ر.س)', value: stats?.totalRevenue?.toLocaleString('ar-SA'), color: 'gold', change: `+${stats?.monthlyGrowth}٪` },
          ].map((stat) => (
            <div className={`admin-stat-card admin-stat-${stat.color}`} key={stat.label}>
              <div className="admin-stat-header">
                <span className="admin-stat-icon">{stat.icon}</span>
                <span className="admin-stat-change">{stat.change}</span>
              </div>
              <div className="admin-stat-value">{stat.value}</div>
              <div className="admin-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          {[
            { id: 'overview', label: '📊 نظرة عامة' },
            { id: 'artists', label: `💄 الآرتست (${mockArtists.length})` },
            { id: 'bookings', label: `📅 الحجوزات (${mockBookings.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`admin-tab ${activeTab === tab.id ? 'admin-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="admin-overview">
            <div className="admin-overview-grid">
              {/* Today Activity */}
              <div className="admin-card">
                <h3 className="admin-card-title">📈 نشاط اليوم</h3>
                <div className="admin-activity-list">
                  {[
                    { label: 'حجوزات اليوم', value: stats?.activeBookingsToday, icon: '📅', color: 'success' },
                    { label: 'آرتست جديدة (بانتظار الموافقة)', value: stats?.pendingArtists, icon: '⏳', color: 'warning' },
                    { label: 'عملاء جدد اليوم', value: 8, icon: '👤', color: 'primary' },
                    { label: 'إيرادات اليوم (ر.س)', value: '4,200', icon: '💰', color: 'gold' },
                  ].map((item) => (
                    <div key={item.label} className="admin-activity-item">
                      <div className="admin-activity-left">
                        <span className="admin-activity-icon">{item.icon}</span>
                        <span className="admin-activity-label">{item.label}</span>
                      </div>
                      <span className={`admin-activity-value admin-value-${item.color}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Cities */}
              <div className="admin-card">
                <h3 className="admin-card-title">🌆 أفضل المدن</h3>
                <div className="admin-cities-list">
                  {stats?.topCities?.map((city, i) => (
                    <div key={city.city} className="admin-city-item">
                      <div className="admin-city-rank">{i + 1}</div>
                      <div className="admin-city-info">
                        <span className="admin-city-name">{city.city}</span>
                        <div className="admin-city-bar-wrap">
                          <div
                            className="admin-city-bar"
                            style={{ width: `${(city.bookings / stats.topCities[0].bookings) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="admin-city-count">{city.bookings.toLocaleString('ar-SA')} حجز</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="admin-card">
                <h3 className="admin-card-title">⚡ إجراءات سريعة</h3>
                <div className="admin-quick-actions">
                  {[
                    { label: 'الموافقة على الآرتست الجدد', icon: '✅', count: stats?.pendingArtists },
                    { label: 'مراجعة الشكاوى', icon: '📋', count: 3 },
                    { label: 'تقرير الإيرادات', icon: '📊', count: null },
                    { label: 'رسائل الدعم', icon: '💬', count: 7 },
                  ].map((action) => (
                    <button key={action.label} className="admin-action-btn">
                      <span>{action.icon}</span>
                      <span>{action.label}</span>
                      {action.count != null && (
                        <span className="admin-action-badge">{action.count}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'artists' && (
          <div className="admin-artists-table">
            <div className="admin-table-header">
              <h3>قائمة الميكب آرتست</h3>
              <span className="admin-table-count">{mockArtists.length} آرتست</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>الآرتست</th>
                    <th>المدينة</th>
                    <th>التقييم</th>
                    <th>الحجوزات</th>
                    <th>السعر الأدنى</th>
                    <th>الخدمات</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {mockArtists.map((artist, i) => (
                    <tr key={artist.id}>
                      <td className="admin-td-num">{i + 1}</td>
                      <td>
                        <div className="admin-artist-cell">
                          <img
                            src={artist.avatar}
                            alt={artist.name}
                            className="admin-artist-avatar"
                          />
                          <div>
                            <div className="admin-artist-business">{artist.businessName}</div>
                            <div className="admin-artist-name">{artist.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{artist.city}، {artist.area}</td>
                      <td>
                        <span className="admin-rating">⭐ {artist.rating}</span>
                      </td>
                      <td>{artist.reviewsCount?.toLocaleString('ar-SA')}</td>
                      <td>{artist.startingPrice?.toLocaleString('ar-SA')} ر.س</td>
                      <td>
                        <div className="admin-service-badges">
                          {artist.providesHomeService && <Badge variant="success" size="sm">🏠 منزلية</Badge>}
                          {artist.providesStudioService && <Badge variant="secondary" size="sm">✨ ستوديو</Badge>}
                        </div>
                      </td>
                      <td><Badge variant="success" dot>نشطة</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="admin-bookings-table">
            <div className="admin-table-header">
              <h3>قائمة الحجوزات</h3>
              <span className="admin-table-count">{mockBookings.length} حجز</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>العميلة</th>
                    <th>الآرتست</th>
                    <th>الخدمة</th>
                    <th>التاريخ</th>
                    <th>الوقت</th>
                    <th>السعر</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBookings.map((booking, i) => (
                    <tr key={booking.id}>
                      <td className="admin-td-num">{booking.id}</td>
                      <td className="admin-customer-name">{booking.customerName}</td>
                      <td>{booking.artistName}</td>
                      <td>{booking.service}</td>
                      <td>{booking.date}</td>
                      <td>{booking.time}</td>
                      <td>{booking.totalPrice?.toLocaleString('ar-SA')} ر.س</td>
                      <td>
                        <Badge
                          variant={
                            booking.status === 'confirmed' ? 'success' :
                            booking.status === 'pending' ? 'warning' :
                            booking.status === 'completed' ? 'info' : 'error'
                          }
                        >
                          {booking.status === 'confirmed' ? 'مؤكد' :
                           booking.status === 'pending' ? 'قيد الانتظار' :
                           booking.status === 'completed' ? 'مكتمل' : 'ملغي'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
