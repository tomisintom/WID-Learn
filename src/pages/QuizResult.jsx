import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { FiCheckCircle, FiXCircle, FiRefreshCw, FiArrowRight } from 'react-icons/fi'
import Button from '../components/Button.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { getCourseBySlug } from '../data/courses.js'
import { useLearning } from '../context/LearningContext.jsx'
import NotFound from './NotFound.jsx'

const PASS_THRESHOLD = 0.6

export default function QuizResult() {
  const { slug } = useParams()
  const course = getCourseBySlug(slug)
  const { getLatestQuizResult } = useLearning()
  const [showReview, setShowReview] = useState(false)

  if (!course) return <NotFound />

  const result = getLatestQuizResult(course.id)
  if (!result) return <Navigate to={`/courses/${slug}/quiz`} replace />

  const percent = Math.round((result.score / result.total) * 100)
  const passed = result.score / result.total >= PASS_THRESHOLD

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Courses', to: '/courses' }, { label: course.title, to: `/courses/${slug}` }, { label: 'Quiz Result' }]} />

      <div className="mt-8 rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto">
          <ProgressRing
            percent={percent}
            size={140}
            stroke={12}
            color={passed ? 'var(--color-primary-500)' : '#EF4444'}
            label={`${percent}%`}
            sublabel="score"
          />
        </div>

        <div className={`mx-auto mt-6 flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${passed ? 'bg-primary-50 text-primary-600' : 'bg-red-50 text-red-600'}`}>
          {passed ? <FiCheckCircle /> : <FiXCircle />}
          {passed ? 'Quiz Passed' : 'Not Passed Yet'}
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-ink-900">
          You scored {result.score} out of {result.total}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-ink-500">
          {passed
            ? 'Great job! You have a solid understanding of this course. Keep up the momentum.'
            : `You need at least ${Math.ceil(result.total * PASS_THRESHOLD)} correct answers to pass. Review the material and try again.`}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={() => setShowReview((v) => !v)} variant="outline">
            {showReview ? 'Hide' : 'Review'} Answers
          </Button>
          <Button to={`/courses/${slug}/quiz`} variant="subtle" icon={<FiRefreshCw />}>
            Retake Quiz
          </Button>
          <Button to="/dashboard" iconRight={<FiArrowRight />}>
            Go to Dashboard
          </Button>
        </div>
      </div>

      {showReview && (
        <div className="mt-8 space-y-4">
          {course.quiz.map((q, i) => {
            const userAnswer = result.answers[i]
            const isCorrect = userAnswer === q.answer
            return (
              <div key={i} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <FiCheckCircle className="mt-0.5 shrink-0 text-primary-500" />
                  ) : (
                    <FiXCircle className="mt-0.5 shrink-0 text-red-500" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-ink-900">{i + 1}. {q.question}</p>
                    <div className="mt-3 space-y-1.5">
                      {q.options.map((opt) => {
                        const isUser = opt === userAnswer
                        const isAnswer = opt === q.answer
                        return (
                          <div
                            key={opt}
                            className={`rounded-lg px-3 py-2 text-sm ${
                              isAnswer
                                ? 'bg-primary-50 text-primary-700 font-semibold'
                                : isUser
                                ? 'bg-red-50 text-red-600'
                                : 'text-ink-500'
                            }`}
                          >
                            {opt}
                            {isAnswer && <span className="ml-2 text-xs">(Correct answer)</span>}
                            {isUser && !isAnswer && <span className="ml-2 text-xs">(Your answer)</span>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
