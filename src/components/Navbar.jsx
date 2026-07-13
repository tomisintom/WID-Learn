import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiLogOut,
  FiGrid,
  FiChevronDown,
} from "react-icons/fi";
import Logo from "./Logo.jsx";
import Button from "./Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const q = e.target.elements.q.value.trim();
    navigate(q ? `/courses?q=${encodeURIComponent(q)}` : "/courses");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-ink-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-600"
                      : "text-ink-600 hover:text-ink-900"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-sm mx-2"
          >
            <div className="relative w-full">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                name="q"
                type="text"
                placeholder="Search courses..."
                className="w-full rounded-full border border-ink-100 bg-ink-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-300 focus:bg-white transition-colors"
              />
            </div>
          </form>

          <div className="hidden lg:flex items-center gap-2">
            {!user ? (
              <>
                <Button to="/login" variant="ghost" size="md">
                  Log in
                </Button>
                <Button to="/signup" variant="primary" size="md">
                  Get Started
                </Button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  // onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
                  className="flex items-center gap-2 rounded-full border border-ink-100 py-1 pl-1 pr-3 hover:border-ink-200"
                >
                  {/* <img src={user.avatar} alt="" className="h-8 w-8 rounded-full bg-ink-100" /> */}
                  <span className="text-sm font-semibold text-ink-800 max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <FiChevronDown className="text-ink-400" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 z-50 rounded-2xl border border-ink-100 bg-white p-2 shadow-card-hover">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
                    >
                      <FiGrid /> Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
                    >
                      <FiUser /> Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <FiLogOut /> Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="lg:hidden p-2 -mr-2 text-ink-700"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-100 bg-white px-4 pb-5 pt-3 sm:px-6">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                name="q"
                type="text"
                placeholder="Search courses..."
                className="w-full rounded-full border border-ink-100 bg-ink-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-300"
              />
            </div>
          </form>
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-primary-50 text-primary-600" : "text-ink-700"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-ink-700"
              >
                Profile
              </NavLink>
            )}
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {!user ? (
              <>
                <Button
                  to="/login"
                  variant="outline"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Button>
                <Button
                  to="/signup"
                  variant="primary"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  logout();
                  setOpen(false);
                  navigate("/");
                }}
              >
                Log out
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
