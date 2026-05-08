import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const impactStats = [
  { value: 12500, suffix: "+", label: "People screened across multiple villages and slum communities" },
  { value: 3600, suffix: "+", label: "Free spectacles distributed to individuals in need" },
  { value: 420, suffix: "+", label: "Cataract surgeries coordinated through partner hospitals" },
];

const teamMembers = [
  "Sanjeev Babbar",
  "Dr. Prabhat Manocha",
  "Vikram Soni",
  "Yash Babbar",
  "Narender Sharma",
  "Raj Chhabra",
  "Ravi Sikka",
  "Karan Jaggi",
  "Raj Malhotra",
  "Anoop Rana",
  "Anish Aggarwal",
  "Subhash Saini",
  "Rajesh Arora",
  "Sushil Bhardwaj",
  "Amit Mathur",
  "Rajeev Sharma",
  "Gaurav Puri",
  "Ashok Dua",
  "Rajesh Negi",
  "Akhilesh Verma",
  "Himanshu Atal",
  "Kanjam Manocha",
  "Tanvee Manocha",
  "Parth Sharma",
  "Naveen Sharma",
  "Charvi Arora",
  "Kiran Sethi",
];

const values = [
  { title: "Accessibility", desc: "Free eye care for every individual, regardless of income or location." },
  { title: "Dignity", desc: "Every patient deserves respectful, quality care." },
  { title: "Impact", desc: "Real outcomes through early detection and follow-up." },
];

function AnimatedNumber({ value, suffix, inView }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = value / (1500 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span>{displayValue.toLocaleString()}{suffix}</span>;
}

function ImpactCard({ stat, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.12 }}
      className="relative bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-2">
        <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
      </div>
      <p className="text-gray-500 text-sm md:text-base leading-relaxed">{stat.label}</p>
    </motion.div>
  );
}

function TeamCard({ name, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, delay: index * 0.025 }}
      className="group text-center"
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-3 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
        <img
          src={`/team/${index + 1}.jpg`}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.style.opacity = "0";
            e.target.parentElement.style.background = "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%)";
            e.target.parentElement.innerHTML = `<span class="flex items-center justify-center w-full h-full text-green-700 font-bold text-lg md:text-xl">${name.split(" ").map((n) => n[0]).join("")}</span>`;
          }}
        />
      </div>
      <p className="font-semibold text-gray-800 text-xs md:text-sm">{name}</p>
      <p className="text-gray-400 text-xs md:text-sm mt-0.5">Member</p>
    </motion.div>
  );
}

function ValueCard({ value, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      className="bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
        <svg className="w-5 h-5 md:w-6 md:h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg md:text-xl font-serif text-gray-900 mb-2">{value.title}</h3>
      <p className="text-gray-500 text-sm md:text-base">{value.desc}</p>
    </motion.div>
  );
}

function SectionImage({ src, alt, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative rounded-2xl overflow-hidden shadow-lg group"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-64 md:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function About() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const approachRef = useRef(null);
  const approachInView = useInView(approachRef, { once: true, amount: 0.3 });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 });

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <section ref={heroRef} className="relative px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute top-10 right-0 w-80 h-80 md:w-96 md:h-96 bg-green-100 rounded-full blur-3xl opacity-40" />

        <div className="relative max-w-6xl mx-auto">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs md:text-sm text-green-700 font-medium mb-4 md:mb-6"
          >
            About Tandicia
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6 md:mb-8"
          >
            For communities who deserve
            <br />
            <span className="text-gray-400">clear vision, dignity,</span>
            <br />
            <span className="text-gray-400">and accessible care.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-gray-500 max-w-2xl leading-relaxed"
          >
            Tandicia brings free eye-care to underserved villages, slum settlements, and low income regions. Our mission is simple — make quality vision care reachable for every individual, without cost, delay, or discrimination.
          </motion.p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-12 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <SectionImage src="/team/team.png" alt="Tandicia eye camp" index={0} isInView={heroInView} />
        </div>
      </section>

      <section ref={approachRef} className="px-6 md:px-12 py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={approachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4">
              Our approach goes beyond treatment.
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
              We're building a system where underserved communities get regular screenings, reliable diagnosis, and respectful care. Our approach blends medical expertise, community outreach, and structured camp execution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {values.map((value, index) => (
              <ValueCard key={index} value={value} index={index} isInView={approachInView} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-12 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <SectionImage src="/about/approach.jpg" alt="Our approach" index={1} isInView={approachInView} />
        </div>
      </section>

      <section ref={statsRef} className="px-6 md:px-12 py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900">
              Numbers behind the impact
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {impactStats.map((stat, index) => (
              <ImpactCard key={index} stat={stat} index={index} isInView={statsInView} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-12 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <SectionImage src="/team/impact.png" alt="Our impact" index={2} isInView={statsInView} />
        </div>
      </section>

      <section className="px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={teamRef}
            initial={{ opacity: 0, y: 25 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-2">
              Meet the team
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              Building one eye camp at a time
            </p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-6">
            {teamMembers.map((name, index) => (
              <TeamCard key={index} name={name} index={index} isInView={teamInView} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}