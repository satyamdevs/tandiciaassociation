import { motion } from "framer-motion";

const data = [
  {
    title: "Strategic care that reaches where others don't",
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
    <section id="about" className="px-6 md:px-12 max-w-7xl mx-auto">
      <div className="py-12 md:py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-10 md:mb-12 md:mb-16">
          Too many eye problems,
          <br />
          <span className="text-gray-400 italic">
            not enough access?
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:gap-10 mb-10 md:mb-12 md:mb-16">
          {data.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="pt-2"
            >
              <h3 className="text-lg sm:text-xl font-serif mb-3">
                {item.title}
              </h3>

              <div className="w-10 h-[2px] bg-black mb-4"></div>

              <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl"
        >
          <img
            src="/image-copy.png"
            alt="Eye camp"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}