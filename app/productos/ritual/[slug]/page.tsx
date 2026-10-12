import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import RitualNav from "@/components/ritual/RitualNav";
import { rituals } from "@/data/rituals";
import { getProductsByRitual } from "@/lib/products";

type RitualPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return rituals.map((ritual) => ({ slug: ritual.id }));
}

export default async function RitualPage({ params }: RitualPageProps) {
  const { slug } = await params;
  const ritual = rituals.find((item) => item.id === slug);

  if (!ritual) {
    notFound();
  }

  const products = getProductsByRitual(ritual.id);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
          Ritual
        </p>
        <h1 className="mb-4 text-4xl font-semibold">{ritual.name}</h1>
        <p className="mb-8 max-w-2xl text-lg text-neutral-600">
          {ritual.description}
        </p>

        <div className="mb-10">
          <RitualNav activeId={ritual.id} />
        </div>

        <ProductGrid products={products} />

        <section className="mt-20 rounded-2xl border border-[#a8b39e] p-8 text-center">
          <h2 className="mb-2 text-2xl font-semibold">
            ¿No sabés qué elegir?
          </h2>
          <p className="mb-6 text-neutral-600">
            Escribinos y te orientamos.
          </p>
          <Link
            href="/contacto"
            className="inline-block rounded-full bg-[#a8b39e] px-6 py-3 text-sm font-medium text-[#2d2d2d]"
          >
            Consultar
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}