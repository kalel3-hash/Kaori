import type { Metadata } from "next";
import { site } from "@/data/site";

// Imagen que se muestra al compartir un link que no tiene foto propia.
export const DEFAULT_OG_IMAGE = "/images/hero.jpg";

type OpenGraphInput = {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
};

// Next reemplaza el bloque openGraph completo (no lo combina con el del
// layout), por eso cada página que lo define pasa por acá y conserva el
// nombre del sitio, el idioma y una imagen.
export function buildOpenGraph({
  title,
  description,
  image,
  imageAlt,
}: OpenGraphInput): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: site.name,
    locale: "es_AR",
    title,
    description,
    images: [{ url: image ?? DEFAULT_OG_IMAGE, alt: imageAlt ?? site.name }],
  };
}
