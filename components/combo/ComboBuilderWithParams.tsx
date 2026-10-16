"use client";

import { useSearchParams } from "next/navigation";
import ComboBuilder from "@/components/combo/ComboBuilder";
import { Product } from "@/types/product";

type ComboBuilderWithParamsProps = {
  products: Product[];
  whatsapp: string;
};

// Lee ?agregar=slug de la dirección y arranca el combo con ese producto.
export default function ComboBuilderWithParams({
  products,
  whatsapp,
}: ComboBuilderWithParamsProps) {
  const searchParams = useSearchParams();

  return (
    <ComboBuilder
      products={products}
      whatsapp={whatsapp}
      initialSlug={searchParams.get("agregar")}
    />
  );
}
