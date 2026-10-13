import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import { rituals } from "@/data/rituals";
import { site } from "@/data/site";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();

  if (products.length === 0) {
    return [{ slug: "__placeholder__" }];
  }

  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Producto" };
  }

  return {
    title: `${product.name} | ${product.brand}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const ritual = rituals.find((item) => item.id === product.ritual);
  const related = await getRelatedProducts(product.slug);

  const message = product.available
    ? `Hola! Quiero consultar por ${product.name} (${product.brand}).`
    : `Hola! Quiero consultar cuándo vuelve a estar disponible ${product.name} (${product.brand}).`;

  const contactHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
    : "/contacto";

  const buttonLabel = product.available
    ? "Consultar por WhatsApp"
    : "Consultar próxima disponibilidad";

  return (
    <>
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 768px) 440px, 90vw"
                className="object-contain"
              />
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-2 text-xs uppercase tracking-widest text-[#8c8b88]">
              {product.brand}
            </p>

            <h1 className="mb-4 text-5xl font-normal leading-tight">
              {product.name}
            </h1>

            {ritual && (
              <p className="mb-6 text-sm text-neutral-600">
                Ritual:{" "}
                <Link
                  href={`/productos/ritual/${ritual.id}`}
                  className="underline"
                >
                  {ritual.name}
                </Link>
              </p>
            )}

            <p className="mb-2 text-2xl font-medium">
              {`$${product.price.toLocaleString("es-AR")}`}
            </p>

            {!product.available && (
              <p className="mb-6 text-sm text-[#8c8b88]">
                Agotado temporalmente
              </p>
            )}

            {product.description && (
              <p className="mb-8 mt-4 whitespace-pre-line text-base text-neutral-600">
                {product.description}
              </p>
            )}

            <div className="mt-4">
              <Link
                href={contactHref}
                className="inline-block rounded-md bg-olive px-6 py-3 text-sm font-medium text-white"
              >
                {buttonLabel}
              </Link>
            </div>

            <div className="mt-10 rounded-xl bg-[#efe7db] p-6 text-sm text-neutral-600">
              <p className="mb-2">
                <span className="font-medium text-[#2d2d2d]">Pagos: </span>
                transferencia, Mercado Pago o efectivo.
              </p>
              <p>
                <span className="font-medium text-[#2d2d2d]">Entregas: </span>
                en {site.location}. El costo depende de la zona.
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="mb-8 text-4xl font-normal">
              Más para este ritual
            </h2>
            <ProductGrid products={related} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
