export default function Gallery() {
  return (
    <section className="px-8 py-20 max-w-6xl mx-auto">

      <h2 className="text-4xl font-serif mb-6">
        A glimpse into our eye care camps
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <img src="/img1.jpg" className="rounded-lg" />
        <img src="/img2.jpg" className="rounded-lg" />
        <img src="/img3.jpg" className="rounded-lg" />
        <img src="/img4.jpg" className="rounded-lg" />
      </div>

    </section>
  );
}