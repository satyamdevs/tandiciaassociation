import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Process from "../components/Process";
import Stats from "../components/Stats";
import FeaturedStories from "../components/FeaturedStories";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />

      <main>
        <section className="pt-6">
          <Hero />
        </section>

        <section className="pt-8">
          <Problem />
        </section>

        <section className="pt-12 bg-gray-50">
          <Process />
        </section>

        <section className="bg-gray-900">
          <Stats />
        </section>

        <section className="pt-12">
          <FeaturedStories />
        </section>
      </main>
      <Footer />
    </div>
  );
}