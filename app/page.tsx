import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeHero from "@/components/home/HomeHero";
import RitualsSection from "@/components/home/RitualsSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";
import WhatsAppBand from "@/components/home/WhatsAppBand";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <HomeHero />

        <div className="mx-auto max-w-5xl px-6">
          <RitualsSection />
          <FeaturedProducts />
          <AboutSection />
        </div>

        <WhatsAppBand />
      </main>

      <Footer flush />
    </>
  );
}
