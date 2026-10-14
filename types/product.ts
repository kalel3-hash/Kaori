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
};
