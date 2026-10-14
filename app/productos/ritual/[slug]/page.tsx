import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import ProductGrid from "@/components/product/ProductGrid";
import RitualNav from "@/components/ritual/RitualNav";
import { homeImages } from "@/data/home";
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

  const products = await getProductsByRitual(ritual.id);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#8c8b88]">
              Ritual
            </p>
            <h1 className="mb-4 text-5xl font-normal">{ritual.name}</h1>
            <p className="max-w-md text-base text-neutral-600">
              {ritual.description}
            </p>
          </div>

          <ImageSlot
            src={homeImages.rituals[ritual.id]}
            alt={`Ritual de ${ritual.name}`}
            sizes="(min-width: 768px) 480px, 90vw"
            priority
            className="aspect-[4/3] rounded-xl bg-[#e2d8c6]"
          />
        </div>

        <div className="mb-10">
          <RitualNav activeId={ritual.id} />
        </div>

        <ProductGrid products={products} />

        <section className="mt-20 rounded-xl bg-[#efe7db] p-10 text-center">
          <h2 className="mb-3 text-3xl font-normal">¿No sabés qué elegir?</h2>
          <p className="mx-auto mb-8 max-w-xl text-sm text-neutral-600">
            Escribinos y te orientamos.
          </p>
          <Link
            href="/contacto"
            className="inline-block rounded-md bg-olive px-6 py-3 text-sm font-medium text-white"
          >
            Consultar
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
