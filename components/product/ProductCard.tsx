import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article>
      <h3>{product.name}</h3>

      <p>{product.brand}</p>

      <p>${product.price}</p>
    </article>
  );
}