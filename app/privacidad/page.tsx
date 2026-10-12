import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo Kaori trata los datos personales de quienes la consultan.",
};

const sections = [
  {
    title: "Qué datos recibimos",
    paragraphs: [
      "Este sitio no tiene cuentas de usuario, carrito de compras ni formularios activos. Los datos personales que recibimos son los que vos nos envías por WhatsApp al consultarnos: por ejemplo tu nombre, tu número de teléfono, el contenido de tu consulta y, si hacés un pedido, los datos necesarios para coordinar el pago y la entrega.",
      "El proveedor que aloja el sitio puede registrar datos técnicos básicos de navegación, como la dirección IP o el tipo de navegador. Actualmente el sitio no utiliza cookies publicitarias ni herramientas de seguimiento propias.",
    ],
  },
  {
    title: "Para qué los usamos",
    paragraphs: [
      "Usamos tus datos únicamente para responder tus consultas, confirmar pedidos, coordinar pagos y entregas, y atender cualquier reclamo posterior.",
    ],
  },
  {
    title: "Con quién los compartimos",
    paragraphs: [
      "No vendemos ni cedemos tus datos a terceros con fines comerciales. Solo compartimos lo estrictamente necesario con quienes intervienen en tu pedido, como el medio de pago elegido o el servicio de mensajería.",
      "Las conversaciones por WhatsApp se realizan a través de una plataforma de terceros y están sujetas a sus propias condiciones y políticas de privacidad.",
    ],
  },
  {
    title: "Cuánto tiempo los conservamos",
    paragraphs: [
      "Conservamos tus datos durante el tiempo necesario para cumplir con las finalidades indicadas y con las obligaciones legales que correspondan.",
    ],
  },
  {
    title: "Tus derechos",
    paragraphs: [
      "De acuerdo con la Ley 25.326 de Protección de los Datos Personales, podés solicitar el acceso, la rectificación o la supresión de tus datos personales cuando corresponda.",
      `Para ejercer estos derechos, escribinos por WhatsApp desde la página de contacto. Atendemos consultas de ${site.location}.`,
      "La Agencia de Acceso a la Información Pública es el órgano de control de la Ley 25.326 y atiende las denuncias y reclamos por incumplimientos de la normativa de protección de datos personales.",
    ],
  },
  {
    title: "Cambios en esta política",
    paragraphs: [
      "Podemos actualizar esta política. La fecha de la última actualización figura al comienzo de esta página.",
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      intro="Explicamos qué datos personales recibimos cuando nos consultás, para qué los usamos y cuáles son tus derechos."
      sections={sections}
    />
  );
}
