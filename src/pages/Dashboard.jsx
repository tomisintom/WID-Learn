import { Link } from "react-router-dom";
import {
  FiBookOpen,
  FiCheckCircle,
  FiAward,
  FiTrendingUp,
  FiClock,
  FiArrowRight,
  FiPlayCircle,
} from "react-icons/fi";
import Button from "../components/Button.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import StatCard from "../components/StatCard.jsx";
import CourseCard from "../components/CourseCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useLearning } from "../context/LearningContext.jsx";
import { courses, totalLessons } from "../data/courses.js";

export default function Dashboard() {
  const { user } = useAuth();
  const { enrolledCourses, getCourseProgress, quizResults } = useLearning();

  const inProgress = enrolledCourses.filter((c) => {
    const p = getCourseProgress(c.id);
    return p.percent > 0 && p.percent < 100;
  });
  const completedCourses = enrolledCourses.filter(
    (c) => getCourseProgress(c.id).percent === 100,
  );

  const totalCompletedLessons = enrolledCourses.reduce(
    (sum, c) => sum + getCourseProgress(c.id).completed,
    0,
  );
  const totalQuizzesTaken = Object.values(quizResults).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );
  const avgQuizScore = (() => {
    const all = Object.values(quizResults).flat();
    if (!all.length) return null;
    const avg = all.reduce((s, r) => s + r.score / r.total, 0) / all.length;
    return Math.round(avg * 100);
  })();

  const recommended = courses
    .filter((c) => !enrolledCourses.some((e) => e.id === c.id))
    .slice(0, 3);

  const recentActivity = [...enrolledCourses]
    .map((c) => ({ course: c, progress: getCourseProgress(c.id) }))
    .filter((x) => x.progress.completed > 0)
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome header */}
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink-950 p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="flex items-center gap-4">
          {/* <img src={user.avatar} alt="" className="h-16 w-16 rounded-2xl object-cover bg-white/10" /> */}
          <div>
            <p className="text-sm text-ink-400">Welcome back,</p>
            <h1 className="text-2xl font-extrabold text-white">
              {user.name.split(" ")[0]}
            </h1>
          </div>
        </div>
        <Button to="/courses" variant="primary" iconRight={<FiArrowRight />}>
          Browse more courses
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<FiBookOpen size={20} />}
          label="Enrolled courses"
          value={enrolledCourses.length}
          tint="bg-primary-50 text-primary-600"
        />
        <StatCard
          icon={<FiCheckCircle size={20} />}
          label="Lessons completed"
          value={totalCompletedLessons}
          tint="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          icon={<FiAward size={20} />}
          label="Courses completed"
          value={completedCourses.length}
          tint="bg-violet-50 text-violet-600"
        />
        <StatCard
          icon={<FiTrendingUp size={20} />}
          label="Avg. quiz score"
          value={avgQuizScore !== null ? `${avgQuizScore}%` : "—"}
          tint="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink-900">
              Continue learning
            </h2>
          </div>

          {inProgress.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-ink-200 p-8 text-center">
              <p className="font-semibold text-ink-700">
                No courses in progress
              </p>
              <p className="mt-1 text-sm text-ink-500">
                Enroll in a course to get started.
              </p>
              <Button
                to="/courses"
                variant="primary"
                size="sm"
                className="mt-4"
              >
                Browse courses
              </Button>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {inProgress.map((course) => {
                const progress = getCourseProgress(course.id);
                return (
                  <Link
                    key={course.id}
                    to={`/courses/${course.slug}/learn`}
                    className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-4 shadow-card hover:shadow-card-hover transition-shadow sm:flex-row sm:items-center"
                  >
                    <img
                      src={course.thumbnail}
                      alt=""
                      className="h-28 w-full rounded-xl object-cover sm:h-16 sm:w-28"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-ink-900">{course.title}</p>
                      <p className="text-xs text-ink-400">{course.category}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <ProgressBar
                          percent={progress.percent}
                          className="max-w-[220px]"
                        />
                        <span className="shrink-0 text-xs font-semibold text-ink-500">
                          {progress.percent}%
                        </span>
                      </div>
                    </div>
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-600">
                      <FiPlayCircle /> Resume
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {completedCourses.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-bold text-ink-900">
                Completed courses
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {completedCourses.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <h2 className="text-lg font-bold text-ink-900">
              Recommended for you
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-ink-100 bg-white p-6 text-center shadow-card">
            <h3 className="text-left text-sm font-bold text-ink-900">
              Overall completion
            </h3>
            <div className="mt-3 flex justify-center">
              <ProgressRing
                percent={
                  enrolledCourses.length
                    ? Math.round(
                        enrolledCourses.reduce(
                          (s, c) => s + getCourseProgress(c.id).percent,
                          0,
                        ) / enrolledCourses.length,
                      )
                    : 0
                }
                size={120}
              />
            </div>
            <p className="mt-2 text-xs text-ink-400">
              Average across {enrolledCourses.length || 0} enrolled course
              {enrolledCourses.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
            <h3 className="text-sm font-bold text-ink-900">Recent activity</h3>
            {recentActivity.length === 0 ? (
              <p className="mt-3 text-sm text-ink-400">
                Your learning activity will show up here.
              </p>
            ) : (
              <ul className="mt-4 space-y-4">
                {recentActivity.map(({ course, progress }) => (
                  <li key={course.id} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                      <FiClock size={14} />
                    </span>
                    <div className="text-sm">
                      <p className="font-semibold text-ink-800 line-clamp-1">
                        {course.title}
                      </p>
                      <p className="text-xs text-ink-400">
                        {progress.completed} of {totalLessons(course)} lessons
                        watched
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
            <h3 className="text-sm font-bold text-ink-900">Quiz stats</h3>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-ink-500">Quizzes taken</span>
              <span className="font-bold text-ink-900">
                {totalQuizzesTaken}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-ink-500">Average score</span>
              <span className="font-bold text-ink-900">
                {avgQuizScore !== null ? `${avgQuizScore}%` : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
