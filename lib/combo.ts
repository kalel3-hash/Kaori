import { Product } from "@/types/product";

// Reglas de combos (decididas por Ignacio).
export const COMBO_MIN_ITEMS = 2;
export const COMBO_MAX_DISCOUNT = 20;

export type ComboLine = {
  product: Product;
  discount: number;
  finalPrice: number;
};

export type ComboSummary = {
  lines: ComboLine[];
  subtotal: number;
  total: number;
  saving: number;
  discountActive: boolean;
};

export function formatPrice(value: number): string {
  return `$${value.toLocaleString("es-AR")}`;
}

// El descuento de cada producto solo aplica si el combo tiene al menos
// COMBO_MIN_ITEMS productos. Cada descuento afecta solo a su producto.
export function calculateCombo(items: Product[]): ComboSummary {
  const discountActive = items.length >= COMBO_MIN_ITEMS;

  const lines = items.map((product) => {
    const discount = discountActive ? (product.comboDiscount ?? 0) : 0;
    const finalPrice = Math.round((product.price * (100 - discount)) / 100);
    return { product, discount, finalPrice };
  });

  const subtotal = items.reduce((sum, product) => sum + product.price, 0);
  const total = lines.reduce((sum, line) => sum + line.finalPrice, 0);

  return {
    lines,
    subtotal,
    total,
    saving: subtotal - total,
    discountActive,
  };
}

export function buildComboMessage(summary: ComboSummary): string {
  const rows = summary.lines.map(({ product, discount, finalPrice }) => {
    const base = `- ${product.name} (${product.brand}): `;

    if (discount > 0) {
      return `${base}${formatPrice(product.price)}, con ${discount}% off en combo ${formatPrice(finalPrice)}`;
    }

    return `${base}${formatPrice(product.price)}`;
  });

  const saving =
    summary.saving > 0 ? ` (ahorro ${formatPrice(summary.saving)})` : "";

  return [
    "Hola! Quiero armar este combo:",
    ...rows,
    `Total estimado: ${formatPrice(summary.total)}${saving}.`,
    "¿Me confirmás disponibilidad y precio final?",
  ].join("\n");
}
