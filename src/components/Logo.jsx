import { Link } from 'react-router-dom'
import logo from '../assets/images/wid-learn-logo.png'

export default function Logo({ className = '', dark = false }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 shrink-0 ${className}`}
      aria-label="WID Learn – Women in DeFi Learning Platform, go to homepage"
    >
      <img src={logo} alt="" className="h-9 w-auto shrink-0" />
      <span className={`text-xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-ink-900'}`}>
        WID Learn
      </span>
    </Link>
  )
}
