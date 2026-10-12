import { Ritual } from "@/types/ritual";

type RitualCardProps = {
  ritual: Ritual;
};

export default function RitualCard({
  ritual,
}: RitualCardProps) {
  return (
    <article>
      <h3>{ritual.name}</h3>

      <p>{ritual.description}</p>
    </article>
  );
}