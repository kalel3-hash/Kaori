import { rituals } from "@/data/rituals";
import { Product } from "@/types/product";

export type CatalogResult = {
  products: Product[];
  skipped: string[];
};

const REQUIRED_HEADERS = [
  "slug",
  "nombre",
  "marca",
  "precio",
  "ritual",
  "disponible",
  "publicado",
];

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_EXTRA_IMAGES = 5;
const IMAGE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*\.(png|jpe?g|webp|avif)$/i;

export function parseCsv(text: string): string[][] {
  const input = text.replace(/^\uFEFF/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && input[i + 1] === "\n") {
        i++;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function parseYesNo(value: string): boolean | null {
  const normalized = normalize(value);

  if (normalized === "si") {
    return true;
  }

  if (normalized === "no") {
    return false;
  }

  return null;
}

function parsePrice(value: string): number | null {
  const cleaned = value.replace(/[$\s]/g, "");

  if (/^\d+$/.test(cleaned)) {
    const price = Number(cleaned);
    return price > 0 ? price : null;
  }

  if (/^\d{1,3}([.,]\d{3})+$/.test(cleaned)) {
    const price = Number(cleaned.replace(/[.,]/g, ""));
    return price > 0 ? price : null;
  }

  return null;
}

// Convierte el CSV de la planilla en productos. Una fila con datos inválidos
// se omite (y queda registrada en `skipped`) en lugar de romper el sitio.
// Si faltan columnas obligatorias, lanza un error para usar el respaldo.
export function parseCatalog(text: string): CatalogResult {
  const rows = parseCsv(text).filter((row) =>
    row.some((cell) => cell.trim() !== "")
  );

  if (rows.length === 0) {
    throw new Error("La planilla está vacía.");
  }

  const headers = rows[0].map((header) => normalize(header));
  const missing = REQUIRED_HEADERS.filter(
    (header) => !headers.includes(header)
  );

  if (missing.length > 0) {
    throw new Error(`Faltan columnas en la planilla: ${missing.join(", ")}.`);
  }

  const column = (row: string[], name: string) =>
    (row[headers.indexOf(name)] ?? "").trim();

  const ritualIds = rituals.map((ritual) => ritual.id);
  const products: Product[] = [];
  const skipped: string[] = [];
  const seen = new Set<string>();

  rows.slice(1).forEach((row, index) => {
    const line = index + 2;
    const slug = column(row, "slug");
    const label = slug ? `fila ${line} (${slug})` : `fila ${line}`;

    const published = parseYesNo(column(row, "publicado"));

    if (published === false) {
      return;
    }

    if (published === null) {
      skipped.push(`${label}: "publicado" debe ser SI o NO.`);
      return;
    }

    if (!SLUG_PATTERN.test(slug)) {
      skipped.push(`${label}: slug inválido.`);
      return;
    }

    if (seen.has(slug)) {
      skipped.push(`${label}: slug repetido.`);
      return;
    }

    const name = column(row, "nombre");
    const brand = column(row, "marca");

    if (!name || !brand) {
      skipped.push(`${label}: falta nombre o marca.`);
      return;
    }

    const price = parsePrice(column(row, "precio"));

    if (price === null) {
      skipped.push(`${label}: precio inválido.`);
      return;
    }

    const ritual = normalize(column(row, "ritual"));

    if (!ritualIds.includes(ritual)) {
      skipped.push(`${label}: ritual inválido.`);
      return;
    }

    const available = parseYesNo(column(row, "disponible"));

    if (available === null) {
      skipped.push(`${label}: "disponible" debe ser SI o NO.`);
      return;
    }

    const description = column(row, "descripcion");
    const imageName = column(row, "imagen");

    if (imageName && !IMAGE_PATTERN.test(imageName)) {
      skipped.push(`${label}: nombre de imagen inválido.`);
      return;
    }

    const extraNames = Array.from(
      new Set(
        column(row, "imagenes_extra")
          .split(/[\s;,]+/)
          .filter(Boolean)
      )
    ).slice(0, MAX_EXTRA_IMAGES);

    if (extraNames.some((name) => !IMAGE_PATTERN.test(name))) {
      skipped.push(`${label}: nombre inválido en "imagenes_extra".`);
      return;
    }

    seen.add(slug);
    products.push({
      id: slug,
      slug,
      name,
      brand,
      price,
      ritual,
      available,
      description: description || undefined,
      image: imageName ? `/images/products/${imageName}` : undefined,
      gallery:
        extraNames.length > 0
          ? extraNames.map((name) => `/images/products/${name}`)
          : undefined,
    });
  });

  return { products, skipped };
}
