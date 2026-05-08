import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      <section ref={heroRef} className="relative px-6 md:px-12 py-20 md:py-32 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50" />

        <div className="relative max-w-6xl mx-auto">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm text-green-700 font-medium mb-4 tracking-wide"
          >
            Contact Us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-6"
          >
            Let's connect and create
            <br />
            <span className="text-gray-400 italic">real impact together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl"
          >
            Whether you want to support, collaborate, or just learn more — we're always open to meaningful conversations.
          </motion.p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group bg-gray-50 rounded-3xl p-8 md:p-10 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-3">Email us</h3>
              <p className="text-gray-500 mb-6">
                For collaborations, donations, or general queries.
              </p>
              <a
                href="mailto:tandiciaassociation@gmail.com"
                className="text-green-700 font-medium hover:underline"
              >
                tandiciaassociation@gmail.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group bg-gray-50 rounded-3xl p-8 md:p-10 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-3">Call us</h3>
              <p className="text-gray-500 mb-6">
                Speak directly with our team.
              </p>
              <a
                href="tel:+919813236669"
                className="text-green-700 font-medium hover:underline"
              >
                +91 98132 36669
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group bg-gray-50 rounded-3xl p-8 md:p-10 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-3">Visit us</h3>
              <p className="text-gray-500 mb-6">
                Come meet the team behind our mission.
              </p>
              <p className="text-green-700 font-medium">
                Mewla Maharajpur, Gurugram
                <br />
                Haryana, India
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group bg-gray-50 rounded-3xl p-8 md:p-10 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-3">Working Hours</h3>
              <p className="text-gray-500 mb-6">
                When you can reach us.
              </p>
              <p className="text-green-700 font-medium">
                Mon – Sat: 9:00 AM – 6:00 PM
                <br />
                Sunday: Closed
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              Want to support our work?
            </h2>
            <p className="text-gray-500 mb-8 text-lg max-w-xl mx-auto">
              Every contribution helps restore vision and improve lives.
            </p>
            <Link
              to="/donate"
              className="inline-block bg-green-800 text-white px-8 py-4 rounded-full font-medium hover:bg-green-700 transition-all shadow-md hover:shadow-xl hover:scale-105"
            >
              Donate Now →
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
