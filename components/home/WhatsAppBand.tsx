import Link from "next/link";
import { site } from "@/data/site";

export default function WhatsAppBand() {
  const href = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
        "Hola! Quiero hacer una consulta."
      )}`
    : "/contacto";

  return (
    <section className="mt-24 bg-olive text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-6 py-12">
        <div>
          <h2 className="mb-3 text-3xl font-normal md:text-4xl">
            ¿No sabés por dónde empezar?
          </h2>
          <p className="text-sm text-white/80">
            Te ayudamos a encontrar productos y rituales acordes a tu rutina.
          </p>
        </div>

        <Link
          href={href}
          className="rounded-md bg-white px-7 py-3.5 text-sm font-medium text-olive hover:bg-white/90"
        >
          Hablar por WhatsApp
        </Link>
      </div>
    </section>
  );
}
