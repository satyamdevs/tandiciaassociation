import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqs = [
  {
    q: "What kind of communities do you serve?",
    a: "We work with rural villages, slum areas, low-income neighborhoods, and regions where people don't have easy access to proper eye-care facilities. If vision support is needed — we go there.",
  },
  {
    q: "How is your eye camp different from regular check-up clinics?",
    a: "Our camps are free, mobile, well-organized, and come directly to underserved areas. No long travel, no consulting fees, no waiting for weeks — immediate screening, diagnosis, and support on the spot.",
  },
  {
    q: "What does the camp process look like?",
    a: "Each camp includes: primary screening, specialist examination, free spectacles/medicine distribution, referrals for surgeries, and follow-up support — all done smoothly on the same day.",
  },
  {
    q: "What impact metrics do you track?",
    a: "We track: number of patients screened, spectacles distributed, serious cases identified, surgeries supported, and follow-up outcomes.",
  },
  {
    q: "Do you work with individuals or full communities?",
    a: "Both. We support individuals during camps, but our goal is improving vision health across entire communities.",
  },
  {
    q: "Is this service really free?",
    a: "Yes. No fees, no charges, no hidden costs. Everything is provided free through donations.",
  },
  {
    q: "Do you need volunteers?",
    a: "Always. Volunteers help with operations, awareness, and coordination during camps.",
  },
];

function FaqItem({ item, index, isOpen, onClick, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`border-b border-gray-200 last:border-0 ${isOpen ? "bg-gray-50 rounded-2xl p-6 mb-2" : ""}`}
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-6 text-left"
      >
        <h3 className="text-lg md:text-xl font-medium pr-8">{item.q}</h3>
        <span className={`text-2xl text-green-700 transition-transform ${isOpen ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      {isOpen && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-gray-500 leading-relaxed pb-4"
        >
          {item.a}
        </motion.p>
      )}
    </motion.div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      <section ref={heroRef} className="relative px-6 md:px-12 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50" />

        <div className="relative max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm text-green-800 font-medium mb-4"
          >
            FAQ
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif leading-tight mb-6"
          >
            Got questions?
            <br />
            <span className="text-gray-400">We've got answers.</span>
          </motion.h1>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-8">
          {faqs.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              isOpen={open === i}
              onClick={() => setOpen(open === i ? null : i)}
              isInView={heroInView}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}