import { useState } from 'react'
import './PortfolioGallery.css'

/**
 * Portfolio image gallery with lightbox
 */
export default function PortfolioGallery({ images = [], artistName = '' }) {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const openLightbox = (index) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const goPrev = () => setSelectedIndex((i) => (i > 0 ? i - 1 : images.length - 1))
  const goNext = () => setSelectedIndex((i) => (i < images.length - 1 ? i + 1 : 0))

  if (!images.length) {
    return (
      <div className="gallery-empty">
        <span>🖼</span>
        <p>لا توجد صور في البورتفوليو بعد</p>
      </div>
    )
  }

  return (
    <>
      <div className="portfolio-gallery">
        {images.map((src, index) => (
          <div
            key={index}
            className={`gallery-item ${index === 0 ? 'gallery-item-featured' : ''}`}
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
            aria-label={`فتح صورة ${index + 1} من ${images.length}`}
          >
            <img src={src} alt={`عمل ${artistName} - ${index + 1}`} className="gallery-img" />
            <div className="gallery-item-overlay">
              <span className="gallery-zoom-icon">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="إغلاق">✕</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-nav lightbox-prev" onClick={goPrev} aria-label="السابق">‹</button>
            <img
              src={images[selectedIndex]}
              alt={`عمل ${artistName} - ${selectedIndex + 1}`}
              className="lightbox-img"
            />
            <button className="lightbox-nav lightbox-next" onClick={goNext} aria-label="التالي">›</button>
          </div>
          <div className="lightbox-counter">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
