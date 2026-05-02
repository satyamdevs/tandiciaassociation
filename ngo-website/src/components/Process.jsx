import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Community Reach",
    desc: "We identify underserved communities where access to proper eye care is limited and plan targeted outreach.",
  },
  {
    title: "Site Inspection & Coordination",
    desc: "Our team visits the location before the camp, checks available space, ensures safety, and coordinates with local officials so everything runs smoothly.",
  },
  {
    title: "Vision Check + Basic Tests",
    desc: "We conduct initial tests: visual acuity, power check, and basic screening to detect common eye issues and filter priority cases.",
  },
  {
    title: "Detailed Diagnosis",
    desc: "Patients who need deeper evaluation meet specialists for retina exams, cataract checks, pressure tests, and medical analysis.",
  },
  {
    title: "Immediate Care",
    desc: "On-spot support: spectacles, medicines, prescriptions, and protective eye-care instructions — delivered right at the camp.",
  },
  {
    title: "Long-Term Care",
    desc: "For advanced cases, we arrange hospital referrals, surgery coordination, and continuous follow-ups.",
  },
];

function PulsingDot() {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="w-16 h-16 rounded-full bg-teal-400/30" />
    </motion.div>
  );
}

function AnimatedIcon({ index }) {
  const icons = [
    <svg key="1" viewBox="0 0 64 64" fill="none" className="w-24 h-24">
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" className="text-teal-600" />
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2" className="text-teal-500" />
      <motion.circle cx="32" cy="32" r="3" fill="currentColor" className="text-teal-600" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <path d="M8 32h4M52 32h4M32 8v4M32 52v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-teal-400" />
    </svg>,
    <svg key="2" viewBox="0 0 64 64" fill="none" className="w-24 h-24">
      <rect x="12" y="14" width="40" height="36" rx="4" stroke="currentColor" strokeWidth="2" className="text-teal-600" />
      <path d="M20 26h24M20 32h16M20 38h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-teal-500" />
      <motion.circle cx="48" cy="22" r="2" fill="currentColor" className="text-amber-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
    </svg>,
    <svg key="3" viewBox="0 0 64 64" fill="none" className="w-24 h-24">
      <rect x="20" y="8" width="24" height="48" rx="2" stroke="currentColor" strokeWidth="2" className="text-teal-600" />
      <path d="M26 18h12M26 26h12M26 34h8M26 42h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-teal-500" />
      <text x="32" y="54" textAnchor="middle" fontSize="8" fill="currentColor" className="text-teal-400">E</text>
    </svg>,
    <svg key="4" viewBox="0 0 64 64" fill="none" className="w-24 h-24">
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" className="text-teal-600" />
      <motion.path d="M32 12v40M12 32h40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-teal-400" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
      <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="2" className="text-teal-500" />
      <path d="M32 22v6l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600" />
    </svg>,
    <svg key="5" viewBox="0 0 64 64" fill="none" className="w-24 h-24">
      <path d="M20 24c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-teal-600" />
      <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="2" className="text-teal-500" />
      <motion.path d="M26 32h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-teal-400" animate={{ scaleX: [1, 0.8, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <path d="M32 26v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-teal-400" />
    </svg>,
    <svg key="6" viewBox="0 0 64 64" fill="none" className="w-24 h-24">
      <path d="M16 52V24l16-16h16v44H16z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="text-teal-600" />
      <motion.path d="M24 52V32h8v20" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="text-teal-500" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <path d="M36 20v12M40 16v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-teal-400" />
    </svg>,
  ];

  return icons[index];
}

function StepCard({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`grid md:grid-cols-2 gap-10 md:gap-12 items-center ${!isEven ? "md:flex-row-reverse" : ""}`}
    >
      <motion.div
        className="relative flex items-center justify-center min-h-[280px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl" />
        <div className="relative z-10 text-teal-600">
          <AnimatedIcon index={index} />
        </div>
        <PulsingDot />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? 20 : -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
            Step {index + 1}
          </span>
          <motion.div
            className="h-px bg-gradient-to-r from-teal-300 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
          />
        </div>

        <h3 className="text-2xl md:text-3xl font-serif mb-4 text-gray-800">
          {step.title}
        </h3>

        <p className="text-gray-500 leading-relaxed max-w-md">
          {step.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Process() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section className="px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-12 md:mb-16 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-serif leading-tight text-gray-800"
          >
            How Tandicia works
            <br />
            <span className="text-gray-400">
              from first touch to full care.
            </span>
          </motion.h2>
        </div>

        <div className="space-y-12 md:space-y-16">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}