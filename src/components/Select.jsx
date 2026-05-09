import './Select.css'

/**
 * Reusable Select dropdown component
 */
export default function Select({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder = 'اختاري...',
  icon,
}) {
  return (
    <div className={`select-wrapper ${error ? 'select-has-error' : ''} ${disabled ? 'select-disabled' : ''}`}>
      {label && (
        <label htmlFor={name} className="select-label">
          {label}
          {required && <span className="select-required"> *</span>}
        </label>
      )}
      <div className="select-field-wrapper">
        {icon && <span className="select-icon">{icon}</span>}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`select-field ${icon ? 'has-icon' : ''}`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        <span className="select-arrow">▾</span>
      </div>
      {error && <span className="select-error-msg" role="alert">{error}</span>}
    </div>
  )
}
