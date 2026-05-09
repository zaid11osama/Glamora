import { useState } from 'react'
import './SearchFilters.css'
import Button from './Button.jsx'
import { cities, areasByCity, serviceTypes } from '../data/mockData.js'

/**
 * Search and filter panel for finding makeup artists
 */
export default function SearchFilters({ onSearch, loading = false }) {
  const [filters, setFilters] = useState({
    city: '',
    area: '',
    date: '',
    serviceType: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'rating',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      // Reset area when city changes
      ...(name === 'city' ? { area: '' } : {}),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(filters)
  }

  const handleReset = () => {
    const empty = { city: '', area: '', date: '', serviceType: '', minPrice: '', maxPrice: '', sortBy: 'rating' }
    setFilters(empty)
    onSearch?.(empty)
  }

  const availableAreas = filters.city ? areasByCity[filters.city] ?? [] : []

  const today = new Date().toISOString().split('T')[0]

  return (
    <form className="search-filters" onSubmit={handleSubmit} noValidate>
      <div className="filters-grid">
        {/* City */}
        <div className="filter-group">
          <label className="filter-label">المدينة</label>
          <div className="filter-select-wrap">
            <span className="filter-icon">🏙</span>
            <select name="city" value={filters.city} onChange={handleChange} className="filter-select">
              <option value="">كل المدن</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Area */}
        <div className="filter-group">
          <label className="filter-label">الحي / المنطقة</label>
          <div className="filter-select-wrap">
            <span className="filter-icon">📌</span>
            <select
              name="area"
              value={filters.area}
              onChange={handleChange}
              disabled={!filters.city}
              className="filter-select"
            >
              <option value="">كل الأحياء</option>
              {availableAreas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="filter-group">
          <label className="filter-label">التاريخ</label>
          <div className="filter-input-wrap">
            <span className="filter-icon">📅</span>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
              min={today}
              className="filter-input"
            />
          </div>
        </div>

        {/* Service type */}
        <div className="filter-group">
          <label className="filter-label">نوع الخدمة</label>
          <div className="filter-select-wrap">
            <span className="filter-icon">💅</span>
            <select name="serviceType" value={filters.serviceType} onChange={handleChange} className="filter-select">
              <option value="">الكل</option>
              {serviceTypes.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price range */}
        <div className="filter-group filter-price-group">
          <label className="filter-label">نطاق السعر (ر.س)</label>
          <div className="filter-price-range">
            <div className="filter-input-wrap">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="من"
                min="0"
                className="filter-input price-input"
              />
            </div>
            <span className="price-separator">—</span>
            <div className="filter-input-wrap">
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="إلى"
                min="0"
                className="filter-input price-input"
              />
            </div>
          </div>
        </div>

        {/* Sort */}
        <div className="filter-group">
          <label className="filter-label">ترتيب حسب</label>
          <div className="filter-select-wrap">
            <span className="filter-icon">↕️</span>
            <select name="sortBy" value={filters.sortBy} onChange={handleChange} className="filter-select">
              <option value="rating">الأعلى تقييماً</option>
              <option value="reviews">الأكثر تقييمات</option>
              <option value="price_asc">السعر: من الأقل</option>
              <option value="price_desc">السعر: من الأعلى</option>
            </select>
          </div>
        </div>
      </div>

      <div className="filters-actions">
        <Button type="submit" variant="primary" size="md" loading={loading} icon="🔍">
          ابحثي الآن
        </Button>
        <button type="button" className="filter-reset-btn" onClick={handleReset}>
          مسح الفلاتر
        </button>
      </div>
    </form>
  )
}
