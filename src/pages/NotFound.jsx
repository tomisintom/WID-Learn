import { FiArrowLeft } from 'react-icons/fi'
import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-7xl font-extrabold text-primary-500">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-ink-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-ink-500">The page you're looking for doesn't exist or may have been moved.</p>
      <Button to="/" className="mt-6" icon={<FiArrowLeft />}>Back to home</Button>
    </div>
  )
}
