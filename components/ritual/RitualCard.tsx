import Link from "next/link";
import { Ritual } from "@/types/ritual";

type RitualCardProps = {
  ritual: Ritual;
};

export default function RitualCard({ ritual }: RitualCardProps) {
  return (
    <Link
      href={`/productos/ritual/${ritual.id}`}
      className="group block rounded-2xl bg-[#efe7db] p-6 transition-colors hover:bg-[#e6dccb]"
    >
      <article className="flex h-full flex-col justify-between gap-8">
        <div>
          <h3 className="mb-2 text-xl font-semibold">{ritual.name}</h3>
          <p className="text-sm text-[#8c8b88]">{ritual.description}</p>
        </div>

        <span className="text-sm font-medium">Ver productos →</span>
      </article>
    </Link>
  );
}