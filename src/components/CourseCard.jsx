import { Link } from "react-router-dom";
import { FiClock, FiBookOpen } from "react-icons/fi";
import RatingStars from "./RatingStars.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { totalLessons } from "../data/courses.js";
import { useLearning } from "../context/LearningContext.jsx";

export default function CourseCard({ course }) {
  const { isEnrolled, getCourseProgress } = useLearning();
  const enrolled = isEnrolled(course.id);
  const progress = enrolled ? getCourseProgress(course.id) : null;

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink-700 backdrop-blur">
          {course.category}
        </span>
        {enrolled && (
          <span className="absolute right-3 top-3 rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white">
            Enrolled
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-ink-900 group-hover:text-primary-600 transition-colors">
          {course.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-500">
          {course.description}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-medium text-ink-600">
            {course.instructor.name}
          </span>
        </div>

        <div className="mt-3">
          <RatingStars
            rating={course.rating}
            reviews={course.reviews}
            size={12}
          />
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs text-ink-400">
          <span className="flex items-center gap-1">
            <FiClock size={13} /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <FiBookOpen size={13} /> {totalLessons(course)} lessons
          </span>
        </div>

        <div className="mt-4 flex-1" />

        {progress ? (
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-ink-600">
              <span>Your progress</span>
              <span>{progress.percent}%</span>
            </div>
            <ProgressBar percent={progress.percent} />
          </div>
        ) : (
          <div className="flex items-center justify-between border-t border-ink-100 pt-3">
            <span className="text-sm font-bold text-primary-600">Free</span>
          </div>
        )}
      </div>
    </Link>
  );
}
