import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import RitualNav from "@/components/ritual/RitualNav";
import { getProducts } from "@/lib/products";

export default function ProductosPage() {
  const products = getProducts();

  return (
    <>
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="mb-4 text-4xl font-semibold">Productos</h1>
        <p className="mb-8 max-w-2xl text-lg text-neutral-600">
          Productos seleccionados para acompañar distintos rituales y momentos
          del día.
        </p>

        <div className="mb-10">
          <RitualNav />
        </div>

        <ProductGrid products={products} />

        <section className="mt-20 rounded-2xl border border-[#a8b39e] p-8 text-center">
          <h2 className="mb-2 text-2xl font-semibold">
            ¿No sabés qué elegir?
          </h2>
          <p className="mb-6 text-neutral-600">
            Escribinos y te orientamos según el momento del día que quieras
            acompañar.
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