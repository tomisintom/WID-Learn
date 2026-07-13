import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import { getCourseById, totalLessons } from '../data/courses.js'

const LearningContext = createContext(null)

function keyFor(userId) {
  return `lms_learning_${userId || 'guest'}`
}

function load(userId) {
  try {
    return JSON.parse(localStorage.getItem(keyFor(userId))) || { enrollments: {}, quizResults: {} }
  } catch {
    return { enrollments: {}, quizResults: {} }
  }
}

export function LearningProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id
  const [data, setData] = useState(() => load(userId))

  // reload when the logged-in user changes
  useEffect(() => {
    setData(load(userId))
  }, [userId])

  useEffect(() => {
    localStorage.setItem(keyFor(userId), JSON.stringify(data))
  }, [data, userId])

  function enroll(courseId) {
    setData((prev) => {
      if (prev.enrollments[courseId]) return prev
      return {
        ...prev,
        enrollments: {
          ...prev.enrollments,
          [courseId]: { enrolledAt: new Date().toISOString(), completedLessons: [], lastLessonId: null },
        },
      }
    })
  }

  function isEnrolled(courseId) {
    return Boolean(data.enrollments[courseId])
  }

  function markLessonComplete(courseId, lessonId) {
    setData((prev) => {
      const enr = prev.enrollments[courseId] || { enrolledAt: new Date().toISOString(), completedLessons: [], lastLessonId: null }
      const completed = enr.completedLessons.includes(lessonId)
        ? enr.completedLessons
        : [...enr.completedLessons, lessonId]
      return {
        ...prev,
        enrollments: {
          ...prev.enrollments,
          [courseId]: { ...enr, completedLessons: completed, lastLessonId: lessonId },
        },
      }
    })
  }

  function setLastLesson(courseId, lessonId) {
    setData((prev) => {
      const enr = prev.enrollments[courseId]
      if (!enr) return prev
      return { ...prev, enrollments: { ...prev.enrollments, [courseId]: { ...enr, lastLessonId: lessonId } } }
    })
  }

  function getCourseProgress(courseId) {
    const course = getCourseById(courseId)
    const total = course ? totalLessons(course) : 0
    const enr = data.enrollments[courseId]
    const completed = enr ? enr.completedLessons.length : 0
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0
    return { completed, total, percent, lastLessonId: enr?.lastLessonId || null }
  }

  function saveQuizResult(courseId, result) {
    setData((prev) => {
      const existing = prev.quizResults[courseId] || []
      return { ...prev, quizResults: { ...prev.quizResults, [courseId]: [...existing, result] } }
    })
  }

  function getLatestQuizResult(courseId) {
    const list = data.quizResults[courseId]
    return list && list.length ? list[list.length - 1] : null
  }

  const enrolledCourses = useMemo(
    () => Object.keys(data.enrollments).map((id) => getCourseById(id)).filter(Boolean),
    [data.enrollments]
  )

  const value = {
    enroll,
    isEnrolled,
    markLessonComplete,
    setLastLesson,
    getCourseProgress,
    saveQuizResult,
    getLatestQuizResult,
    enrolledCourses,
    quizResults: data.quizResults,
    enrollments: data.enrollments,
  }

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
}

export function useLearning() {
  const ctx = useContext(LearningContext)
  if (!ctx) throw new Error('useLearning must be used within LearningProvider')
  return ctx
}
