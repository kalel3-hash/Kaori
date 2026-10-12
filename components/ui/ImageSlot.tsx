import Image from "next/image";

type ImageSlotProps = {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export default function ImageSlot({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
}: ImageSlotProps) {
  return (
    <div className={`relative overflow-hidden bg-[#e6dccb] ${className}`}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
    </div>
  );
}
