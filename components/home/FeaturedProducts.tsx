import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import { getProducts } from "@/lib/products";

export default async function FeaturedProducts() {
  const products = (await getProducts()).slice(0, 6);

  return (
    <section className="mt-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-4xl font-normal md:text-5xl">
          Selecciones para tu bienestar cotidiano
        </h2>

        <Link href="/productos" className="text-sm font-medium hover:underline">
          Ver todos los productos →
        </Link>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
