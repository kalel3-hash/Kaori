import { products } from "@/data/products";

export function getProducts() {
  return products;
}

export function getProductsByRitual(ritualId: string) {
  return products.filter((product) => product.ritual === ritualId);
}