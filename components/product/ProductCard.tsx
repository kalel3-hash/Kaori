import Link from "next/link";
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/productos/${product.id}`}
      className="group block rounded-2xl bg-[#efe7db] p-6 transition-colors hover:bg-[#e6dccb]"
    >
      <article className="flex h-full flex-col justify-between gap-6">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-[#8c8b88]">
            {product.brand}
          </p>
          <h3 className="text-lg font-semibold">{product.name}</h3>
        </div>

        <div className="text-sm">
          <p className="font-medium">
            {`$${product.price.toLocaleString("es-AR")}`}
          </p>
          {!product.available && (
            <p className="mt-1 text-[#8c8b88]">Agotado temporalmente</p>
          )}
        </div>
      </article>
    </Link>
  );
}