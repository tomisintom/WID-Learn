import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm">
      <Link to="/" className="text-ink-400 hover:text-ink-700 transition-colors">
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <FiChevronRight className="text-ink-300" size={14} />
          {item.to ? (
            <Link to={item.to} className="text-ink-400 hover:text-ink-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-ink-800">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
