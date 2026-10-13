import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { legal } from "@/data/legal";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-4 text-5xl font-normal leading-tight">{title}</h1>

        <p className="mb-2 text-sm text-[#8c8b88]">
          Última actualización: {legal.lastUpdated}
        </p>

        <p className="mb-12 text-base text-neutral-600">{intro}</p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-3xl font-normal">{section.title}</h2>
              <div className="space-y-3 text-neutral-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          {legal.ownerName && (
            <section>
              <h2 className="mb-3 text-3xl font-normal">Responsable</h2>
              <p className="text-neutral-600">
                {legal.ownerName}
                {legal.ownerTaxId ? ` — CUIT ${legal.ownerTaxId}` : ""}
              </p>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
