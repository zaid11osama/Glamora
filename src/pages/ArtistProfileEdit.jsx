import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ArtistProfileEdit.css'
import { updateArtistProfile } from '../services/api.js'
import { mockArtists, cities, areasByCity } from '../data/mockData.js'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import Select from '../components/Select.jsx'

export default function ArtistProfileEdit() {
  const navigate = useNavigate()
  const baseArtist = mockArtists[0]

  const [form, setForm] = useState({
    businessName: baseArtist.businessName,
    bio: baseArtist.bio,
    city: baseArtist.city,
    area: baseArtist.area,
    providesHomeService: baseArtist.providesHomeService,
    providesStudioService: baseArtist.providesStudioService ?? false,
    services: baseArtist.services.map((s) => ({ ...s })),
    availableDates: baseArtist.availableDates.join(', '),
    availableTimes: baseArtist.availableTimes.join(', '),
  })

  const [portfolioImages, setPortfolioImages] = useState(baseArtist.portfolioImages)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'city' ? { area: '' } : {}),
    }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleServiceChange = (index, field, value) => {
    setForm((prev) => {
      const services = [...prev.services]
      services[index] = { ...services[index], [field]: value }
      return { ...prev, services }
    })
  }

  const addService = () => {
    setForm((prev) => ({
      ...prev,
      services: [...prev.services, { id: Date.now(), name: '', price: '', duration: '' }],
    }))
  }

  const removeService = (index) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
  }

  const handlePortfolioUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Mock: add a placeholder URL
    const mockUrl = `https://picsum.photos/seed/${Date.now()}/400/500`
    setPortfolioImages((prev) => [...prev, mockUrl])
  }

  const removePortfolioImage = (index) => {
    setPortfolioImages((prev) => prev.filter((_, i) => i !== index))
  }

  const validate = () => {
    const errs = {}
    if (!form.businessName.trim()) errs.businessName = 'الاسم التجاري مطلوب'
    if (!form.bio.trim() || form.bio.length < 20) errs.bio = 'النبذة يجب أن تكون 20 حرفاً على الأقل'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSaving(true)
    try {
      await updateArtistProfile(baseArtist.id, { ...form, portfolioImages })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setErrors({ general: 'حدث خطأ في الحفظ. يرجى المحاولة مجدداً' })
    } finally {
      setSaving(false)
    }
  }

  const areas = form.city ? (areasByCity[form.city] ?? []).map((a) => ({ value: a, label: a })) : []
  const cityOptions = cities.map((c) => ({ value: c, label: c }))

  return (
    <div className="profile-edit-page">
      <div className="profile-edit-header">
        <div className="container">
          <button className="profile-edit-back" onClick={() => navigate('/artist/dashboard')}>
            ← العودة للوحة التحكم
          </button>
          <h1 className="profile-edit-title">تعديل الملف الشخصي</h1>
          <p className="profile-edit-subtitle">حدّثي معلوماتك وخدماتك وصور بورتفوليوك</p>
        </div>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit} className="profile-edit-form" noValidate>
          {saved && (
            <div className="save-success-banner">
              ✅ تم حفظ التغييرات بنجاح!
            </div>
          )}
          {errors.general && (
            <div className="save-error-banner">⚠️ {errors.general}</div>
          )}

          <div className="profile-edit-layout">
            {/* Left column */}
            <div className="profile-edit-main">
              {/* Basic Info */}
              <div className="edit-section">
                <h2 className="edit-section-title">📋 المعلومات الأساسية</h2>
                <div className="edit-section-body">
                  <Input
                    label="الاسم التجاري"
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    error={errors.businessName}
                    required
                    icon="✨"
                  />
                  <Input
                    label="نبذة تعريفية"
                    name="bio"
                    type="textarea"
                    value={form.bio}
                    onChange={handleChange}
                    error={errors.bio}
                    required
                    rows={5}
                    hint={`${form.bio.length} حرف`}
                    placeholder="أخبري العميلات عن نفسك وخبرتك..."
                  />
                  <div className="form-row">
                    <Select
                      label="المدينة"
                      name="city"
                      options={cityOptions}
                      value={form.city}
                      onChange={handleChange}
                      icon="🏙"
                    />
                    <Select
                      label="الحي"
                      name="area"
                      options={areas}
                      value={form.area}
                      onChange={handleChange}
                      disabled={!form.city}
                      icon="📌"
                    />
                  </div>

                  <div className="service-toggles">
                    <label className="edit-toggle-label">
                      <input
                        type="checkbox"
                        name="providesHomeService"
                        checked={form.providesHomeService}
                        onChange={handleChange}
                      />
                      <div className={`edit-toggle-switch ${form.providesHomeService ? 'toggle-on' : ''}`} />
                      <span>🏠 تقديم خدمة منزلية</span>
                    </label>
                    <label className="edit-toggle-label">
                      <input
                        type="checkbox"
                        name="providesStudioService"
                        checked={form.providesStudioService}
                        onChange={handleChange}
                      />
                      <div className={`edit-toggle-switch ${form.providesStudioService ? 'toggle-on' : ''}`} />
                      <span>✨ تقديم خدمة الستوديو</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Services & Prices */}
              <div className="edit-section">
                <h2 className="edit-section-title">💅 الخدمات والأسعار</h2>
                <div className="edit-section-body">
                  {form.services.map((service, index) => (
                    <div key={service.id} className="service-edit-row">
                      <div className="service-edit-fields">
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                          placeholder="اسم الخدمة"
                          className="service-edit-input"
                        />
                        <input
                          type="number"
                          value={service.price}
                          onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                          placeholder="السعر (ر.س)"
                          className="service-edit-input service-price-input"
                        />
                        <input
                          type="text"
                          value={service.duration}
                          onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                          placeholder="المدة"
                          className="service-edit-input service-duration-input"
                        />
                      </div>
                      <button
                        type="button"
                        className="service-remove-btn"
                        onClick={() => removeService(index)}
                        aria-label="حذف الخدمة"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addService} icon="＋">
                    إضافة خدمة
                  </Button>
                </div>
              </div>

              {/* Availability */}
              <div className="edit-section">
                <h2 className="edit-section-title">📅 المواعيد المتاحة</h2>
                <div className="edit-section-body">
                  <Input
                    label="الأيام المتاحة (مفصولة بفواصل، صيغة YYYY-MM-DD)"
                    name="availableDates"
                    value={form.availableDates}
                    onChange={handleChange}
                    placeholder="2026-05-10, 2026-05-12, ..."
                    hint="أدخلي التواريخ مفصولة بفواصل"
                    icon="📅"
                  />
                  <Input
                    label="الأوقات المتاحة (مفصولة بفواصل)"
                    name="availableTimes"
                    value={form.availableTimes}
                    onChange={handleChange}
                    placeholder="10:00, 12:00, 14:00, ..."
                    hint="أدخلي الأوقات بصيغة HH:MM"
                    icon="⏰"
                  />
                </div>
              </div>
            </div>

            {/* Right column - Portfolio */}
            <div className="profile-edit-sidebar">
              <div className="edit-section">
                <h2 className="edit-section-title">🖼 صور البورتفوليو</h2>
                <div className="edit-section-body">
                  {/* Upload button */}
                  <label className="portfolio-upload-btn">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePortfolioUpload}
                      className="portfolio-upload-input"
                    />
                    <span className="portfolio-upload-icon">📷</span>
                    <span>رفع صورة جديدة</span>
                    <span className="portfolio-upload-hint">JPG, PNG (حد أقصى 5MB)</span>
                  </label>

                  {/* Gallery preview */}
                  <div className="portfolio-preview-grid">
                    {portfolioImages.map((src, i) => (
                      <div key={i} className="portfolio-preview-item">
                        <img src={src} alt={`صورة ${i + 1}`} className="portfolio-preview-img" />
                        <button
                          type="button"
                          className="portfolio-remove-btn"
                          onClick={() => removePortfolioImage(i)}
                          aria-label="حذف الصورة"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="portfolio-count">{portfolioImages.length} صورة في البورتفوليو</p>
                </div>
              </div>

              {/* Save button */}
              <div className="edit-save-section">
                <Button type="submit" variant="primary" size="lg" fullWidth loading={saving}>
                  💾 حفظ التغييرات
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  fullWidth
                  onClick={() => navigate('/artist/dashboard')}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
