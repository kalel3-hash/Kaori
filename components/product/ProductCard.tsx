import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group enter press-card block rounded-xl bg-[#efe7db] p-6 hover:bg-[#e6dccb]"
      style={{ "--i": Math.min(index, 5) } as React.CSSProperties}
    >
      <article className="flex h-full flex-col gap-6">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
              className="object-contain"
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
            {product.available && (product.comboDiscount ?? 0) > 0 && (
              <p className="mt-1 text-olive">
                {`${product.comboDiscount}% off en combo`}
              </p>
            )}
            {!product.available && (
              <p className="mt-1 text-[#8c8b88]">Agotado temporalmente</p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
