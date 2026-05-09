import './Badge.css'

/**
 * Badge / Tag component
 * variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gold' | 'outline'
 */
export default function Badge({ children, variant = 'primary', size = 'sm', icon, dot = false }) {
  return (
    <span className={`badge badge-${variant} badge-${size} ${dot ? 'badge-dot' : ''}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      {dot && <span className="badge-dot-indicator" />}
      {children}
    </span>
  )
}
