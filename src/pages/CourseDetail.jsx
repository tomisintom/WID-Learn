import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiClock,
  FiBookOpen,
  FiUsers,
  FiCheckCircle,
  FiChevronDown,
  FiPlayCircle,
  FiAward,
  FiBarChart2,
} from "react-icons/fi";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import RatingStars from "../components/RatingStars.jsx";
import Button from "../components/Button.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import CourseCard from "../components/CourseCard.jsx";
import { getCourseBySlug, totalLessons, courses } from "../data/courses.js";
import { useLearning } from "../context/LearningContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import NotFound from "./NotFound.jsx";

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isEnrolled, enroll, getCourseProgress } = useLearning();
  const course = getCourseBySlug(slug);
  const [openSection, setOpenSection] = useState(0);

  if (!course) return <NotFound />;

  const enrolled = isEnrolled(course.id);
  const progress = enrolled ? getCourseProgress(course.id) : null;
  const related = courses
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 3);

  function handleEnroll() {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/courses/${slug}` } } });
      return;
    }
    enroll(course.id);
    navigate(`/courses/${slug}/learn`);
  }

  function handleContinue() {
    navigate(`/courses/${slug}/learn`);
  }

  return (
    <div>
      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Courses", to: "/courses" },
              { label: course.title },
            ]}
          />
          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="inline-block rounded-full bg-primary-500/15 px-3 py-1 text-xs font-semibold text-primary-300">
                {course.category} · {course.level}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-4 max-w-2xl text-ink-300">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-300">
                <RatingStars rating={course.rating} reviews={course.reviews} />
                <span className="flex items-center gap-1.5">
                  <FiUsers /> {course.students.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock /> {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiBookOpen /> {totalLessons(course)} lessons
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div>
                  <p className="text-sm font-bold text-white">
                    {course.instructor.name}
                  </p>
                  <p className="text-xs text-ink-400">
                    {course.instructor.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* What you'll learn */}
            <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-ink-900">
                What you'll learn
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {course.whatYouWillLearn.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-primary-500" />
                    <span className="text-sm text-ink-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-ink-900">
                  Course content
                </h2>
                <span className="text-sm text-ink-400">
                  {course.sections.length} sections · {totalLessons(course)}{" "}
                  lessons
                </span>
              </div>

              <div className="mt-4 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
                {course.sections.map((section, idx) => (
                  <div key={section.id}>
                    <button
                      onClick={() =>
                        setOpenSection(openSection === idx ? -1 : idx)
                      }
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-ink-50/60"
                    >
                      <div>
                        <p className="text-sm font-bold text-ink-900">
                          {section.title}
                        </p>
                        <p className="mt-0.5 text-xs text-ink-400">
                          {section.items.length} lessons
                        </p>
                      </div>
                      <FiChevronDown
                        className={`shrink-0 text-ink-400 transition-transform ${openSection === idx ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openSection === idx && (
                      <div className="bg-ink-50/40 px-5 pb-3">
                        {section.items.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between gap-3 py-2.5 text-sm"
                          >
                            <span className="flex items-center gap-2.5 text-ink-600">
                              <FiPlayCircle className="shrink-0 text-ink-400" />
                              {lesson.title}
                            </span>
                            <span className="shrink-0 text-xs text-ink-400">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-ink-900">
                Your instructor
              </h2>
              <div className="mt-4 flex items-center gap-4">
                <div>
                  <p className="font-bold text-ink-900">
                    {course.instructor.name}
                  </p>
                  <p className="text-sm text-ink-500">
                    {course.instructor.title}
                  </p>
                  <div className="mt-1">
                    <RatingStars
                      rating={course.rating}
                      showValue={false}
                      size={12}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card-hover">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="aspect-video w-full object-cover"
              />
              <div className="p-6">
                {enrolled ? (
                  <>
                    <div className="mb-4">
                      <div className="mb-1.5 flex items-center justify-between text-sm font-semibold text-ink-700">
                        <span>Your progress</span>
                        <span>{progress.percent}%</span>
                      </div>
                      <ProgressBar percent={progress.percent} />
                      <p className="mt-1.5 text-xs text-ink-400">
                        {progress.completed} of {progress.total} lessons
                        complete
                      </p>
                    </div>
                    <Button
                      onClick={handleContinue}
                      className="w-full"
                      size="lg"
                    >
                      {progress.percent > 0
                        ? "Continue Learning"
                        : "Start Learning"}
                    </Button>
                    <Button
                      to={`/courses/${slug}/quiz`}
                      variant="outline"
                      className="mt-3 w-full"
                      size="lg"
                    >
                      Take the Quiz
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-extrabold text-ink-900">Free</p>
                    <p className="text-sm text-ink-400">Full lifetime access</p>
                    <Button
                      onClick={handleEnroll}
                      className="mt-4 w-full"
                      size="lg"
                    >
                      Enroll Now
                    </Button>
                  </>
                )}

                <div className="mt-6 space-y-3 border-t border-ink-100 pt-5 text-sm">
                  <div className="flex items-center gap-2.5 text-ink-600">
                    <FiClock className="text-ink-400" /> {course.duration}{" "}
                    on-demand video
                  </div>
                  <div className="flex items-center gap-2.5 text-ink-600">
                    <FiBookOpen className="text-ink-400" />{" "}
                    {totalLessons(course)} lessons
                  </div>
                  <div className="flex items-center gap-2.5 text-ink-600">
                    <FiBarChart2 className="text-ink-400" /> {course.level}{" "}
                    level
                  </div>
                  <div className="flex items-center gap-2.5 text-ink-600">
                    <FiAward className="text-ink-400" /> Certificate of
                    completion
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related courses */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-extrabold text-ink-900">
              Related courses
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
