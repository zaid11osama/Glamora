import { useState, useEffect } from 'react'
import './CustomerDashboard.css'
import SearchFilters from '../components/SearchFilters.jsx'
import ArtistCard from '../components/ArtistCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Button from '../components/Button.jsx'
import { searchArtists, getArtists } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function CustomerDashboard() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [hasSearched, setHasSearched] = useState(false)
  const { user } = useAuth()

  // Load all artists on mount
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists({ limit: 20 })
        setArtists(data.artists)
        setTotalResults(data.total)
      } catch {
        setArtists([])
      } finally {
        setLoading(false)
      }
    }
    fetchArtists()
  }, [])

  const handleSearch = async (filters) => {
    setSearching(true)
    setHasSearched(true)
    try {
      const data = await searchArtists(filters)
      setArtists(data.artists)
      setTotalResults(data.total)
    } catch {
      setArtists([])
      setTotalResults(0)
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="customer-dashboard">
      {/* Header */}
      <div className="dashboard-hero">
        <div className="container">
          <div className="dashboard-hero-content">
            <div className="dashboard-greeting">
              {user ? (
                <>
                  <h1>أهلاً، {user.name?.split(' ')[0]} 👋</h1>
                  <p>ابحثي عن ميكب آرتستك المثالية اليوم</p>
                </>
              ) : (
                <>
                  <h1>ابحثي عن ميكب آرتستك 💄</h1>
                  <p>اختاري من أفضل الميكب آرتست في مدينتك</p>
                </>
              )}
            </div>
            <div className="dashboard-quick-stats">
              <div className="quick-stat">
                <span className="quick-stat-icon">💄</span>
                <span>+500 آرتست</span>
              </div>
              <div className="quick-stat">
                <span className="quick-stat-icon">⭐</span>
                <span>تقييمات حقيقية</span>
              </div>
              <div className="quick-stat">
                <span className="quick-stat-icon">🏠</span>
                <span>خدمة منزلية</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Filters */}
      <div className="dashboard-search-section">
        <div className="container">
          <h2 className="search-section-title">ابحثي بفلاتر تناسبك</h2>
          <SearchFilters onSearch={handleSearch} loading={searching} />
        </div>
      </div>

      {/* Results */}
      <div className="dashboard-results-section">
        <div className="container">
          <div className="results-header">
            <h2 className="results-title">
              {hasSearched ? 'نتائج البحث' : 'جميع الميكب آرتست'}
            </h2>
            {!loading && (
              <span className="results-count">
                {totalResults} آرتست {hasSearched ? 'مطابقة' : 'متاحة'}
              </span>
            )}
          </div>

          {loading ? (
            <LoadingSpinner fullPage text="جاري تحميل الآرتست..." />
          ) : searching ? (
            <LoadingSpinner fullPage text="جاري البحث..." />
          ) : artists.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="لا توجد نتائج"
              description="لم نجد ميكب آرتست تطابق بحثك. حاولي تغيير الفلاتر أو توسيع نطاق البحث"
              action={
                <Button variant="primary" onClick={() => handleSearch({})}>
                  عرض جميع الآرتست
                </Button>
              }
            />
          ) : (
            <div className="artists-results-grid">
              {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
