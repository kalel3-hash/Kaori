import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/config/navigation";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Header() {
  return (
    <header className="relative border-b border-neutral-200 bg-[#f7f4ee]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-x-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-symbol.png"
              alt=""
              width={593}
              height={257}
              priority
              className="h-11 w-auto"
            />
            <span className="font-serif text-2xl font-normal tracking-wide">
              Sendero Kaori
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex gap-6 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Link
          href="/productos"
          className="press hidden rounded-md bg-olive px-5 py-2.5 text-sm font-medium text-white md:inline-block"
        >
          Ver productos
        </Link>

        <MobileMenu />
      </div>
    </header>
  );
}
