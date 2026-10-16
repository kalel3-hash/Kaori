import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { site } from "@/data/site";
import { buildOpenGraph } from "@/lib/seo";

const description =
  "Consultanos sobre productos, disponibilidad, pagos o entregas.";

export const metadata: Metadata = {
  title: "Contacto",
  description,
  openGraph: buildOpenGraph({ title: "Contacto", description }),
};

const topics = [
  {
    title: "Pagos",
    text: "Transferencia, Mercado Pago o efectivo.",
  },
  {
    title: "Entregas",
    text: `Entrega personal o mensajería en ${site.location}. El costo depende de la zona.`,
  },
  {
    title: "Disponibilidad",
    text: "Si un producto figura como agotado, podés consultar cuándo vuelve a estar disponible.",
  },
];

export default function ContactoPage() {
  const whatsappHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
        "Hola! Quiero hacer una consulta."
      )}`
    : null;

  return (
    <>
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <section className="max-w-3xl">
          <h1 className="mb-6 text-5xl font-normal leading-tight">
            Contacto
          </h1>

          <p className="mb-10 text-base text-neutral-600">
            Consultanos sobre productos, disponibilidad, pagos o entregas.
          </p>

          {whatsappHref ? (
            <Link
              href={whatsappHref}
              className="press inline-block rounded-md bg-olive px-6 py-3 text-sm font-medium text-white"
            >
              Escribinos por WhatsApp
            </Link>
          ) : (
            <div className="rounded-xl bg-[#efe7db] p-6">
              <p className="font-medium">
                Estamos preparando nuestro canal de consultas
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                Muy pronto vas a poder escribirnos por WhatsApp desde esta
                página.
              </p>
            </div>
          )}
        </section>

        <section className="mt-24">
          <h2 className="mb-8 text-4xl font-normal">Información útil</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="rounded-xl bg-[#efe7db] p-6"
              >
                <h3 className="mb-3 text-2xl font-normal">{topic.title}</h3>
                <p className="text-sm text-neutral-600">{topic.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 max-w-3xl">
          <h2 className="mb-6 text-4xl font-normal">
            ¿Todavía no sabés qué elegir?
          </h2>

          <Link
            href="/productos"
            className="press inline-block rounded-md border border-olive px-6 py-3 text-sm font-medium"
          >
            Ver productos
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
