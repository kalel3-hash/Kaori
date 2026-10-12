import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <h1 className="text-2xl font-semibold tracking-widest">KAORI</h1>

        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:underline">Inicio</Link>
          <Link href="/productos" className="hover:underline">Productos</Link>
          <Link href="/sobre-kaori" className="hover:underline">Sobre Kaori</Link>
          <Link href="/contacto" className="hover:underline">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}