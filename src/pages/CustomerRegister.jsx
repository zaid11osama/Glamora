import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import './CustomerRegister.css'
import { registerCustomer } from '../services/api.js'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import Select from '../components/Select.jsx'
import { cities, areasByCity } from '../data/mockData.js'

export default function CustomerRegister() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    area: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'city' ? { area: '' } : {}),
    }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'الاسم مطلوب'
    if (!form.phone.trim()) errs.phone = 'رقم الهاتف مطلوب'
    else if (!/^05\d{8}$/.test(form.phone)) errs.phone = 'رقم الهاتف غير صحيح (مثال: 05XXXXXXXX)'
    if (!form.city) errs.city = 'يرجى اختيار المدينة'
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
      await registerCustomer(form)
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
          <div className="success-icon">🎉</div>
          <h2>تم إنشاء حسابك بنجاح!</h2>
          <p>يمكنك الآن تسجيل الدخول والبدء في البحث عن ميكب آرتستك المثالية</p>
          <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
            تسجيل الدخول
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-visual">
          <img src="https://picsum.photos/seed/register_customer/600/800" alt="" className="auth-visual-img" />
          <div className="auth-visual-overlay" />
          <div className="auth-visual-content">
            <div className="auth-visual-logo">💄 Glamora</div>
            <h2 className="auth-visual-title">أنشئي حسابك مجاناً ✨</h2>
            <p className="auth-visual-text">ابدئي رحلة تألقك مع أفضل الميكب آرتست في مدينتك</p>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-form-container">
            <div className="auth-logo-mobile">
              <Link to="/" className="auth-logo-link">💄 <span>Glamora</span></Link>
            </div>

            <div className="auth-form-header">
              <h1 className="auth-form-title">إنشاء حساب عميلة</h1>
              <p className="auth-form-subtitle">سجلي وابدئي البحث عن آرتستك المثالية</p>
            </div>

            {errors.general && (
              <div className="auth-api-error" role="alert">
                <span>⚠️</span> {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <Input
                label="الاسم الكامل"
                name="name"
                placeholder="مثال: لجين المطيري"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
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

              <div className="register-terms">
                بالتسجيل أنتِ توافقين على{' '}
                <a href="#">شروط الاستخدام</a> و<a href="#">سياسة الخصوصية</a>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                إنشاء الحساب
              </Button>
            </form>

            <div className="auth-alt-action" style={{ marginTop: 'var(--space-5)' }}>
              <p>
                لديكِ حساب بالفعل؟{' '}
                <Link to="/login" className="auth-link">تسجيل الدخول</Link>
              </p>
              <p>
                ميكب آرتست؟{' '}
                <Link to="/register/artist" className="auth-link">سجلي هنا</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
