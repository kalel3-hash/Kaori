import RitualCard from "@/components/ritual/RitualCard";
import { rituals } from "@/data/rituals";

export default function RitualsSection() {
  return (
    <section className="mt-24">
      <h2 className="mb-2 text-3xl font-semibold">Elegí tu ritual</h2>
      <p className="mb-8 text-neutral-600">
        Cuatro momentos del día, cuatro formas de empezar.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rituals.map((ritual) => (
          <RitualCard key={ritual.id} ritual={ritual} />
        ))}
      </div>
    </section>
  );
}
