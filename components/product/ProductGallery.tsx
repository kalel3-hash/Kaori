"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
        {current && (
          <Image
            key={current}
            src={current}
            alt={alt}
            fill
            priority={active === 0}
            sizes="(min-width: 768px) 440px, 90vw"
            className="object-contain"
          />
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-3">
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Ver foto ${index + 1} de ${images.length}`}
                aria-current={index === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-lg border-2 bg-white ${
                  index === active ? "border-olive" : "border-transparent"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="88px"
                  className="object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
