import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function FeaturedStories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories = [
    {
      img: "/story1.png",
      newspaper: "Hindustan Vision",
      text: '"96 women and 172 men were examined and 267 free spectacles were distributed, with the camp recognized for improving access to quality eye care in Mewla Maharajpur."',
    },
    {
      img: "/story2.png",
      newspaper: "Veerat Vaibhav",
      text: '"A large number of villagers benefited from Tendicia\'s free eye camp in Mewla Maharajpur, where nearly 400 people received screenings and many were given free spectacles."',
    },
    {
      img: "/story3.png",
      newspaper: "National Prahari",
      text: '"368 people underwent detailed eye examinations and 267 were provided free glasses on the spot, reflecting the strong impact of Tendicia\'s outreach."',
    },
    {
      img: "/story5.png",
      newspaper: "Community Press",
      text: '"431 residents of Kusumpur Pahadi slum were screened, including women, men and transgender individuals, with 230 receiving free spectacles and several serious cases identified."',
    },
  ];

  const visibleCount = 4;
  const totalPages = Math.ceil(stories.length / visibleCount);

  useEffect(() => {
    if (totalPages <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const visibleStories = stories.slice(
    currentIndex * visibleCount,
    (currentIndex + 1) * visibleCount
  );

  return (
    <section className="px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-serif leading-tight max-w-3xl">
            Covered by community newspapers
            <br />
            or our impact in eye-care
          </h2>
        </motion.div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            >
              {visibleStories.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative rounded-xl overflow-hidden group cursor-pointer"
                >
                  <div className="aspect-[3/4]">
                    <img
                      src={item.img}
                      alt={item.newspaper}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <p className="text-xs font-semibold text-gray-900">
                      {item.newspaper}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/95 font-medium text-sm leading-snug">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-gray-900 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
