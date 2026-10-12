import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RitualsSection from "@/components/home/RitualsSection";

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <section className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Bienestar natural
          </p>

          <h1 className="mb-6 text-5xl font-semibold leading-tight">
            Pequeños rituales para una vida más equilibrada.
          </h1>

          <p className="mb-10 text-lg text-neutral-600">
            Productos seleccionados para acompañar distintos momentos de tu
            rutina cotidiana.
          </p>

          <div className="flex gap-4">
            <Link
              href="/productos"
              className="rounded-full bg-[#a8b39e] px-6 py-3 text-sm font-medium text-[#2d2d2d]"
            >
              Ver productos
            </Link>

            <Link
              href="/sobre-kaori"
              className="rounded-full border border-[#a8b39e] px-6 py-3 text-sm font-medium"
            >
              Conocer Kaori
            </Link>
          </div>
        </section>

        <RitualsSection />
      </main>

      <Footer />
    </>
  );
}