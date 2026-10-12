import RitualCard from "@/components/ritual/RitualCard";
import { rituals } from "@/data/rituals";

export default function RitualsSection() {
  return (
    <section id="rituales" className="mt-24 scroll-mt-8">
      <div className="mb-10 grid gap-4 md:grid-cols-2 md:items-end">
        <h2 className="text-4xl font-normal md:text-5xl">
          Un ritual para cada momento
        </h2>
        <p className="text-sm text-neutral-600">
          Cada día tiene ritmos distintos. Por eso organizamos nuestros
          productos en cuatro momentos: Mañana, Pausa, Bienestar y Descanso.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rituals.map((ritual) => (
          <RitualCard key={ritual.id} ritual={ritual} />
        ))}
      </div>
    </section>
  );
}
