import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import Button from '../components/Button.jsx'
import Logo from '../components/Logo.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const perks = ['Free access to all courses', 'Track your progress automatically', 'Take quizzes & earn certificates']

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const res = signup(form)
      setLoading(false)
      if (!res.ok) setError(res.error)
      else navigate('/dashboard', { replace: true })
    }, 400)
  }

  return (
    <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center bg-ink-50/60 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center lg:hidden"><Logo /></div>
          <div className="rounded-3xl border border-ink-100 bg-white p-8 shadow-card">
            <h1 className="text-2xl font-extrabold text-ink-900">Create your account</h1>
            <p className="mt-1 text-sm text-ink-500">Start learning for free — no credit card required.</p>

            {error && (
              <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-400">Full name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary-300 focus:bg-white"
                  />
                </div>
              </div>
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
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-400">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
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
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary-600">Log in</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-ink-950 lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="relative max-w-sm">
          <div className="mb-8"><Logo dark /></div>
          <h2 className="text-3xl font-extrabold leading-tight text-white">Join 85,000+ learners building new skills</h2>
          <div className="mt-8 space-y-4">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
                  <FiCheck size={13} />
                </span>
                <span className="text-sm text-ink-200">{p}</span>
              </div>
            ))}
          </div>
          <img
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=700&q=80"
            alt=""
            className="mt-10 rounded-2xl border border-white/10 object-cover"
          />
        </div>
      </div>
    </div>
  )
}
