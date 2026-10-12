import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl bg-[#efe7db] p-10 text-center">
        <p className="text-lg font-semibold">
          Estamos preparando nuestra primera selección
        </p>
        <p className="mt-2 text-sm text-[#8c8b88]">
          Muy pronto vas a encontrar acá los productos de cada ritual.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}