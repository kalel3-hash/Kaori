import { products } from "@/data/products";

export function getProducts() {
  return products;
}

export function getProductsByRitual(ritualId: string) {
  return products.filter((product) => product.ritual === ritualId);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 4) {
  const current = getProductBySlug(slug);

  if (!current) {
    return [];
  }

  return products
    .filter(
      (product) =>
        product.ritual === current.ritual && product.slug !== current.slug
    )
    .slice(0, limit);
}
