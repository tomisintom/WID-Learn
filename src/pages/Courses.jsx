import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import CourseCard from "../components/CourseCard.jsx";
import { courses, categories } from "../data/courses.js";

const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "duration", label: "Shortest Duration" },
];

export default function Courses() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [level, setLevel] = useState("All");
  const [sort, setSort] = useState("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setQuery(params.get("q") || "");
    setCategory(params.get("category") || "All");
  }, [params]);

  function updateQuery(q) {
    setQuery(q);
    const next = new URLSearchParams(params);
    if (q) next.set("q", q);
    else next.delete("q");
    setParams(next, { replace: true });
  }

  function updateCategory(c) {
    setCategory(c);
    const next = new URLSearchParams(params);
    if (c && c !== "All") next.set("category", c);
    else next.delete("category");
    setParams(next, { replace: true });
  }

  const filtered = useMemo(() => {
    let list = courses.filter((c) => {
      const matchesQuery =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.instructor.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || c.category === category;
      const matchesLevel = level === "All" || c.level === level;
      return matchesQuery && matchesCategory && matchesLevel;
    });

    switch (sort) {
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].sort((a, b) => b.id - a.id);
        break;
      case "duration":
        list = [...list].sort(
          (a, b) => parseFloat(a.duration) - parseFloat(b.duration),
        );
        break;
      default:
        list = [...list].sort((a, b) => b.students - a.students);
    }
    return list;
  }, [query, category, level, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Courses" }]} />
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-ink-900">
            Explore courses
          </h1>
          <p className="mt-1 text-ink-500">
            {filtered.length} course{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            type="text"
            placeholder="Search by title, topic, or instructor..."
            className="w-full rounded-full border border-ink-100 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none focus:border-primary-300"
          />
        </div>
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center justify-center gap-2 rounded-full border border-ink-100 bg-white px-5 py-3 text-sm font-semibold text-ink-700 sm:hidden"
        >
          <FiFilter /> Filters
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="hidden rounded-full border border-ink-100 bg-white px-4 py-3 text-sm font-medium text-ink-700 outline-none focus:border-primary-300 sm:block"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        {/* Filters sidebar */}
        <aside className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
          <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card lg:sticky lg:top-24">
            <div className="flex items-center justify-between lg:hidden">
              <h3 className="font-bold text-ink-900">Filters</h3>
              <button onClick={() => setFiltersOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="mb-6 sm:hidden">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-400">
                Sort by
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-xl border border-ink-100 px-3 py-2 text-sm"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-400">
                Category
              </h4>
              <div className="flex flex-col gap-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => updateCategory(c)}
                    className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      category === c
                        ? "bg-primary-50 text-primary-600"
                        : "text-ink-600 hover:bg-ink-50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-400">
                Level
              </h4>
              <div className="flex flex-col gap-1">
                {levels.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      level === l
                        ? "bg-primary-50 text-primary-600"
                        : "text-ink-600 hover:bg-ink-50"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 py-20 text-center">
              <p className="text-lg font-bold text-ink-800">No courses found</p>
              <p className="mt-1 text-sm text-ink-500">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
