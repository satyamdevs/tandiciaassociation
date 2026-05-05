import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkStyle = (path) =>
    `transition ${
      location.pathname === path
        ? "text-black font-semibold"
        : "text-gray-600 hover:text-black"
    }`;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
          <img src="/logo.png" className="w-9 h-9 object-contain" />
          <span className="text-lg font-semibold tracking-tight">Tandicia</span>
        </Link>

        {/* Desktop LINKS */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          <Link to="/" className={linkStyle("/")}>Home</Link>
          <Link to="/about" className={linkStyle("/about")}>Company</Link>
          <Link to="/engagements" className={linkStyle("/engagements")}>Engagements</Link>
          <Link to="/associations" className={linkStyle("/associations")}>Associations</Link>
          <Link to="/faq" className={linkStyle("/faq")}>FAQ</Link>
          <Link to="/contact" className={linkStyle("/contact")}>Contact</Link>
        </div>

        {/* Desktop CTA */}
        <Link
          to="/donate"
          className="hidden md:block bg-green-800 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition-all shadow-sm hover:shadow-md"
        >
          Donate Now
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              <Link
                to="/"
                className={`block py-3 ${linkStyle("/")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`block py-3 ${linkStyle("/about")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Company
              </Link>
              <Link
                to="/engagements"
                className={`block py-3 ${linkStyle("/engagements")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Engagements
              </Link>
              <Link
                to="/associations"
                className={`block py-3 ${linkStyle("/associations")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Associations
              </Link>
              <Link
                to="/faq"
                className={`block py-3 ${linkStyle("/faq")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className={`block py-3 ${linkStyle("/contact")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/donate"
                className="block py-3 mt-2 bg-green-800 text-white text-center rounded-full text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}