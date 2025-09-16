import Footer from "@/app/components/layout/Footer";
import Features from "./components/Features";
import Hero from "./components/Hero";
import ImageSection from "./components/ImageSection";
import Navbar from "@/app/components/layout/Navbar";

export default function Home() {
  return (
    <main
      className="bg-white text-gray-900"
      style={{ backgroundImage: "url('/images/background-landing.svg')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
    >
      <Navbar />

      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
        <div className="space-y-8 text-center md:text-left">
          <Hero />
          <Features />
        </div>

        <div className="flex justify-center md:justify-end">
          <ImageSection />
        </div>
      </section>
      <Footer />
    </main>
  );
}

