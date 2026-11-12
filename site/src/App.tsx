import { useState } from 'react';
import { LangContext, type Lang } from './data';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Packages from './sections/Packages';
import Examples from './sections/Examples';
import About from './sections/About';
import Configurator from './sections/Configurator';
import Print from './sections/Print';
import Faq from './sections/Faq';
import Footer from './sections/Footer';

// Section ids (used by Nav anchors): top, pakete, beispiele, ueber-mich, konfigurator, print, faq, kontakt
export default function App() {
  const [lang, setLang] = useState<Lang>('de');
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Nav />
      <main>
        <Hero />
        <Packages />
        <Examples />
        <About />
        <Configurator />
        <Print />
        <Faq />
      </main>
      <Footer />
    </LangContext.Provider>
  );
}
