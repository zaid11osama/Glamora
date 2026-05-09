import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import './CustomerRegister.css'
import './ArtistRegister.css'
import { registerArtist } from '../services/api.js'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import Select from '../components/Select.jsx'
import { cities, areasByCity } from '../data/mockData.js'

export default function ArtistRegister() {
  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    city: '',
    area: '',
    providesHomeService: false,
    avgPrice: '',
    bio: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'city' ? { area: '' } : {}),
    }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.businessName.trim()) errs.businessName = 'الاسم التجاري مطلوب'
    if (!form.ownerName.trim()) errs.ownerName = 'اسم صاحبة الحساب مطلوب'
    if (!form.phone.trim()) errs.phone = 'رقم الهاتف مطلوب'
    else if (!/^05\d{8}$/.test(form.phone)) errs.phone = 'رقم الهاتف غير صحيح'
    if (!form.city) errs.city = 'يرجى اختيار المدينة'
    if (!form.avgPrice) errs.avgPrice = 'متوسط الأسعار مطلوب'
    else if (isNaN(form.avgPrice) || +form.avgPrice < 50) errs.avgPrice = 'يرجى إدخال سعر صحيح (50 ر.س أو أكثر)'
    if (!form.bio.trim()) errs.bio = 'النبذة التعريفية مطلوبة'
    else if (form.bio.length < 30) errs.bio = 'النبذة يجب أن تكون 30 حرفاً على الأقل'
    if (!form.password) errs.password = 'كلمة المرور مطلوبة'
    else if (form.password.length < 8) errs.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
    if (!form.confirmPassword) errs.confirmPassword = 'يرجى تأكيد كلمة المرور'
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'كلمتا المرور غير متطابقتين'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await registerArtist(form)
      setSuccess(true)
    } catch (err) {
      setErrors({ general: err.message ?? 'حدث خطأ. يرجى المحاولة مجدداً' })
    } finally {
      setLoading(false)
    }
  }

  const areas = form.city ? (areasByCity[form.city] ?? []).map((a) => ({ value: a, label: a })) : []
  const cityOptions = cities.map((c) => ({ value: c, label: c }))

  if (success) {
    return (
      <div className="auth-page">
        <div className="register-success">
          <div className="success-icon">💄</div>
          <h2>تم تسجيل طلبك بنجاح!</h2>
          <p>سيتم مراجعة ملفك خلال 24 ساعة وسنتواصل معك على رقم الهاتف المسجل.</p>
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-visual">
          <img src="https://picsum.photos/seed/register_artist/600/800" alt="" className="auth-visual-img" />
          <div className="auth-visual-overlay" />
          <div className="auth-visual-content">
            <div className="auth-visual-logo">💄 Glamora</div>
            <h2 className="auth-visual-title">انضمي إلى مجتمعنا 💅</h2>
            <p className="auth-visual-text">أكثر من 500 ميكب آرتست حقق نجاحه مع Glamora. الدور عليك!</p>
            <div className="artist-join-stats">
              <div className="join-stat">
                <span className="join-stat-num">+500</span>
                <span>آرتست</span>
              </div>
              <div className="join-stat">
                <span className="join-stat-num">+15K</span>
                <span>حجز شهري</span>
              </div>
              <div className="join-stat">
                <span className="join-stat-num">مجاني</span>
                <span>التسجيل</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-form-container artist-register-form">
            <div className="auth-logo-mobile">
              <Link to="/" className="auth-logo-link">💄 <span>Glamora</span></Link>
            </div>

            <div className="auth-form-header">
              <h1 className="auth-form-title">تسجيل كميكب آرتست</h1>
              <p className="auth-form-subtitle">أنشئي ملفك وابدئي باستقبال الحجوزات</p>
            </div>

            {errors.general && (
              <div className="auth-api-error" role="alert">
                <span>⚠️</span> {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className="artist-form-section">
                <h3 className="artist-section-title">📋 المعلومات الأساسية</h3>
                <Input
                  label="الاسم التجاري / اسم الستوديو"
                  name="businessName"
                  placeholder="مثال: ستوديو سارة للميكب"
                  value={form.businessName}
                  onChange={handleChange}
                  error={errors.businessName}
                  required
                  icon="✨"
                />
                <Input
                  label="اسم صاحبة الحساب"
                  name="ownerName"
                  placeholder="الاسم الكامل"
                  value={form.ownerName}
                  onChange={handleChange}
                  error={errors.ownerName}
                  required
                  icon="👤"
                />
                <Input
                  label="رقم الهاتف"
                  name="phone"
                  type="tel"
                  placeholder="05XXXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                  icon="📱"
                />
              </div>

              <div className="artist-form-section">
                <h3 className="artist-section-title">📍 الموقع والخدمات</h3>
                <div className="form-row">
                  <Select
                    label="المدينة"
                    name="city"
                    options={cityOptions}
                    value={form.city}
                    onChange={handleChange}
                    error={errors.city}
                    required
                    placeholder="اختاري مدينتك"
                    icon="🏙"
                  />
                  <Select
                    label="الحي / المنطقة"
                    name="area"
                    options={areas}
                    value={form.area}
                    onChange={handleChange}
                    disabled={!form.city}
                    placeholder="اختاري الحي"
                    icon="📌"
                  />
                </div>

                <label className="home-service-toggle">
                  <input
                    type="checkbox"
                    name="providesHomeService"
                    checked={form.providesHomeService}
                    onChange={handleChange}
                    className="home-service-checkbox"
                  />
                  <div className="toggle-content">
                    <span className="toggle-icon">🏠</span>
                    <div>
                      <strong className="toggle-label">هل تقدمين خدمة منزلية؟</strong>
                      <p className="toggle-desc">ستظهرين في نتائج بحث الخدمة المنزلية</p>
                    </div>
                  </div>
                  <div className={`toggle-switch ${form.providesHomeService ? 'toggle-on' : ''}`} />
                </label>

                <Input
                  label="متوسط أسعارك (ر.س)"
                  name="avgPrice"
                  type="number"
                  placeholder="مثال: 300"
                  value={form.avgPrice}
                  onChange={handleChange}
                  error={errors.avgPrice}
                  required
                  icon="💰"
                  hint="السعر الذي يبدأ من عنده الحجز"
                />
              </div>

              <div className="artist-form-section">
                <h3 className="artist-section-title">📝 نبذة تعريفية</h3>
                <Input
                  label="نبذة قصيرة عنك"
                  name="bio"
                  type="textarea"
                  placeholder="أخبري العميلات عن نفسك، خبرتك، تخصصك..."
                  value={form.bio}
                  onChange={handleChange}
                  error={errors.bio}
                  required
                  rows={4}
                  hint={`${form.bio.length}/500`}
                />
              </div>

              <div className="artist-form-section">
                <h3 className="artist-section-title">🔒 أمان الحساب</h3>
                <Input
                  label="كلمة المرور"
                  name="password"
                  type="password"
                  placeholder="8 أحرف على الأقل"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                  icon="🔒"
                />
                <Input
                  label="تأكيد كلمة المرور"
                  name="confirmPassword"
                  type="password"
                  placeholder="أعيدي كتابة كلمة المرور"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                  icon="🔒"
                />
              </div>

              <div className="register-terms">
                بالتسجيل أنتِ توافقين على{' '}
                <a href="#">شروط الاستخدام</a> و<a href="#">سياسة الخصوصية</a> الخاصة بـ Glamora
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                إرسال طلب التسجيل 💄
              </Button>
            </form>

            <div className="auth-alt-action" style={{ marginTop: 'var(--space-5)' }}>
              <p>
                لديكِ حساب بالفعل؟{' '}
                <Link to="/login" className="auth-link">تسجيل الدخول</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
