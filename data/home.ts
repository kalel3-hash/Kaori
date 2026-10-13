// Rutas de las fotos de la Home (archivos dentro de /public).
// Ejemplo: hero: "/images/hero.jpg"
// Si una ruta queda vacía, se muestra un bloque de color en su lugar.
export const homeImages = {
  hero: "/images/hero.jpg",
  about: "",
  rituals: {
    manana: "/images/rituals/manana.jpg",
    pausa: "/images/rituals/pausa.jpg",
    bienestar: "/images/rituals/bienestar.jpg",
    descanso: "/images/rituals/descanso.jpg",
  } as Record<string, string>,
};
