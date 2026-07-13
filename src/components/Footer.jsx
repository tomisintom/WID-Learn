import { Link } from "react-router-dom";
import { FiX, FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";
import Logo from "./Logo.jsx";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "All Courses", to: "/courses" },
      { label: "Web Development", to: "/courses?category=Web2 Development" },
      { label: "Design", to: "/courses?category=Product Design" },
      { label: "Blockchain", to: "/courses?category=Blockchain Development" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Blog", to: "/" },
      { label: "Contact", to: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/" },
      { label: "Terms of Service", to: "/" },
      { label: "Privacy Policy", to: "/" },
      { label: "FAQ", to: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-100 bg-ink-950 text-ink-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              WID Learn (Women in DeFi Learning Platform) helps you build real
              skills with expert-led courses, hands-on lessons, and quizzes that
              track your progress.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                {
                  Icon: FiX,
                  href: "https://x.com/womenindefi_org",
                  label: "X",
                },
                {
                  Icon: FiInstagram,
                  href: "https://www.instagram.com/womenindefi_org/",
                  label: "Instagram",
                },
                {
                  Icon: FiLinkedin,
                  href: "https://www.linkedin.com/company/womenindefi/",
                  label: "LinkedIn",
                },
                {
                  Icon: FiYoutube,
                  href: "https://www.youtube.com/@womenindefi_org",
                  label: "YouTube",
                },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-ink-300 hover:bg-primary-500 hover:text-white transition-colors"
                  aria-label="social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-ink-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} WID Learn. All rights reserved.</p>
          <p>WID Learn by Oluwatosin and Oluwatomisin.</p>
        </div>
      </div>
    </footer>
  );
}
