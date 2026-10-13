import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import RitualNav from "@/components/ritual/RitualNav";
import { getProducts } from "@/lib/products";

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <>
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="mb-4 text-5xl font-normal">Productos</h1>
        <p className="mb-8 max-w-2xl text-base text-neutral-600">
          Productos seleccionados para acompañar distintos rituales y momentos
          del día.
        </p>

        <div className="mb-10">
          <RitualNav />
        </div>

        <ProductGrid products={products} />

        <section className="mt-20 rounded-xl bg-[#efe7db] p-10 text-center">
          <h2 className="mb-3 text-3xl font-normal">¿No sabés qué elegir?</h2>
          <p className="mx-auto mb-8 max-w-xl text-sm text-neutral-600">
            Escribinos y te orientamos según el momento del día que quieras
            acompañar.
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
