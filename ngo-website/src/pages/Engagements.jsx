import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Engagements() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [images, setImages] = useState([]);
  const [upcomingCamps, setUpcomingCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upcomingLoading, setUpcomingLoading] = useState(true);

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

    const fetchUpcomingCamps = async () => {
      try {
        const { data, error } = await supabase
          .from("upcoming_camps")
          .select("*")
          .gte("camp_date", new Date().toISOString().split("T")[0])
          .order("camp_date", { ascending: true });

        if (error) throw error;
        setUpcomingCamps(data || []);
      } catch (error) {
        console.error("Error fetching upcoming camps:", error);
      } finally {
        setUpcomingLoading(false);
      }
    };

    fetchImages();
    fetchUpcomingCamps();
  }, []);

  const camps = images.reduce((acc, img) => {
    const location = img.location || "Uncategorized";
    if (!acc[location]) acc[location] = [];
    acc[location].push(img);
    return acc;
  }, {});

  const campNames = Object.keys(camps);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      <section ref={heroRef} className="relative px-6 md:px-12 py-16 md:py-20 md:py-32 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-green-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-32 -left-32 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-emerald-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-green-50/40 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 md:px-5 py-2 rounded-full text-sm font-medium mb-6 md:mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {campNames.length} {campNames.length === 1 ? "Camp" : "Camps"} Across Communities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif leading-tight mb-4 md:mb-6"
          >
            Our Camps,
            <br />
            <span className="text-gray-300 italic">our moments.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Explore our eye care engagements across different communities. Click a camp to see all moments.
          </motion.p>
        </div>
      </section>

      {/* Upcoming Camps Section */}
      <section className="px-6 md:px-12 py-12 md:py-16 bg-green-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Coming Soon
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4">
              Upcoming Camps
            </h2>
            <p className="text-gray-500 text-lg">
              Join us at our next eye care camp. Mark your calendar!
            </p>
          </motion.div>

          {upcomingLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : upcomingCamps.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white rounded-3xl border border-green-100"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg mb-2">No upcoming camps scheduled</p>
              <p className="text-gray-300 text-sm">Check back later for updates</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingCamps.map((camp, idx) => (
                <motion.div
                  key={camp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden border border-green-100 hover:shadow-lg hover:border-green-200 transition-all group"
                >
                  {camp.banner_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={camp.banner_url}
                        alt={camp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                      <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <h3 className="text-xl font-serif text-gray-900 mb-2">{camp.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {new Date(camp.camp_date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {camp.location && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{camp.location}</span>
                      </div>
                    )}

                    {camp.time && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{camp.time}</span>
                      </div>
                    )}
                  </div>

                  {camp.description && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{camp.description}</p>
                  )}

                  <div className="pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1 text-green-700 text-sm font-medium group-hover:gap-2 transition-all">
                      Learn more
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!upcomingLoading && upcomingCamps.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-green-800 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-green-700 transition-all shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule a Camp
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Past Camps Section */}
      <section className="px-6 md:px-12 py-12 md:py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Past Events
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4">
              Past Camps
            </h2>
            <p className="text-gray-500 text-lg">
              Explore our previous eye care engagements and moments captured.
            </p>
          </motion.div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-100 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                      <div className="w-56 h-6 bg-gray-100 rounded-lg" />
                      <div className="w-16 h-6 bg-gray-100 rounded-full" />
                    </div>
                    <div className="w-5 h-5 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : campNames.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-gradient-to-br from-gray-50 to-green-50/30 rounded-3xl border border-gray-100"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg mb-2">No engagements yet</p>
              <p className="text-gray-300 text-sm mb-8">Images from camps will appear here</p>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Images
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {campNames.map((campName, idx) => (
                <motion.div
                  key={campName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group border border-gray-200 bg-white rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-300"
                >
                  <Link
                    to={`/engagements/${encodeURIComponent(campName)}`}
                    className="w-full flex items-center justify-between px-6 py-5 md:px-8 md:py-6 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className="text-lg md:text-xl font-serif text-gray-900 block group-hover:text-green-800 transition-colors">
                          {campName}
                        </span>
                        <span className="text-xs text-gray-400 mt-0.5">
                          {camps[campName].length} {camps[campName].length === 1 ? "moment" : "moments"} captured
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="hidden sm:inline-block text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                        {camps[campName].length} {camps[campName].length === 1 ? "img" : "imgs"}
                      </span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && campNames.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center"
            >
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-all text-sm group"
              >
                Manage camps
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
