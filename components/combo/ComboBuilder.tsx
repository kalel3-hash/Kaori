"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  buildComboMessage,
  calculateCombo,
  COMBO_MIN_ITEMS,
  formatPrice,
} from "@/lib/combo";
import { Product } from "@/types/product";

type ComboBuilderProps = {
  products: Product[];
  whatsapp: string;
};

export default function ComboBuilder({
  products,
  whatsapp,
}: ComboBuilderProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const items = selected
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));

  const summary = calculateCombo(items);
  const ready = items.length >= COMBO_MIN_ITEMS;

  function toggle(slug: string) {
    setSelected((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug]
    );
  }

  const message = buildComboMessage(summary);
  const contactHref = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
    : "/contacto";

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
        <section aria-labelledby="combo-lista">
          <h2 id="combo-lista" className="mb-6 text-3xl font-normal">
            Elegí tus productos
          </h2>

          <ul className="grid gap-2">
            {products.map((product) => {
              const isSelected = selected.includes(product.slug);
              const hasDiscount =
                product.available && (product.comboDiscount ?? 0) > 0;

              return (
                <li key={product.slug}>
                  <label
                    className={`press-card flex items-center gap-3 rounded-lg border-2 px-3 py-2 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-olive ${
                      isSelected
                        ? "border-olive bg-[#efe7db]"
                        : "border-transparent bg-[#efe7db]"
                    } ${
                      product.available
                        ? "cursor-pointer hover:bg-[#e6dccb]"
                        : "cursor-not-allowed opacity-60"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={!product.available}
                      onChange={() => toggle(product.slug)}
                      className="h-5 w-5 shrink-0 cursor-pointer accent-olive disabled:cursor-not-allowed"
                    />

                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white">
                      {product.image && (
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-lg leading-tight">
                        {product.name}
                      </span>
                      <span className="block text-sm">
                        <span className="text-[#8c8b88]">
                          {`${product.brand} · `}
                        </span>
                        <span className="font-medium">
                          {formatPrice(product.price)}
                        </span>
                        {hasDiscount && (
                          <span className="ml-2 text-olive">
                            {`${product.comboDiscount}% off en combo`}
                          </span>
                        )}
                        {!product.available && (
                          <span className="ml-2 text-[#8c8b88]">
                            Agotado temporalmente
                          </span>
                        )}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <aside
          id="tu-combo"
          aria-labelledby="combo-titulo"
          className="rounded-xl bg-[#efe7db] p-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto"
        >
          <h2 id="combo-titulo" className="mb-4 text-3xl font-normal">
            Tu combo
          </h2>

          {items.length === 0 ? (
            <p className="text-sm text-neutral-600">
              Todavía no agregaste productos. Elegí al menos{" "}
              {COMBO_MIN_ITEMS} para que se apliquen los descuentos.
            </p>
          ) : (
            <>
              <ul className="divide-y divide-neutral-300">
                {summary.lines.map(({ product, discount, finalPrice }) => (
                  <li
                    key={product.slug}
                    className="fade-in flex items-start justify-between gap-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{product.name}</p>
                      <button
                        type="button"
                        onClick={() => toggle(product.slug)}
                        aria-label={`Quitar ${product.name} del combo`}
                        className="press mt-1 text-xs text-[#8c8b88] underline"
                      >
                        Quitar
                      </button>
                    </div>

                    <div className="shrink-0 text-right text-sm">
                      <p className="font-medium">{formatPrice(finalPrice)}</p>
                      {discount > 0 && (
                        <p className="text-xs text-[#8c8b88]">
                          <span className="sr-only">Antes: </span>
                          <s>{formatPrice(product.price)}</s>
                          {` · ${discount}% off`}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div
                aria-live="polite"
                className="mt-4 space-y-1 border-t border-neutral-300 pt-4 text-sm"
              >
                {summary.saving > 0 && (
                  <>
                    <p className="flex justify-between text-neutral-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(summary.subtotal)}</span>
                    </p>
                    <p className="flex justify-between text-olive">
                      <span>Ahorro</span>
                      <span>{`-${formatPrice(summary.saving)}`}</span>
                    </p>
                  </>
                )}
                <p className="flex justify-between text-lg font-medium">
                  <span>Total estimado</span>
                  <span>{formatPrice(summary.total)}</span>
                </p>
              </div>

              {!ready && (
                <p className="mt-4 text-sm text-neutral-600">
                  Sumá al menos un producto más para armar el combo y activar
                  los descuentos.
                </p>
              )}
            </>
          )}

          <div className="mt-6">
            {ready ? (
              <Link
                href={contactHref}
                className="press block rounded-md bg-olive px-6 py-3 text-center text-sm font-medium text-white"
              >
                Pedir este combo por WhatsApp
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="block w-full rounded-md bg-olive px-6 py-3 text-center text-sm font-medium text-white opacity-40"
              >
                Pedir este combo por WhatsApp
              </button>
            )}

            {items.length > 0 && (
              <button
                type="button"
                onClick={() => setSelected([])}
                className="press mt-3 w-full text-center text-xs text-[#8c8b88] underline"
              >
                Vaciar combo
              </button>
            )}
          </div>

          <p className="mt-4 text-xs text-[#8c8b88]">
            El total es una estimación. El precio final y la disponibilidad se
            confirman por WhatsApp.
          </p>
        </aside>
      </div>

      {items.length > 0 && (
        <div
          className="sticky bottom-0 -mx-6 mt-6 flex items-center justify-between gap-4 border-t border-neutral-200 bg-[#f7f4ee] px-6 pt-3 lg:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <p className="text-sm">
            <span className="text-[#8c8b88]">
              {items.length === 1 ? "1 producto" : `${items.length} productos`}
            </span>
            <span className="ml-2 font-medium">
              {formatPrice(summary.total)}
            </span>
          </p>

          <a
            href="#tu-combo"
            className="press rounded-md bg-olive px-5 py-2.5 text-sm font-medium text-white"
          >
            Ver combo
          </a>
        </div>
      )}
    </div>
  );
}
