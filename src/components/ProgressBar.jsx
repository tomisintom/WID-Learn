export default function ProgressBar({ percent = 0, className = '', trackClass = 'bg-ink-100', barClass = 'bg-primary-500', height = 'h-2' }) {
  const value = Math.max(0, Math.min(100, percent))
  return (
    <div className={`w-full ${height} rounded-full ${trackClass} overflow-hidden ${className}`}>
      <div
        className={`${height} ${barClass} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${value}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
