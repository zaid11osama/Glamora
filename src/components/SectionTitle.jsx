import './SectionTitle.css'

/**
 * Consistent section title component used across pages
 */
export default function SectionTitle({ title, subtitle, centered = true, accent }) {
  return (
    <div className={`section-title ${centered ? 'section-title-center' : ''}`}>
      {accent && <span className="section-accent">{accent}</span>}
      <h2 className="section-title-text">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-title-line">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}
