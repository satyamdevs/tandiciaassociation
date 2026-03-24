export default function Stats() {
  return (
    <section className="bg-black text-white px-8 py-20 flex flex-col md:flex-row justify-between max-w-6xl mx-auto">

      <h2 className="text-4xl md:text-5xl font-serif mb-10">
        Support that helps people see clearly
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-5xl">78%</h3>
          <p>Vision improvement</p>
        </div>

        <div>
          <h3 className="text-5xl">12000</h3>
          <p>People screened</p>
        </div>
      </div>

    </section>
  );
}