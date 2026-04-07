import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import About from "@/components/sections/About";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Impact from "@/components/sections/Impact";
import Contact from "@/components/sections/Contact";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <About />
        <WhyChooseUs />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
