import Link from "next/link";
import ImageSlot from "@/components/ui/ImageSlot";
import { homeImages } from "@/data/home";

export default function HomeHero() {
  return (
    <section className="relative bg-[#efe7db]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-28">
        <div className="md:w-[46%]">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#8c8b88]">
            Bienestar natural
          </p>

          <h1 className="mb-6 text-5xl font-normal leading-[1.05] md:text-6xl">
            Pequeños rituales para una vida más equilibrada.
          </h1>

          <p className="mb-10 max-w-md text-neutral-600">
            Descubrí productos seleccionados, inspirados en la simplicidad,
            para acompañar tu bienestar cotidiano.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#rituales"
              className="rounded-md bg-olive px-6 py-3 text-sm font-medium text-white"
            >
              Explorar rituales →
            </Link>

            <Link
              href="/productos"
              className="rounded-md border border-[#8c8b88] px-6 py-3 text-sm font-medium"
            >
              Ver productos
            </Link>
          </div>

          <p className="mt-12 text-xs uppercase tracking-[0.25em] text-[#8c8b88]">
            Naturaleza · Calma · Confianza
          </p>
        </div>
      </div>

      <ImageSlot
        src={homeImages.hero}
        alt="Sendero Kaori: pequeños rituales cotidianos"
        sizes="(min-width: 768px) 50vw, 100vw"
        priority
        className="aspect-[4/3] md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-1/2"
      />
    </section>
  );
}
