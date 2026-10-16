export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  ritual: string;
  available: boolean;
  description?: string;
  image?: string;
  gallery?: string[];
  // Porcentaje de descuento (entero, 1 a 20) si el producto va en un combo.
  comboDiscount?: number;
};
