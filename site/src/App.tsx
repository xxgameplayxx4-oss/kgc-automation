import { useState } from 'react';
import { LangContext, type Lang } from './data';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Packages from './sections/Packages';
import Examples from './sections/Examples';
import Configurator from './sections/Configurator';
import Print from './sections/Print';
import Faq from './sections/Faq';
import Footer from './sections/Footer';

// Section ids (used by Nav anchors): top, pakete, beispiele, konfigurator, print, faq, kontakt
export default function App() {
  const [lang, setLang] = useState<Lang>('de');
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Nav />
      <main>
        <Hero />
        <Packages />
        <Examples />
        <Configurator />
        <Print />
        <Faq />
      </main>
      <Footer />
    </LangContext.Provider>
  );
}
