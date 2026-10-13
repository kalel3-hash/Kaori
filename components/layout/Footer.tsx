import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/config/navigation";

type FooterProps = {
  flush?: boolean;
};

export default function Footer({ flush = false }: FooterProps) {
  return (
    <footer
      className={`${flush ? "" : "mt-24"} border-t border-neutral-200 bg-[#f7f4ee]`}
    >
      <div className="mx-auto max-w-5xl px-6 pt-14">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo.png"
              alt="Sendero Kaori"
              width={871}
              height={402}
              className="mb-3 h-24 w-auto -ml-2"
            />
            <p className="max-w-xs text-sm text-[#8c8b88]">
              Pequeños rituales para una vida más equilibrada.
            </p>
          </div>

          <nav aria-label="Explorar">
            <p className="mb-4 text-sm font-medium">Explorar</p>
            <ul className="space-y-2 text-sm text-neutral-600">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Ayuda">
            <p className="mb-4 text-sm font-medium">Ayuda</p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="/contacto" className="hover:underline">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:underline">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:underline">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 py-6 text-xs text-[#8c8b88]">
          <p>© Sendero Kaori. Todos los derechos reservados.</p>

          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:underline">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="hover:underline">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
