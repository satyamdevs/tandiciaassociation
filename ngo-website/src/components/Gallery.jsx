import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
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
    <section ref={ref} className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-serif leading-tight text-gray-900">
          Moments that matter
        </h2>
        <p className="mt-3 text-gray-500">
          Real stories from our eye care camps across communities.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full" />
        </div>
      ) : images.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center py-20 bg-gray-50 rounded-2xl"
        >
          <p className="text-gray-400">Gallery images coming soon</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
            >
              <div
                className={`aspect-square ${
                  i === 0 || i === 4 ? "md:col-span-2" : ""
                }`}
              >
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
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 text-center"
      >
        <a
          href="/admin"
          className="text-gray-700 border border-gray-300 px-6 py-3 rounded-full text-sm hover:bg-gray-900 hover:text-white transition duration-300"
        >
          Manage Gallery →
        </a>
      </motion.div>
    </section>
  );
}
