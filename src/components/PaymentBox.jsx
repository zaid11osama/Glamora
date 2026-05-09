import './PaymentBox.css'

/**
 * Payment summary and form UI component
 * Used in the Booking page
 */
export default function PaymentBox({
  service,
  price,
  depositPercent = 30,
  paymentMethod,
  onPaymentMethodChange,
}) {
  const depositAmount = Math.ceil((price * depositPercent) / 100)
  const remaining = price - depositAmount

  const methods = [
    { id: 'credit', label: 'بطاقة ائتمانية', icon: '💳' },
    { id: 'mada', label: 'مدى', icon: '🏧' },
    { id: 'apple_pay', label: 'Apple Pay', icon: '🍎' },
    { id: 'stc_pay', label: 'STC Pay', icon: '📱' },
  ]

  return (
    <div className="payment-box">
      <div className="payment-header">
        <h3 className="payment-title">ملخص الدفع</h3>
      </div>

      {/* Order summary */}
      <div className="payment-summary">
        <div className="payment-row">
          <span className="payment-row-label">الخدمة</span>
          <span className="payment-row-value">{service?.name ?? '—'}</span>
        </div>
        <div className="payment-row">
          <span className="payment-row-label">مدة الخدمة</span>
          <span className="payment-row-value">{service?.duration ?? '—'}</span>
        </div>
        <div className="payment-row payment-row-total">
          <span className="payment-row-label">السعر الكلي</span>
          <span className="payment-total-price">{price?.toLocaleString('ar-SA')} ر.س</span>
        </div>
      </div>

      {/* Deposit notice */}
      <div className="payment-deposit-info">
        <div className="deposit-icon">💰</div>
        <div>
          <p className="deposit-title">العربون المطلوب ({depositPercent}٪)</p>
          <p className="deposit-amount">{depositAmount?.toLocaleString('ar-SA')} ر.س</p>
          <p className="deposit-note">يُدفع الباقي ({remaining?.toLocaleString('ar-SA')} ر.س) يوم الموعد</p>
        </div>
      </div>

      {/* Payment methods */}
      <div className="payment-methods-section">
        <h4 className="payment-methods-title">طريقة الدفع</h4>
        <div className="payment-methods-grid">
          {methods.map((m) => (
            <label
              key={m.id}
              className={`payment-method-card ${paymentMethod === m.id ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={m.id}
                checked={paymentMethod === m.id}
                onChange={() => onPaymentMethodChange?.(m.id)}
                className="payment-method-radio"
              />
              <span className="payment-method-icon">{m.icon}</span>
              <span className="payment-method-label">{m.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Security notice */}
      <div className="payment-security">
        <span>🔒</span>
        <span>جميع المدفوعات مشفرة وآمنة بالكامل</span>
      </div>
    </div>
  )
}
