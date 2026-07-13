import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiPlay,
  FiCode,
  FiPenTool,
  FiBarChart2,
  FiTrendingUp,
  FiBriefcase,
  FiCamera,
  FiUsers,
  FiAward,
  FiBookOpen,
} from "react-icons/fi";
import Button from "../components/Button.jsx";
import CourseCard from "../components/CourseCard.jsx";
import RatingStars from "../components/RatingStars.jsx";
import { courses, categories } from "../data/courses.js";
import heroImg from "../assets/images/hero-img-7.png";

const categoryIcons = {
  "Web Development": FiCode,
  Design: FiPenTool,
  "Data Science": FiBarChart2,
  Marketing: FiTrendingUp,
  Business: FiBriefcase,
  Photography: FiCamera,
};

const testimonials = [
  {
    quote:
      "The lesson player and progress tracking kept me accountable — I finally finished a course start to finish.",
    name: "Ifeoma A.",
    role: "Frontend Developer",
  },
  {
    quote:
      "Clear structure, bite-sized lessons, and the quizzes actually helped concepts stick.",
    name: "Temi K.",
    role: "Product Designer",
  },
  {
    quote:
      "I love being able to see my dashboard and pick up right where I left off on any device.",
    name: "Grace O.",
    role: "Marketing Manager",
  },
];

export default function Home() {
  const featured = courses.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">
              Learn skills that move your{" "}
              <span className="text-primary-400">Web3 career</span> forward
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-300 sm:text-lg">
              Bite-sized video lessons, hands-on quizzes, and progress tracking
              — everything you need to build real, job-ready Web3 skills at your
              own pace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/courses" size="lg" variant="primary">
                Explore Courses
              </Button>
              <Button
                to="/signup"
                size="lg"
                variant="outline"
                className="!border-white/20 !text-[#1f2433] hover:!border-black/50"
              >
                Create Free Account
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src={heroImg}
                alt="Student learning online"
                className="h-[420px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
              Browse top categories
            </h2>
            <p className="mt-2 text-ink-500">
              Find the right path for where you want to go
            </p>
          </div>
          <Link
            to="/courses"
            className="hidden text-sm font-semibold text-primary-600 hover:text-primary-700 sm:flex items-center gap-1"
          >
            View all
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories
            .filter((c) => c !== "All")
            .map((c) => {
              const Icon = categoryIcons[c] || FiBookOpen;
              const count = courses.filter(
                (course) => course.category === c,
              ).length;
              return (
                <Link
                  key={c}
                  to={`/courses?category=${encodeURIComponent(c)}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-ink-100 bg-white p-5 text-center shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{c}</p>
                    <p className="text-xs text-ink-400">{count} courses</p>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      {/* Featured courses */}
      <section className="bg-ink-50/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
                Popular courses
              </h2>
              <p className="mt-2 text-ink-500">
                Hand-picked courses loved by our learners
              </p>
            </div>
            <Link
              to="/courses"
              className="hidden text-sm font-semibold text-primary-600 hover:text-primary-700 sm:flex items-center gap-1"
            >
              View all
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <Button to="/courses" variant="outline">
              View all courses
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            How WID Learn works
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-ink-500">
            Three simple steps between you and your next skill
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              icon: FiUsers,
              title: "Create your account",
              desc: "Sign up free in seconds and build your personal learning profile.",
            },
            {
              icon: FiBookOpen,
              title: "Enroll & learn",
              desc: "Pick a course, work through structured video lessons at your pace.",
            },
            {
              icon: FiAward,
              title: "Track & get certified",
              desc: "Pass quizzes, track your progress, and finish with a certificate.",
            },
          ].map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
            >
              <span className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-white">
                {i + 1}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <step.icon size={20} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ink-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Loved by learners everywhere
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <RatingStars rating={5} showValue={false} size={13} />
                <p className="mt-4 text-sm leading-relaxed text-ink-200">
                  “{t.quote}”
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-ink-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-primary-500 px-8 py-12 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to start learning?
            </h2>
            <p className="mt-2 max-w-md text-primary-50">
              Join thousands of learners building new skills today — it's
              completely free to get started.
            </p>
          </div>
          <Button
            to="/signup"
            size="lg"
            className="!bg-white !text-primary-600 hover:!bg-primary-50 shrink-0"
          >
            Get Started Free
          </Button>
        </div>
      </section>
    </div>
  );
}
