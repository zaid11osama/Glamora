import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, userType, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const closeMenu = () => setMenuOpen(false)

  const isActive = (path) => location.pathname === path

  return (
    <header className="navbar">
      <div className="navbar-container container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo-icon">💄</span>
          <span className="navbar-logo-text">Glamora</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar-nav" aria-label="القائمة الرئيسية">
          <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>
            الرئيسية
          </Link>
          <Link
            to="/customer/dashboard"
            className={`nav-link ${isActive('/customer/dashboard') ? 'nav-link-active' : ''}`}
          >
            ابحثي عن آرتست
          </Link>
          {!user && (
            <Link
              to="/register/artist"
              className={`nav-link ${isActive('/register/artist') ? 'nav-link-active' : ''}`}
            >
              انضمي كآرتست
            </Link>
          )}
          {user && userType === 'artist' && (
            <Link
              to="/artist/dashboard"
              className={`nav-link ${isActive('/artist/dashboard') ? 'nav-link-active' : ''}`}
            >
              لوحة الآرتست
            </Link>
          )}
          <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'nav-link-active' : ''}`}>
            الإدارة
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="navbar-auth">
          {user ? (
            <div className="navbar-user">
              <span className="navbar-user-name">أهلاً، {user.name?.split(' ')[0]}</span>
              <button className="navbar-logout-btn" onClick={handleLogout}>
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-login-btn">
                تسجيل الدخول
              </Link>
              <Link to="/register/customer" className="nav-register-btn">
                إنشاء حساب
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`navbar-hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="فتح القائمة"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <nav className="mobile-nav">
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>🏠 الرئيسية</Link>
          <Link to="/customer/dashboard" className="mobile-nav-link" onClick={closeMenu}>🔍 ابحثي عن آرتست</Link>
          {!user && (
            <Link to="/register/artist" className="mobile-nav-link" onClick={closeMenu}>💄 انضمي كآرتست</Link>
          )}
          {user && userType === 'artist' && (
            <Link to="/artist/dashboard" className="mobile-nav-link" onClick={closeMenu}>📊 لوحة الآرتست</Link>
          )}
          <Link to="/admin" className="mobile-nav-link" onClick={closeMenu}>⚙️ الإدارة</Link>
        </nav>
        <div className="mobile-auth">
          {user ? (
            <>
              <p className="mobile-user-name">أهلاً، {user.name}</p>
              <button className="mobile-logout-btn" onClick={handleLogout}>تسجيل الخروج</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-auth-btn mobile-login-btn" onClick={closeMenu}>تسجيل الدخول</Link>
              <Link to="/register/customer" className="mobile-auth-btn mobile-register-btn" onClick={closeMenu}>إنشاء حساب</Link>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  )
}
