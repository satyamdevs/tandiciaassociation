import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";

export default function Gallery() {
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
          .order("created_at", { ascending: false });

        if (data) setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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
            Gallery
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-6"
          >
            Moments that matter
            <br />
            <span className="text-gray-400 italic">from our camps.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl"
          >
            Real stories from our eye care camps across communities.
          </motion.p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-400 text-lg mb-6">Gallery images coming soon</p>
              <Link
                to="/admin"
                className="inline-block text-gray-700 border border-gray-300 px-6 py-3 rounded-full text-sm hover:bg-gray-900 hover:text-white transition duration-300"
              >
                Manage Gallery →
              </Link>
            </div>
          ) : (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                >
                  <div className="aspect-square">
                    <img
                      src={img.url}
                      alt={img.location}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300">
                      <p className="text-white font-medium text-sm">{img.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            </>
          )}

          {!loading && images.length > 0 && (
            <div className="mt-10 text-center">
              <Link
                to="/admin"
                className="inline-block text-gray-700 border border-gray-300 px-6 py-3 rounded-full text-sm hover:bg-gray-900 hover:text-white transition duration-300"
              >
                Manage Gallery →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
