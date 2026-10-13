import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group block rounded-xl bg-[#efe7db] p-6 transition-colors hover:bg-[#e6dccb]"
    >
      <article className="flex h-full flex-col gap-6">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f7f4ee]">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between gap-6">
          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-[#8c8b88]">
              {product.brand}
            </p>
            <h3 className="text-2xl font-normal">{product.name}</h3>
          </div>

          <div className="text-sm">
            <p className="font-medium">
              {`$${product.price.toLocaleString("es-AR")}`}
            </p>
            {!product.available && (
              <p className="mt-1 text-[#8c8b88]">Agotado temporalmente</p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
