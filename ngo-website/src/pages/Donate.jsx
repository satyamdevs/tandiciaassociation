import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Donate() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      <section ref={heroRef} className="relative px-6 md:px-12 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-block text-sm text-green-800 font-medium mb-4"
              >
                Donate
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-serif leading-tight mb-6"
              >
                Invest in someone's
                <br />
                <span className="text-gray-400 italic">vision, your way.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-500 max-w-md"
              >
                Your contribution helps provide free eye check-ups, glasses, surgeries, and long-term care for those who need it most.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img
                src="/donate.png"
                alt="Eye checkup"
                className="rounded-3xl w-full h-[400px] md:h-[450px] object-cover shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif leading-tight max-w-3xl">
              No pressure. Just the support, care, and clarity you choose to give.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-50 rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src="/qr.png"
                alt="QR Code"
                className="w-full max-w-xs object-contain mb-6 hover:scale-105 transition duration-300"
              />
              <p className="text-sm text-gray-500">Scan to donate instantly</p>
            </div>

            <div>
              <h3 className="text-2xl font-serif mb-4 text-gray-800">Pay as you like</h3>
              <p className="text-gray-500 mb-6">
                Support our eye-care camps, treatments, and free glasses distribution across underserved communities.
              </p>

              <div className="space-y-3 text-gray-600 mb-8">
                <p><strong className="font-medium">Account Name:</strong> Tandicia Association</p>
                <p><strong className="font-medium">IFSC:</strong> CIUB0000102</p>
                <p><strong className="font-medium">Account Number:</strong> 510909010308848</p>
                <p><strong className="font-medium">Bank:</strong> City Union Bank Ltd (CUB)</p>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-white rounded-2xl p-4">
                  <p className="text-2xl font-serif text-green-800">100%</p>
                  <p className="text-xs text-gray-500 mt-1">Used for care</p>
                </div>
                <div className="bg-white rounded-2xl p-4">
                  <p className="text-2xl font-serif text-green-800">12k+</p>
                  <p className="text-xs text-gray-500 mt-1">Lives impacted</p>
                </div>
                <div className="bg-white rounded-2xl p-4">
                  <p className="text-2xl font-serif text-green-800">Free</p>
                  <p className="text-xs text-gray-500 mt-1">For patients</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 mb-4">Have questions?</p>
            <Link to="/contact" className="text-green-700 font-medium hover:underline">
              Contact us →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}