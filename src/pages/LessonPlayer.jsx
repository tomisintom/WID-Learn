import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiCircle,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
  FiArrowLeft,
  FiHelpCircle,
} from "react-icons/fi";
import Button from "../components/Button.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import {
  getCourseBySlug,
  allLessonsFlat,
  totalLessons,
} from "../data/courses.js";
import { useLearning } from "../context/LearningContext.jsx";
import NotFound from "./NotFound.jsx";

export default function LessonPlayer() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = getCourseBySlug(slug);
  const {
    isEnrolled,
    enroll,
    markLessonComplete,
    setLastLesson,
    getCourseProgress,
    enrollments,
  } = useLearning();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lessons = useMemo(
    () => (course ? allLessonsFlat(course) : []),
    [course],
  );
  const progress = course
    ? getCourseProgress(course.id)
    : { completed: 0, total: 0, percent: 0 };
  const completedIds = course
    ? enrollments[course.id]?.completedLessons || []
    : [];

  const initialLessonId = course
    ? progress.lastLessonId || lessons[0]?.id
    : null;
  const [activeId, setActiveId] = useState(initialLessonId);

  useEffect(() => {
    if (course && !isEnrolled(course.id)) {
      enroll(course.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.id]);

  useEffect(() => {
    if (course && activeId) setLastLesson(course.id, activeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  if (!course) return <NotFound />;

  const activeIndex = lessons.findIndex((l) => l.id === activeId);
  const active = lessons[activeIndex] || lessons[0];
  const isComplete = completedIds.includes(active?.id);

  function goTo(id) {
    setActiveId(id);
    setSidebarOpen(false);
  }

  function handleComplete() {
    markLessonComplete(course.id, active.id);
  }

  function handleNext() {
    markLessonComplete(course.id, active.id);
    if (activeIndex < lessons.length - 1) {
      setActiveId(lessons[activeIndex + 1].id);
    } else {
      navigate(`/courses/${slug}/quiz`);
    }
  }

  function handlePrev() {
    if (activeIndex > 0) setActiveId(lessons[activeIndex - 1].id);
  }

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="border-b border-ink-100 p-5">
        <Link
          to={`/courses/${slug}`}
          className="flex items-center gap-1.5 text-xs font-semibold text-ink-400 hover:text-ink-700"
        >
          <FiArrowLeft size={12} /> Back to course
        </Link>
        <h2 className="mt-2 line-clamp-2 text-sm font-bold text-ink-900">
          {course.title}
        </h2>
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs font-semibold text-ink-500">
            <span>
              {progress.completed}/{progress.total} lessons
            </span>
            <span>{progress.percent}%</span>
          </div>
          <ProgressBar percent={progress.percent} height="h-1.5" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {course.sections.map((section) => (
          <div key={section.id} className="mb-2">
            <p className="px-2 py-2 text-xs font-bold uppercase tracking-wide text-ink-400">
              {section.title}
            </p>
            {section.items.map((lesson) => {
              const done = completedIds.includes(lesson.id);
              const isActive = lesson.id === active?.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => goTo(lesson.id)}
                  className={`flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2.5 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-ink-600 hover:bg-ink-50"
                  }`}
                >
                  {done ? (
                    <FiCheckCircle className="mt-0.5 shrink-0 text-primary-500" />
                  ) : (
                    <FiCircle className="mt-0.5 shrink-0 text-ink-300" />
                  )}
                  <span className="flex-1">
                    <span className="block font-medium">{lesson.title}</span>
                    <span className="text-xs text-ink-400">
                      {lesson.duration}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        ))}
        <Link
          to={`/courses/${slug}/quiz`}
          className="mt-2 flex items-center gap-2.5 rounded-xl border border-dashed border-primary-200 bg-primary-50/50 px-2.5 py-3 text-sm font-semibold text-primary-600 hover:bg-primary-50"
        >
          <FiHelpCircle /> Take the course quiz
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-64px)] bg-ink-950">
      {/* Desktop sidebar */}
      <aside className="hidden w-80 shrink-0 border-r border-ink-800 bg-white lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-80 max-w-[85vw] bg-white">
            <div className="flex justify-end p-3">
              <button onClick={() => setSidebarOpen(false)} className="p-1">
                <FiX size={20} />
              </button>
            </div>
            <div className="h-[calc(100%-48px)]">{SidebarContent}</div>
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex items-center justify-between border-b border-ink-800 px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-white"
          >
            <FiMenu /> Lessons
          </button>
          <span className="text-xs text-ink-400">
            {progress.percent}% complete
          </span>
        </div>

        <div className="aspect-video w-full bg-black">
          {active && (
            <iframe
              key={active.id}
              className="h-full w-full"
              src={active.videoUrl}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-400">
            {active?.sectionTitle}
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-extrabold text-white">
              {active?.title}
            </h1>
            {isComplete && (
              <span className="flex items-center gap-1.5 rounded-full bg-primary-500/15 px-3 py-1 text-xs font-semibold text-primary-300">
                <FiCheckCircle /> Completed
              </span>
            )}
          </div>
          <p className="mt-4 leading-relaxed text-ink-300">
            This lesson covers key concepts with a hands-on walkthrough. Watch
            the video, then mark it complete to keep your progress up to date
            and unlock the next lesson.
          </p>

          <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              onClick={handlePrev}
              variant="primary"
              disabled={activeIndex === 0}
              className="!border-white/15 !text-white hover:!border-white/40"
              icon={<FiChevronLeft />}
            >
              Previous
            </Button>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              {!isComplete && (
                <Button onClick={handleComplete} variant="subtle">
                  Mark as complete
                </Button>
              )}
              <Button onClick={handleNext} iconRight={<FiChevronRight />}>
                {activeIndex < lessons.length - 1
                  ? "Next lesson"
                  : "Go to quiz"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
