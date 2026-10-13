import Link from "next/link";
import ImageSlot from "@/components/ui/ImageSlot";
import { homeImages } from "@/data/home";

const principles = [
  {
    title: "Simplicidad",
    text: "Elegir menos para disfrutar más.",
  },
  {
    title: "Rituales",
    text: "Pequeños momentos que se repiten.",
  },
  {
    title: "Claridad",
    text: "Marca, precio y disponibilidad a la vista.",
  },
];

export default function AboutSection() {
  return (
    <section className="mt-24 grid gap-10 md:grid-cols-[1fr_1.6fr] md:items-center">
      <ImageSlot
        src={homeImages.about}
        alt="Inspirada en la simplicidad japonesa"
        sizes="(min-width: 768px) 35vw, 100vw"
        className="flex aspect-[4/3] items-end rounded-xl bg-[#c9d0c0] p-6 md:aspect-[4/5]"
      />

      <div>
        <h2 className="mb-6 text-4xl font-normal md:text-5xl">
          Bienestar en las pequeñas cosas
        </h2>

        <p className="mb-4 max-w-xl text-neutral-600">
          Sendero Kaori reúne productos seleccionados para acompañar tu vida cotidiana
          con más calma, naturaleza y equilibrio. Inspirada en la simplicidad
          japonesa.
        </p>

        <Link
          href="/sobre-kaori"
          className="mb-8 inline-block text-sm font-medium hover:underline"
        >
          Conocer Sendero Kaori →
        </Link>

        <div className="grid gap-6 sm:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.title}>
              <h3 className="mb-1 text-xl font-medium">{principle.title}</h3>
              <p className="text-sm text-neutral-600">{principle.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
