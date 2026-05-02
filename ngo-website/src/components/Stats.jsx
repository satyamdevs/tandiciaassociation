import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 95, suffix: "%", label: "Improvement in vision clarity after our community eye camps." },
  { value: 12000, suffix: "+", label: "People screened across rural and underserved regions." },
  { value: 8000, suffix: "+", label: "Spectacles distributed to patients who couldn't afford them." },
];

const bgImages = [
  "/gallery/image1.png",
  "/gallery/image2.png",
  "/gallery/image3.png",
  "/gallery/image4.png",
  "/gallery/image5.png",
  "/gallery/image6.png",
  "/gallery/image7.png",
  "/gallery/image8.png",
];

function AnimatedNumber({ value, suffix, inView }) {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { damping: 20, stiffness: 50 });
  const animatedValue = useTransform(spring, (val) => Math.round(val).toLocaleString());

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, value, spring]);

  useEffect(() => {
    const unsubscribe = animatedValue.on("change", (v) => {
      setDisplayValue(v);
    });
    return unsubscribe;
  }, [animatedValue]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

function StatItem({ stat, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
      className="text-center"
    >
      <div className="text-5xl md:text-7xl font-serif text-white mb-2">
        <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
      </div>
      <p className="text-gray-300 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0">
        <div className="grid grid-cols-4 md:grid-cols-8 h-full opacity-20">
          {bgImages.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative max-w-6xl mx-auto py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-serif leading-tight text-white">
            Support that helps people see
            <br />
            the world the way they were meant to.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}