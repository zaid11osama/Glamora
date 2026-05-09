import './EmptyState.css'

/**
 * Empty state component shown when no data exists
 */
export default function EmptyState({
  icon = '🔍',
  title = 'لا توجد نتائج',
  description = 'لم يتم العثور على بيانات',
  action,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  )
}
