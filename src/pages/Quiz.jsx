import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiHelpCircle, FiClock, FiCheckCircle, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Button from '../components/Button.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { getCourseBySlug } from '../data/courses.js'
import { useLearning } from '../context/LearningContext.jsx'
import NotFound from './NotFound.jsx'

export default function Quiz() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const course = getCourseBySlug(slug)
  const { saveQuizResult } = useLearning()

  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  if (!course) return <NotFound />

  const quiz = course.quiz
  const total = quiz.length
  const current = quiz[step]
  const selected = answers[step]

  function selectOption(option) {
    setAnswers((prev) => ({ ...prev, [step]: option }))
  }

  function handleNext() {
    if (step < total - 1) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  function handleSubmit() {
    let score = 0
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) score += 1
    })
    const result = {
      date: new Date().toISOString(),
      score,
      total,
      answers,
    }
    saveQuizResult(course.id, result)
    navigate(`/courses/${slug}/quiz/result`)
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Courses', to: '/courses' }, { label: course.title, to: `/courses/${slug}` }, { label: 'Quiz' }]} />
        <div className="mt-8 rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-card sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <FiHelpCircle size={28} />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold text-ink-900">{course.title} Quiz</h1>
          <p className="mx-auto mt-3 max-w-md text-ink-500">
            Test what you've learned with {total} multiple-choice questions. You can review your answers once you're finished.
          </p>

          <div className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-4">
            <div className="rounded-2xl bg-ink-50 p-4">
              <p className="text-2xl font-extrabold text-ink-900">{total}</p>
              <p className="text-xs text-ink-500">Questions</p>
            </div>
            <div className="rounded-2xl bg-ink-50 p-4">
              <p className="flex items-center justify-center gap-1.5 text-2xl font-extrabold text-ink-900"><FiClock size={18} /> ~5</p>
              <p className="text-xs text-ink-500">Minutes</p>
            </div>
          </div>

          <Button onClick={() => setStarted(true)} size="lg" className="mt-8">
            Start Quiz
          </Button>
          <div>
            <Link to={`/courses/${slug}`} className="mt-4 inline-block text-sm text-ink-400 hover:text-ink-700">
              Back to course
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold text-ink-500">
          <span>Question {step + 1} of {total}</span>
          <span>{Object.keys(answers).length}/{total} answered</span>
        </div>
        <ProgressBar percent={((step + 1) / total) * 100} />
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-ink-900 sm:text-xl">{current.question}</h2>

        <div className="mt-6 flex flex-col gap-3">
          {current.options.map((option) => {
            const isSelected = selected === option
            return (
              <button
                key={option}
                onClick={() => selectOption(option)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-ink-100 text-ink-700 hover:border-ink-300'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    isSelected ? 'border-primary-500 bg-primary-500' : 'border-ink-300'
                  }`}
                >
                  {isSelected && <FiCheckCircle className="text-white" size={12} />}
                </span>
                {option}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          variant="outline"
          disabled={step === 0}
          icon={<FiArrowLeft />}
        >
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!selected} iconRight={<FiArrowRight />}>
          {step < total - 1 ? 'Next Question' : 'Submit Quiz'}
        </Button>
      </div>
    </div>
  )
}
