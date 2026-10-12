import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio y de las consultas y pedidos de Kaori.",
};

const sections = [
  {
    title: "Sobre este sitio",
    paragraphs: [
      "Kaori es una marca independiente de bienestar natural. Este sitio es informativo y comercial: permite conocer los productos, sus precios y su disponibilidad. No tiene carrito ni pagos en línea. Los pedidos se consultan y se confirman por WhatsApp.",
    ],
  },
  {
    title: "Productos y marcas",
    paragraphs: [
      "Cada producto indica la marca a la que pertenece. Las marcas, nombres y logotipos pertenecen a sus respectivos titulares. La descripción de cada producto se basa en la información de la que disponemos.",
    ],
  },
  {
    title: "Precios y disponibilidad",
    paragraphs: [
      "Los precios se muestran en pesos argentinos y pueden cambiar sin previo aviso. El precio y la disponibilidad se confirman al momento de hacer el pedido.",
      "Los productos agotados siguen visibles con la indicación «Agotado temporalmente». Podés consultarnos cuándo vuelven a estar disponibles.",
    ],
  },
  {
    title: "Pedidos y pagos",
    paragraphs: [
      "Un pedido se considera confirmado cuando lo acordamos con vos por WhatsApp. Los medios de pago previstos son transferencia, Mercado Pago y efectivo.",
    ],
  },
  {
    title: "Entregas",
    paragraphs: [
      `Las entregas se realizan en ${site.location}, de forma personal o por mensajería. El costo depende de la zona y se informa antes de confirmar el pedido.`,
    ],
  },
  {
    title: "Información de bienestar",
    paragraphs: [
      "El contenido de este sitio tiene fines informativos y de bienestar general. No reemplaza el asesoramiento de un profesional de la salud ni sustituye ningún tratamiento o medicación. Ante cualquier duda sobre tu salud, consultá con un profesional.",
    ],
  },
  {
    title: "Cambios, devoluciones y reclamos",
    paragraphs: [
      "Te reconocemos los derechos que la normativa vigente de defensa del consumidor establece. Para cualquier cambio, devolución o reclamo, escribinos por WhatsApp desde la página de contacto.",
    ],
  },
  {
    title: "Propiedad intelectual",
    paragraphs: [
      "Los textos, el diseño y el resto de los contenidos propios de Kaori no pueden reproducirse sin autorización.",
    ],
  },
  {
    title: "Legislación aplicable",
    paragraphs: [
      "Estos términos se rigen por las leyes de la República Argentina.",
    ],
  },
];

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      intro="Estas son las condiciones que aplican al uso del sitio y a las consultas y pedidos que hagas por WhatsApp."
      sections={sections}
    />
  );
}
