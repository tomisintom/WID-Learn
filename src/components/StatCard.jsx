export default function StatCard({ icon, label, value, tint = 'bg-primary-50 text-primary-600' }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tint}`}>{icon}</div>
      <div>
        <p className="text-2xl font-extrabold text-ink-900 leading-none">{value}</p>
        <p className="mt-1 text-sm text-ink-500">{label}</p>
      </div>
    </div>
  )
}
