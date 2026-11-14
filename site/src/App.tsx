import { useEffect, useState } from 'react';
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
import Projects from './sections/Projects';
import Teaser from './sections/Teaser';
import Contact from './sections/Contact';

// Hash routing: the artifact viewer only passes a plain #name, so pages and section anchors share the hash.
export const PAGES = ['start', 'leistungen', 'projekte', 'ueber-mich', 'faq', 'kontakt'] as const;
export type Page = (typeof PAGES)[number];
const SECTION_PAGE: Record<string, Page> = {
  top: 'start', pakete: 'leistungen', beispiele: 'leistungen', konfigurator: 'leistungen',
  zusammenfassung: 'leistungen', print: 'leistungen',
};
// Unknown hashes (e.g. #footer) keep the current page.
const pageOf = (hash: string, current: Page): Page =>
  (PAGES as readonly string[]).includes(hash) ? (hash as Page) : SECTION_PAGE[hash] ?? current;

const readHash = () => decodeURIComponent(location.hash.slice(1));

export default function App() {
  const [lang, setLang] = useState<Lang>('de');
  const [hash, setHash] = useState(readHash);
  const [page, setPage] = useState<Page>(() => pageOf(readHash(), 'start'));

  useEffect(() => {
    const f = () => { const h = readHash(); setHash(h); setPage(p => pageOf(h, p)); };
    addEventListener('hashchange', f);
    return () => removeEventListener('hashchange', f);
  }, []);

  // A page link starts at the top; a section link scrolls to its section once the page has rendered.
  useEffect(() => {
    const el = hash && hash !== 'top' && !(PAGES as readonly string[]).includes(hash) ? document.getElementById(hash) : null;
    if (el) el.scrollIntoView();
    else scrollTo({ top: 0 });
  }, [hash]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Nav page={page} />
      <main key={page}>
        {page === 'start' && <><Hero /><Teaser /></>}
        {page === 'leistungen' && <><Packages /><Examples /><Print /><Configurator /></>}
        {page === 'projekte' && <Projects />}
        {page === 'ueber-mich' && <About />}
        {page === 'faq' && <Faq />}
        {page === 'kontakt' && <Contact />}
      </main>
      <Footer />
    </LangContext.Provider>
  );
}
