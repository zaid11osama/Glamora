import './LoadingSpinner.css'

/**
 * Loading Spinner component
 * size: 'sm' | 'md' | 'lg' | 'xl'
 * fullPage: renders centered in the full page
 */
export default function LoadingSpinner({ size = 'md', fullPage = false, text = 'جاري التحميل...' }) {
  if (fullPage) {
    return (
      <div className="spinner-page">
        <div className={`spinner spinner-${size}`} />
        {text && <p className="spinner-text">{text}</p>}
      </div>
    )
  }

  return (
    <div className="spinner-wrapper">
      <div className={`spinner spinner-${size}`} />
      {text && <span className="spinner-inline-text">{text}</span>}
    </div>
  )
}
