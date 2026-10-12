import Link from "next/link";
import { navigation } from "@/config/navigation";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200 bg-[#efe7db]">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="mb-3 text-2xl font-semibold tracking-widest">KAORI</p>
          <p className="max-w-xs text-sm text-[#8c8b88]">
            Pequeños rituales para una vida más equilibrada.
          </p>
        </div>

        <nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest">
            Navegación
          </p>
          <ul className="space-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest">
            Ayuda
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contacto" className="hover:underline">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}