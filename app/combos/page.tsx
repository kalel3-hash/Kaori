import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ComboBuilder from "@/components/combo/ComboBuilder";
import { site } from "@/data/site";
import { COMBO_MIN_ITEMS } from "@/lib/combo";
import { getProducts } from "@/lib/products";
import { buildOpenGraph } from "@/lib/seo";

const description =
  "Elegí dos o más productos y mirá cuánto ahorrás al llevarlos juntos.";

export const metadata: Metadata = {
  title: "Armá tu combo",
  description,
  openGraph: buildOpenGraph({ title: "Armá tu combo", description }),
};

export default async function CombosPage() {
  const products = await getProducts();
  const available = products.filter((product) => product.available);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="mb-4 text-5xl font-normal">Armá tu combo</h1>
        <p className="mb-12 max-w-2xl text-base text-neutral-600">
          Elegí {COMBO_MIN_ITEMS} o más productos. Los que tienen la leyenda
          “off en combo” bajan su precio cuando los llevás juntos; el descuento
          aplica solo a ese producto.
        </p>

        {available.length < COMBO_MIN_ITEMS ? (
          <div className="rounded-xl bg-[#efe7db] p-10 text-center">
            <p className="font-serif text-2xl">
              Estamos preparando esta selección
            </p>
            <p className="mt-2 text-sm text-[#8c8b88]">
              Muy pronto vas a poder armar tu combo.
            </p>
          </div>
        ) : (
          <ComboBuilder products={products} whatsapp={site.whatsapp} />
        )}
      </main>

      <Footer />
    </>
  );
}
