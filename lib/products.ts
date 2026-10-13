import { cacheLife } from "next/cache";
import { products as fallbackProducts } from "@/data/products";
import { site } from "@/data/site";
import { parseCatalog } from "@/lib/catalog";
import { Product } from "@/types/product";

// Lee el catálogo desde la planilla de Google Sheets (CSV publicado).
// Si la planilla no responde o tiene una estructura inválida, usa el
// respaldo local de data/products.ts para que el sitio nunca se caiga.
export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");

  const url = process.env.CATALOG_CSV_URL ?? site.catalogUrl;

  if (!url) {
    return fallbackProducts;
  }

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`La planilla respondió con estado ${response.status}.`);
    }

    const { products, skipped } = parseCatalog(await response.text());

    if (skipped.length > 0) {
      console.warn(`[catálogo] Filas omitidas: ${skipped.join(" | ")}`);
    }

    return products;
  } catch (error) {
    console.error("[catálogo] Se usa el respaldo local.", error);
    return fallbackProducts;
  }
}

export async function getProductsByRitual(ritualId: string) {
  const products = await getProducts();
  return products.filter((product) => product.ritual === ritualId);
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export async function getRelatedProducts(slug: string, limit = 4) {
  const products = await getProducts();
  const current = products.find((product) => product.slug === slug);

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
