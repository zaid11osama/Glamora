import './Input.css'

/**
 * Reusable Input component
 * Supports: text, email, tel, password, date, number, textarea
 */
export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  required = false,
  disabled = false,
  icon,
  rows,
  ...props
}) {
  const isTextarea = type === 'textarea'

  return (
    <div className={`input-wrapper ${error ? 'input-has-error' : ''} ${disabled ? 'input-disabled' : ''}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="input-required" aria-label="مطلوب"> *</span>}
        </label>
      )}
      <div className="input-field-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            rows={rows || 4}
            className={`input-field textarea-field ${icon ? 'has-icon' : ''}`}
            {...props}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`input-field ${icon ? 'has-icon' : ''}`}
            {...props}
          />
        )}
      </div>
      {hint && !error && <span className="input-hint">{hint}</span>}
      {error && <span className="input-error-msg" role="alert">{error}</span>}
    </div>
  )
}
