import OfferBar from "./components/OfferBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <OfferBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Services />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
