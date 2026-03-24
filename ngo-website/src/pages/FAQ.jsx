import { useState } from "react";
import Navbar from "../components/Navbar";

const faqs = [
  {
    q: "What kind of communities do you serve?",
    a: "We work with rural villages, slum areas, low-income neighborhoods, and regions where people don’t have easy access to proper eye-care facilities. If vision support is needed — we go there.",
  },
  {
    q: "How is your eye camp different from regular check-up clinics?",
    a: "Our camps are free, mobile, well-organized, and come directly to underserved areas. No long travel, no consulting fees, no waiting for weeks — immediate screening, diagnosis, and support on the spot.",
  },
  {
    q: "What does the camp process look like?",
    a: "Each camp includes: primary screening, specialist examination, free spectacles/medicine distribution, referrals for surgeries, and follow-up support — all done smoothly on the same day.",
  },
  {
    q: "What impact metrics do you track?",
    a: "We track: number of patients screened, spectacles distributed, serious cases identified, surgeries supported, and follow-up outcomes.",
  },
  {
    q: "Do you work with individuals or full communities?",
    a: "Both. We support individuals during camps, but our goal is improving vision health across entire communities.",
  },
  {
    q: "Is this service really free?",
    a: "Yes. No fees, no charges, no hidden costs. Everything is provided free through donations.",
  },
  {
    q: "Do you need volunteers?",
    a: "Always. Volunteers help with operations, awareness, and coordination during camps.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div className="bg-white text-gray-900 min-h-screen">

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-serif mb-12">
          Got questions?
          <br />
          <span className="text-gray-400">
            We’ve got answers.
          </span>
        </h1>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-sm transition"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  {item.q}
                </h3>
                <span className="text-xl">
                  {open === i ? "−" : "+"}
                </span>
              </div>

              {open === i && (
                <p className="mt-4 text-gray-500 leading-relaxed">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}