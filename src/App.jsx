import { useCallback, useState } from 'react';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Categories from './components/sections/Categories';
import About from './components/sections/About';
import ProductShowcase from './components/sections/ProductShowcase';
import WhyChooseUs from './components/sections/WhyChooseUs';
import CustomCake from './components/sections/CustomCake';
import Gallery from './components/sections/Gallery';
import Testimonials from './components/sections/Testimonials';
import OrderForm from './components/sections/OrderForm';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CursorGlow from './components/decor/CursorGlow';
import { SugarDivider } from './components/decor/FrostingBlobs';
import SplashScreen from './components/SplashScreen';

/**
 * Gowsalya Cake Shop — single page demo site.
 *
 * Section order is intentional: hook the visitor, prove the craft, show the
 * menu, explain customisation, build trust, then convert.
 */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const finishSplash = useCallback(() => setShowSplash(false), []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-50">
      {showSplash ? <SplashScreen onComplete={finishSplash} /> : null}

      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-berry-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to menu
      </a>

      <CursorGlow />

      <Navbar />

      <main id="main">
        <Hero />
        <SugarDivider />
        <Categories />
        <About />
        <ProductShowcase />
        <WhyChooseUs />
        <CustomCake />
        <Gallery />
        <Testimonials />
        <OrderForm />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
