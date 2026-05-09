import './Button.css'

/**
 * Reusable Button component
 * Props:
 *  - variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold'
 *  - size: 'sm' | 'md' | 'lg'
 *  - fullWidth: boolean
 *  - loading: boolean
 *  - icon: ReactNode (rendered before text in RTL = on the right)
 *  - iconAfter: ReactNode (rendered after text)
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconAfter,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth ? 'btn-full' : '',
        loading ? 'btn-loading' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {children && <span className="btn-text">{children}</span>}
          {iconAfter && <span className="btn-icon-after">{iconAfter}</span>}
        </>
      )}
    </button>
  )
}
