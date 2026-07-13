import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import Button from '../components/Button.jsx'
import Logo from '../components/Logo.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const res = login(form)
      setLoading(false)
      if (!res.ok) setError(res.error)
      else navigate(from, { replace: true })
    }, 400)
  }

  function fillDemo() {
    setForm({ email: 'demo@widlearn.app', password: 'demo1234' })
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-ink-50/60 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="rounded-3xl border border-ink-100 bg-white p-8 shadow-card">
          <h1 className="text-2xl font-extrabold text-ink-900">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-500">Log in to continue your learning journey.</p>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-400">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary-300 focus:bg-white"
                />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wide text-ink-400">Password</label>
                <button type="button" className="text-xs font-semibold text-primary-600">Forgot password?</button>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-3 pl-11 pr-11 text-sm outline-none focus:border-primary-300 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>

          <button onClick={fillDemo} className="mt-4 w-full text-center text-xs font-semibold text-ink-400 hover:text-primary-600">
            Use demo credentials
          </button>

          <p className="mt-6 text-center text-sm text-ink-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary-600">Sign up</Link>
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-ink-400">
          This is a frontend demo — accounts are stored only in your browser.
        </p>
      </div>
    </div>
  )
}
