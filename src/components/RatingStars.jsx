import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export default function RatingStars({ rating = 0, size = 14, showValue = true, reviews }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-gold-500" style={{ fontSize: size }}>
        {Array.from({ length: full }).map((_, i) => (
          <FaStar key={`f${i}`} />
        ))}
        {half && <FaStarHalfAlt />}
        {Array.from({ length: empty }).map((_, i) => (
          <FaRegStar key={`e${i}`} className="text-ink-200" />
        ))}
      </div>
      {showValue && <span className="text-sm font-semibold text-ink-800">{rating.toFixed(1)}</span>}
      {typeof reviews === 'number' && (
        <span className="text-sm text-ink-400">({reviews.toLocaleString()})</span>
      )}
    </div>
  )
}
