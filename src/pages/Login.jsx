import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { loginUser } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'

export default function Login() {
  const [role, setRole] = useState('customer')
  const [form, setForm] = useState({ phone: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  const validate = () => {
    const errs = {}
    if (!form.phone.trim()) errs.phone = 'رقم الهاتف مطلوب'
    else if (!/^05\d{8}$/.test(form.phone)) errs.phone = 'رقم الهاتف غير صحيح (مثال: 05XXXXXXXX)'
    if (!form.password) errs.password = 'كلمة المرور مطلوبة'
    else if (form.password.length < 6) errs.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setApiError('')
    try {
      const data = await loginUser({ ...form, role })
      login(data.user, role)
      navigate(role === 'artist' ? '/artist/dashboard' : '/customer/dashboard')
    } catch (err) {
      setApiError(err.message ?? 'حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-split">
        {/* Left visual */}
        <div className="auth-visual">
          <img src="https://picsum.photos/seed/login_hero/600/800" alt="" className="auth-visual-img" />
          <div className="auth-visual-overlay" />
          <div className="auth-visual-content">
            <div className="auth-visual-logo">💄 Glamora</div>
            <h2 className="auth-visual-title">أهلاً بك مجدداً ✨</h2>
            <p className="auth-visual-text">منصة الميكب الأولى في المملكة. تألقي بثقة</p>
          </div>
        </div>

        {/* Form side */}
        <div className="auth-form-side">
          <div className="auth-form-container">
            <div className="auth-logo-mobile">
              <Link to="/" className="auth-logo-link">💄 <span>Glamora</span></Link>
            </div>

            <div className="auth-form-header">
              <h1 className="auth-form-title">تسجيل الدخول</h1>
              <p className="auth-form-subtitle">أدخلي بياناتك للمتابعة</p>
            </div>

            {/* Role Switch */}
            <div className="role-switch">
              <button
                type="button"
                className={`role-btn ${role === 'customer' ? 'role-active' : ''}`}
                onClick={() => setRole('customer')}
              >
                👤 عميلة
              </button>
              <button
                type="button"
                className={`role-btn ${role === 'artist' ? 'role-active' : ''}`}
                onClick={() => setRole('artist')}
              >
                💄 ميكب آرتست
              </button>
            </div>

            {apiError && (
              <div className="auth-api-error" role="alert">
                <span>⚠️</span> {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
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
              <Input
                label="كلمة المرور"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                required
                icon="🔒"
              />

              <div className="auth-form-actions">
                <a href="#" className="forgot-password-link">نسيتِ كلمة المرور؟</a>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                تسجيل الدخول
              </Button>
            </form>

            <div className="auth-divider">
              <span>أو</span>
            </div>

            <div className="auth-alt-action">
              <p>
                ليس لديكِ حساب؟{' '}
                <Link to="/register/customer" className="auth-link">
                  أنشئي حساباً الآن
                </Link>
              </p>
              <p>
                ميكب آرتست؟{' '}
                <Link to="/register/artist" className="auth-link">
                  سجلي هنا
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
