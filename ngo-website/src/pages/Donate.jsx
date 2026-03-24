import Navbar from "../components/Navbar";

export default function Donate() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">

          {/* TEXT */}
          <div>
            <p className="text-sm text-gray-500 mb-4">● Donate</p>

            <h1 className="text-4xl md:text-6xl font-serif leading-tight">
              Invest in someone’s
              <br />
              vision, <span className="text-gray-400 italic">your way.</span>
            </h1>

            <p className="mt-6 text-gray-500 max-w-md">
              Your contribution helps provide free eye check-ups, glasses,
              surgeries, and long-term care for those who need it most.
            </p>
          </div>

          {/* IMAGE */}
          <div>
            <img
              src="/donate.png"
              alt="Eye checkup"
              className="rounded-2xl w-full h-[420px] object-cover shadow-md"
            />
          </div>

        </div>

        {/* MESSAGE */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-serif leading-tight max-w-3xl">
            No pressure. Just the support,
            <br />
            care, and clarity you choose to give.
          </h2>
        </div>

        {/* MAIN DONATION BLOCK */}
        <div className="bg-gray-50 rounded-3xl p-6 md:p-10 grid md:grid-cols-2 gap-10 items-center">

          {/* QR SIDE */}
          <div className="flex flex-col items-center text-center">

            <img
              src="/qr.png"
              alt="QR Code"
              className="w-full max-w-xs object-contain mb-4 hover:scale-105 transition duration-300"
            />

            <p className="text-sm text-gray-500">
              Scan to donate instantly
            </p>

          </div>

          {/* DETAILS SIDE */}
          <div>

            <h3 className="text-2xl font-serif mb-4 text-gray-800">
              Pay as you like
            </h3>

            <p className="text-gray-500 mb-6">
              Support our eye-care camps, treatments, and free glasses
              distribution across underserved communities.
            </p>

            <div className="space-y-3 text-gray-600 text-sm mb-8">

              <p><strong>Account Name:</strong> Tandicia Association</p>
              <p><strong>IFSC:</strong> CIUB0000102</p>
              <p><strong>Account Number:</strong> 510909010308848</p>
              <p><strong>Bank:</strong> City Union Bank Ltd (CUB)</p>

            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-3 gap-4 text-center">

              <div>
                <p className="text-lg font-semibold">100%</p>
                <p className="text-xs text-gray-500">Used for care</p>
              </div>

              <div>
                <p className="text-lg font-semibold">12k+</p>
                <p className="text-xs text-gray-500">Lives impacted</p>
              </div>

              <div>
                <p className="text-lg font-semibold">Free</p>
                <p className="text-xs text-gray-500">For patients</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}