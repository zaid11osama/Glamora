import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-main container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">💄</span>
            <span className="footer-logo-text">Glamora</span>
          </Link>
          <p className="footer-tagline">
            منصة حجز الميكب آرتست الأولى في المملكة.
            <br />
            نربط العميلات بأفضل الميكب آرتست.
          </p>
          <div className="footer-social">
            <a href="#" className="footer-social-btn" aria-label="تويتر">𝕏</a>
            <a href="#" className="footer-social-btn" aria-label="انستقرام">📸</a>
            <a href="#" className="footer-social-btn" aria-label="تيك توك">🎵</a>
            <a href="#" className="footer-social-btn" aria-label="سناب شات">👻</a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-links-title">للعميلات</h4>
          <ul className="footer-links">
            <li><Link to="/customer/dashboard">ابحثي عن آرتست</Link></li>
            <li><Link to="/register/customer">إنشاء حساب</Link></li>
            <li><Link to="/login">تسجيل الدخول</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-links-title">للميكب آرتست</h4>
          <ul className="footer-links">
            <li><Link to="/register/artist">انضمي إلينا</Link></li>
            <li><Link to="/artist/dashboard">لوحة التحكم</Link></li>
            <li><Link to="/artist/profile/edit">تعديل الملف</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-links-title">مزيد من المعلومات</h4>
          <ul className="footer-links">
            <li><a href="#">من نحن</a></li>
            <li><a href="#">اتصل بنا</a></li>
            <li><a href="#">سياسة الخصوصية</a></li>
            <li><a href="#">الشروط والأحكام</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4 className="footer-links-title">تواصلي معنا</h4>
          <div className="footer-contact-items">
            <p>📧 hello@glamora.sa</p>
            <p>📞 920-XXX-XXX</p>
            <p>📍 الرياض، المملكة العربية السعودية</p>
          </div>
          <div className="footer-app-badges">
            <div className="app-badge">
              <span className="app-badge-icon">🍎</span>
              <div>
                <small>متوفر على</small>
                <strong>App Store</strong>
              </div>
            </div>
            <div className="app-badge">
              <span className="app-badge-icon">🤖</span>
              <div>
                <small>احصلي عليه من</small>
                <strong>Google Play</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copyright">
            © {year} Glamora. جميع الحقوق محفوظة. صُنع بـ 💕 في المملكة العربية السعودية
          </p>
          <div className="footer-payment-icons">
            <span className="payment-icon">💳 مدى</span>
            <span className="payment-icon">💳 Visa</span>
            <span className="payment-icon">💳 Mastercard</span>
            <span className="payment-icon">📱 Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
