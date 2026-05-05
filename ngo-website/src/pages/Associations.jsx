import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function Associations() {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const { data, error } = await supabase
          .from("associations")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setAssociations(data || []);
      } catch (error) {
        console.error("Error fetching associations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociations();
  }, []);

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="bg-green-50 text-green-800 px-5 py-2 rounded-full text-sm font-medium inline-block mb-6">
            Our Partners
          </span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6">
            Our Associations
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            We collaborate with leading organizations, government bodies, and healthcare institutions to amplify our impact and reach those in need.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-xl mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && associations.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif mb-4">No associations yet</h3>
            <p className="text-gray-500 mb-8">Add your first partner via the admin panel.</p>
            <Link
              to="/admin"
              className="bg-green-800 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-green-700 transition-all shadow-sm hover:shadow-md inline-block"
            >
              Go to Admin
            </Link>
          </div>
        )}

        {/* Associations Grid */}
        {!loading && associations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {associations.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-gray-200 bg-white rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all"
              >
                {/* Logo */}
                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
                  {partner.logo_url ? (
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                </div>

                {/* Partner Info */}
                <h3 className="text-xl font-serif mb-2">{partner.name}</h3>
                {partner.description && (
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">{partner.description}</p>
                )}

                {/* Website Link */}
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-800 text-sm font-medium hover:text-green-700 transition-colors inline-flex items-center gap-1"
                  >
                    Visit Website
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
