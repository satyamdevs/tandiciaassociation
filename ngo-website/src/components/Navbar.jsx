import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `transition ${
      location.pathname === path
        ? "text-black font-semibold"
        : "text-gray-600 hover:text-black"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-9 h-9 object-contain" />
          <span className="text-lg md:text-xl font-semibold tracking-tight">
            Tandicia
          </span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium">
          <Link to="/" className={linkStyle("/")}>Home</Link>
          <Link to="/about" className={linkStyle("/about")}>Company</Link>
          <Link to="/engagements" className={linkStyle("/engagements")}>Engagements</Link>
          <Link to="/faq" className={linkStyle("/faq")}>FAQ</Link>
          <Link to="/contact" className={linkStyle("/contact")}>Contact</Link>
        </div>

        {/* CTA */}
        <Link
          to="/donate"
          className="bg-green-800 text-white px-6 py-2.5 rounded-full text-sm font-medium 
          hover:bg-green-700 transition-all shadow-sm hover:shadow-md"
        >
          Donate Now
        </Link>

      </div>
    </nav>
  );
}