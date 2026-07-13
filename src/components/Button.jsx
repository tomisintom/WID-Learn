import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm shadow-primary-500/20',
  dark: 'bg-ink-900 text-white hover:bg-ink-800',
  outline: 'border border-ink-200 text-ink-800 hover:border-ink-400 bg-white',
  ghost: 'text-ink-700 hover:bg-ink-50',
  subtle: 'bg-primary-50 text-primary-600 hover:bg-primary-100',
}

const sizes = {
  sm: 'text-sm px-3.5 py-1.5',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3.5',
}

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  icon,
  iconRight,
  ...props
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {icon}
        {children}
        {iconRight}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {icon}
        {children}
        {iconRight}
      </a>
    )
  }
  const Comp = as || 'button'
  return (
    <Comp className={cls} {...props}>
      {icon}
      {children}
      {iconRight}
    </Comp>
  )
}
