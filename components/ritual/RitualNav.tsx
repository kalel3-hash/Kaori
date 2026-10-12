import Link from "next/link";
import { rituals } from "@/data/rituals";

type RitualNavProps = {
  activeId?: string;
};

const base = "rounded-full border px-4 py-2 text-sm";
const active = "border-[#a8b39e] bg-[#a8b39e]";
const inactive = "border-neutral-300 hover:border-[#a8b39e]";

export default function RitualNav({ activeId }: RitualNavProps) {
  return (
    <nav aria-label="Filtrar por ritual" className="flex flex-wrap gap-3">
      <Link
        href="/productos"
        className={`${base} ${activeId ? inactive : active}`}
      >
        Todos
      </Link>

      {rituals.map((ritual) => (
        <Link
          key={ritual.id}
          href={`/productos/ritual/${ritual.id}`}
          className={`${base} ${activeId === ritual.id ? active : inactive}`}
        >
          {ritual.name}
        </Link>
      ))}
    </nav>
  );
}