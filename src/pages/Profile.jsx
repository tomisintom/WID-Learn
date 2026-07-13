import { useState } from "react";
import {
  FiMail,
  FiEdit2,
  FiCheck,
  FiBookOpen,
  FiAward,
  FiCheckCircle,
} from "react-icons/fi";
import Button from "../components/Button.jsx";
import StatCard from "../components/StatCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useLearning } from "../context/LearningContext.jsx";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { enrolledCourses, getCourseProgress, quizResults } = useLearning();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    title: user.title || "Student",
  });

  const completedCourses = enrolledCourses.filter(
    (c) => getCourseProgress(c.id).percent === 100,
  ).length;
  const totalQuizzes = Object.values(quizResults).reduce(
    (s, arr) => s + arr.length,
    0,
  );

  function handleSave(e) {
    e.preventDefault();
    updateProfile(form);
    setEditing(false);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* <img src={user.avatar} alt="" className="h-24 w-24 rounded-2xl object-cover bg-ink-100" /> */}
          <div className="flex-1 text-center sm:text-left">
            {!editing ? (
              <>
                <h1 className="text-2xl font-extrabold text-ink-900">
                  {user.name}
                </h1>
                <p className="mt-1 text-sm text-ink-500">
                  {user.title || "Student"}
                </p>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-ink-400 sm:justify-start">
                  <FiMail size={14} /> {user.email}
                </p>
                <Button
                  onClick={() => setEditing(true)}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  icon={<FiEdit2 size={13} />}
                >
                  Edit profile
                </Button>
              </>
            ) : (
              <form onSubmit={handleSave} className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-400">
                    Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full rounded-xl border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-primary-300"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-400">
                    Title
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    className="w-full rounded-xl border border-ink-100 px-4 py-2.5 text-sm outline-none focus:border-primary-300"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" size="sm" icon={<FiCheck size={13} />}>
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<FiBookOpen size={20} />}
          label="Enrolled courses"
          value={enrolledCourses.length}
          tint="bg-primary-50 text-primary-600"
        />
        <StatCard
          icon={<FiAward size={20} />}
          label="Courses completed"
          value={completedCourses}
          tint="bg-violet-50 text-violet-600"
        />
        <StatCard
          icon={<FiCheckCircle size={20} />}
          label="Quizzes taken"
          value={totalQuizzes}
          tint="bg-emerald-50 text-emerald-600"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-ink-900">My courses</h2>
        {enrolledCourses.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-ink-200 p-8 text-center">
            <p className="font-semibold text-ink-700">
              You haven't enrolled in any courses yet
            </p>
            <Button to="/courses" size="sm" className="mt-4">
              Browse courses
            </Button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {enrolledCourses.map((course) => {
              const progress = getCourseProgress(course.id);
              return (
                <Link
                  key={course.id}
                  to={`/courses/${course.slug}`}
                  className="flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-card hover:shadow-card-hover transition-shadow sm:flex-row sm:items-center"
                >
                  <img
                    src={course.thumbnail}
                    alt=""
                    className="h-20 w-full rounded-xl object-cover sm:h-14 sm:w-24"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-ink-900">{course.title}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <ProgressBar
                        percent={progress.percent}
                        className="max-w-[240px]"
                      />
                      <span className="text-xs font-semibold text-ink-500">
                        {progress.percent}%
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
