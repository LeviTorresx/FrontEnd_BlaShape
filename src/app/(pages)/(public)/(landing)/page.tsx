import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CuttingPlanVisual from "./components/CuttingPlanVisual";

export default function Home() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      {/* Hero split layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-70px)]">
        {/* Left — copy */}
        <div className="flex flex-col justify-center px-6 lg:px-12 py-16 md:py-24">
          <Hero />
        </div>

        {/* Right — visual panel */}
        <div
          className="relative flex items-center justify-center px-8 py-16 border-l border-gray-200 overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-gray-200, #e5e7eb) 1px, transparent 1px), linear-gradient(90deg, var(--color-gray-200, #e5e7eb) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundColor: "#f8f7f4",
          }}
        >
          <CuttingPlanVisual />
        </div>
      </section>

      <Features />
      <Footer />
    </main>
  );
}
