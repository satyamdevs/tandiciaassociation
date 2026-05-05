import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";

export default function CampDetail() {
  const { campName } = useParams();
  const decodedCampName = decodeURIComponent(campName);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .eq("location", decodedCampName)
          .order("created_at", { ascending: false });

        if (data) setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [decodedCampName]);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      <section ref={heroRef} className="relative px-6 md:px-12 py-20 md:py-32 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-green-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-3xl opacity-50" />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/engagements"
              className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 transition mb-8 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all camps
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-5 py-2 rounded-full text-sm font-medium mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {images.length} {images.length === 1 ? "Moment" : "Moments"} Captured
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6"
          >
            {decodedCampName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Eye care camp moments
          </motion.p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-400 text-lg mb-6">No images found for this camp</p>
              <Link
                to="/admin"
                className="inline-block text-gray-700 border border-gray-300 px-6 py-3 rounded-full text-sm hover:bg-gray-900 hover:text-white transition duration-300"
              >
                Add Images →
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {images.map((img, i) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    className="group relative overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square">
                      <img
                        src={img.url}
                        alt={img.location}
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  to="/engagements"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-all text-sm group"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all camps
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
