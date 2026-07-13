export default function ProgressRing({ percent = 0, size = 96, stroke = 9, color = 'var(--color-primary-500)', trackColor = '#EEF0F4', label, sublabel }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const value = Math.max(0, Math.min(100, percent))
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-ink-900" style={{ fontSize: size * 0.22 }}>
          {label ?? `${Math.round(value)}%`}
        </span>
        {sublabel && <span className="text-[10px] text-ink-400">{sublabel}</span>}
      </div>
    </div>
  )
}
