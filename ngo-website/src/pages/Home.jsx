import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Process from "../components/Process";
import Stats from "../components/Stats";
import Gallery from "../components/Gallery";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="pt-10">
        <Hero />
      </section>

      {/* Problem */}
      <section className="bg-white">
        <Problem />
      </section>

      {/* Process */}
      <section className="bg-gray-50">
        <Process />
      </section>

      {/* Stats */}
      <section className="bg-white">
        <Stats />
      </section>

      {/* Gallery */}
      <section className="bg-gray-50">
        <Gallery />
      </section>

    </div>
  );
}