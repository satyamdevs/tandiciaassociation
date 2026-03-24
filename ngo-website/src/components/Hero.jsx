import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative px-6 md:px-12 py-24 max-w-7xl mx-auto">

      {/* TEXT BLOCK */}
      <div className="max-w-4xl">

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-500 mb-8 flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          Scale with Intention
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[48px] md:text-[80px] leading-[1.05] font-serif tracking-tight"
        >
          <span className="text-black">
            See the world clearly —
          </span>
          <br />
          <span className="text-gray-400 font-light">
            help the ones who can’t.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-lg text-gray-500 max-w-xl"
        >
          Because every eye deserves a chance to see clearly.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <button className="bg-green-800 text-white px-8 py-4 rounded-full text-sm font-medium 
          hover:bg-green-700 hover:scale-105 transition-all shadow-md">
            Donate Now →
          </button>
        </motion.div>

      </div>

      {/* IMAGE BLOCK */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-20 overflow-hidden rounded-2xl"
      >
        <img
          src="/image.png"
          alt="Eye care camp"
          className="w-full h-[400px] md:h-[520px] object-cover hover:scale-105 transition duration-700"
        />

        {/* optional overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
      </motion.div>

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40"></div>

    </section>
  );
}