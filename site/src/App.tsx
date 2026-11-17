import { useEffect, useState } from 'react';
import { LangContext, type Lang } from './data';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Packages, { Care } from './sections/Packages';
import Examples from './sections/Examples';
import About from './sections/About';
import Configurator from './sections/Configurator';
import Print from './sections/Print';
import Faq from './sections/Faq';
import Footer from './sections/Footer';
import Projects from './sections/Projects';
import Teaser from './sections/Teaser';
import Contact from './sections/Contact';
import Pains, { Film, HowItWorks, Offers } from './sections/Pains';
import Automations from './sections/Automations';

// Hash routing: the artifact viewer only passes a plain #name, so pages and section anchors share the hash.
export const PAGES = ['start', 'automationen', 'websites', 'projekte', 'ueber-mich', 'faq', 'kontakt'] as const;
export type Page = (typeof PAGES)[number];
const SECTION_PAGE: Record<string, Page> = {
  top: 'start', pakete: 'websites', beispiele: 'websites', konfigurator: 'websites',
  zusammenfassung: 'websites', print: 'websites', leistungen: 'websites', autopilot: 'automationen',
  'film-demo': 'websites', 'autopilot-teaser': 'start', film: 'start', wartung: 'websites',
};
const LANG_KEY = 'cung-lang';
// Unknown hashes (e.g. #footer) keep the current page.
const pageOf = (hash: string, current: Page): Page =>
  (PAGES as readonly string[]).includes(hash) ? (hash as Page) : SECTION_PAGE[hash] ?? current;

const readHash = () => decodeURIComponent(location.hash.slice(1));

export default function App() {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'de'; } catch { return 'de'; }
  });
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch { /* storage blocked: language just isn't remembered */ }
  };
  const [hash, setHash] = useState(readHash);
  const [page, setPage] = useState<Page>(() => pageOf(readHash(), 'start'));
  // The websites page holds the configurator; once visited it stays mounted (hidden) so the visitor's choices survive page changes.
  const [websitesSeen, setWebsitesSeen] = useState(page === 'websites');
  useEffect(() => { if (page === 'websites') setWebsitesSeen(true); }, [page]);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  // Clicking a link to the hash we are already on fires no hashchange: scroll to the section (or top) ourselves.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const h = a ? decodeURIComponent(a.getAttribute('href')!.slice(1)) : null;
      if (h === null || h !== readHash()) return;
      const el = h && !(PAGES as readonly string[]).includes(h) ? document.getElementById(h) : null;
      if (el && h !== 'top') el.scrollIntoView({ behavior: 'smooth' });
      else scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

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
      <main>
        {page === 'start' && <><Hero /><Pains /><HowItWorks /><Film /><Offers /><Teaser /></>}
        {page === 'automationen' && <Automations />}
        {(websitesSeen || page === 'websites') && (
          <section style={{ display: page === 'websites' ? 'contents' : 'none' }}><Packages /><Examples /><Configurator /><Print /><Care /></section>
        )}
        {page === 'projekte' && <Projects />}
        {page === 'ueber-mich' && <About />}
        {page === 'faq' && <Faq />}
        {page === 'kontakt' && <Contact />}
      </main>
      <Footer />
    </LangContext.Provider>
  );
}
