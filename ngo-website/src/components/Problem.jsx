import { motion } from "framer-motion";

const data = [
  {
    title: "Strategic care that reaches where others don’t",
    desc: "We set up free eye camps in remote and underserved areas, conduct screenings, provide glasses, and guide patients toward proper treatment. Real impact — not just awareness posters.",
  },
  {
    title: "Patient-first approach",
    desc: "Every checkup is personalized — from diagnosis to guidance. No rushing, no ignoring symptoms. Just clarity, support, and the right care for every individual who walks in.",
  },
  {
    title: "Systems that restore vision at scale",
    desc: "We build structured, community-based eye-care programs that keep working long after the camp ends — from follow-ups to referrals to surgery coordination.",
  },
];

export default function Problem() {
  return (
    <section id="about" className="px-6 md:px-10 py-24 max-w-7xl mx-auto">

      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-serif mb-16">
        Too many eye problems,
        <br />
        <span className="text-gray-400 italic">
          not enough access?
        </span>
      </h2>

      {/* 3 Columns */}
      <div className="grid md:grid-cols-3 gap-10 mb-20">
        {data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif mb-4">
              {item.title}
            </h3>

            <div className="w-10 h-[2px] bg-black mb-4"></div>

            <p className="text-gray-500 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* IMAGE SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-2xl"
      >
        <img
          src="/image-copy.png"   // 👉 put your real NGO image here
          alt="Eye camp"
          className="w-full h-[400px] md:h-[500px] object-cover"
        />
      </motion.div>

    </section>
  );
}