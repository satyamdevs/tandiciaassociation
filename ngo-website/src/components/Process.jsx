import { motion } from "framer-motion";

const steps = [
  {
    title: "Site Inspection & Coordination",
    desc: "Our team visits the location before the camp, checks available space, ensures safety, and coordinates with local officials.",
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    title: "Vision Check + Basic Tests",
    desc: "We conduct initial tests: visual acuity, power check, and screening to detect common eye issues.",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    title: "Detailed Diagnosis",
    desc: "Patients who need deeper evaluation meet specialists for retina exams, cataract checks, and analysis.",
    gradient: "from-purple-400 to-pink-600",
  },
  {
    title: "Treatment & Follow-up",
    desc: "From glasses distribution to surgery referrals, we ensure long-term care.",
    gradient: "from-orange-400 to-red-500",
  },
];

export default function Process() {
  return (
    <section className="bg-black text-white py-24">

      {/* Heading */}
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-6xl font-serif">
          How Tandicia Works,
          <br />
          <span className="text-gray-500">
            from first touch to full care.
          </span>
        </h2>
      </div>

      {/* Horizontal Scroll */}
      <div className="overflow-x-auto no-scrollbar px-6">
        <div className="flex gap-6 min-w-max">

          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`w-[300px] h-[400px] rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br ${step.gradient}`}
            >
              <h3 className="text-lg font-semibold">
                {step.title}
              </h3>

              <p className="text-sm text-white/90">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>

    </section>
  );
}