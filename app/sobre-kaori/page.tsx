import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Sobre Kaori",
  description:
    "Kaori es una marca de bienestar natural que reúne productos seleccionados para acompañar pequeños rituales cotidianos.",
};

const principles = [
  {
    title: "Simplicidad",
    text: "Una propuesta clara y ordenada, sin exceso de información ni vueltas para encontrar lo que buscás.",
  },
  {
    title: "Rituales",
    text: "Organizamos los productos en cuatro momentos del día: Mañana, Pausa, Bienestar y Descanso.",
  },
  {
    title: "Claridad",
    text: "Cada producto muestra su marca, su precio y su disponibilidad. Sabés qué elegís y cuánto cuesta.",
  },
];

export default function SobreKaoriPage() {
  const contactHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp}`
    : "/contacto";
  const contactLabel = site.whatsapp ? "Consultar por WhatsApp" : "Escribinos";

  return (
    <>
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <section className="max-w-3xl">
          <h1 className="mb-6 text-5xl font-normal leading-tight">
            Sobre Kaori
          </h1>

          <p className="mb-4 text-base text-neutral-600">
            Kaori es una marca de bienestar natural que reúne productos
            seleccionados para acompañar pequeños rituales cotidianos.
          </p>

          <p className="text-base text-neutral-600">
            Creemos en los momentos simples y repetibles: una pausa a media
            tarde, un comienzo de día más tranquilo, un cierre sin apuro.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="mb-8 text-4xl font-normal">Lo que nos guía</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-xl bg-[#efe7db] p-6"
              >
                <h3 className="mb-3 text-2xl font-normal">
                  {principle.title}
                </h3>
                <p className="text-sm text-neutral-600">{principle.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 max-w-3xl">
          <h2 className="mb-4 text-4xl font-normal">Marcas y productos</h2>

          <p className="mb-4 text-neutral-600">
            Kaori es una marca independiente. Cada producto indica con claridad
            a qué marca pertenece, para que siempre sepas qué estás eligiendo.
          </p>

          <p className="text-neutral-600">
            Por ahora trabajamos en {site.location}. Los medios de pago y las
            entregas se coordinan por consulta.
          </p>
        </section>

        <section className="mt-24 max-w-3xl">
          <h2 className="mb-6 text-4xl font-normal">
            ¿Querés conocer la selección?
          </h2>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/productos"
              className="rounded-md bg-olive px-6 py-3 text-sm font-medium text-white"
            >
              Ver productos
            </Link>

            <Link
              href={contactHref}
              className="rounded-md border border-olive px-6 py-3 text-sm font-medium"
            >
              {contactLabel}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
