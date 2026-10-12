import Link from "next/link";
import ImageSlot from "@/components/ui/ImageSlot";
import { homeImages } from "@/data/home";
import { Ritual } from "@/types/ritual";

type RitualCardProps = {
  ritual: Ritual;
};

export default function RitualCard({ ritual }: RitualCardProps) {
  return (
    <Link
      href={`/productos/ritual/${ritual.id}`}
      className="group block overflow-hidden rounded-xl bg-[#efe7db] transition-colors hover:bg-[#e6dccb]"
    >
      <article>
        <ImageSlot
          src={homeImages.rituals[ritual.id]}
          alt={`Ritual de ${ritual.name}`}
          sizes="(min-width: 1024px) 250px, (min-width: 640px) 45vw, 90vw"
          className="aspect-[4/3] bg-[#e2d8c6]"
        />

        <div className="p-5">
          <h3 className="mb-1 text-2xl font-medium">
            Ritual de {ritual.name}
          </h3>
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm text-[#8c8b88]">{ritual.description}</p>
            <span aria-hidden="true" className="text-lg">
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
