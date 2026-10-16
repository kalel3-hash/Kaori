"use client";

import { useState } from "react";
import Link from "next/link";
import { navigation } from "@/config/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="menu-movil"
        onClick={() => setOpen((value) => !value)}
        className="press flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M3 3l12 12M15 3L3 15" />
          ) : (
            <path d="M2 5h14M2 9h14M2 13h14" />
          )}
        </svg>
      </button>

      {open && (
        <nav
          id="menu-movil"
          aria-label="Menú móvil"
          className="menu-enter absolute left-0 right-0 top-full z-50 border-b border-neutral-200 bg-[#f7f4ee] px-6 pb-6 pt-2"
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-neutral-200">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-base"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/productos"
            onClick={() => setOpen(false)}
            className="press mt-6 block rounded-md bg-olive px-5 py-3 text-center text-sm font-medium text-white"
          >
            Ver productos
          </Link>
        </nav>
      )}
    </div>
  );
}
