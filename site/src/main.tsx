import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import { Theme } from '@astryxdesign/core/theme';
import { themes, defaultThemeSlug } from './astryx-themes';
import { ModeContext, type Mode } from './data';
import App from './App';

const KEY = 'cung-mode';
const saved = (): Mode => { try { return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'; } catch { return 'dark'; } };

function Root() {
  const [mode, setModeState] = useState<Mode>(saved);
  const setMode = (m: Mode) => { setModeState(m); try { localStorage.setItem(KEY, m); } catch { /* storage blocked: mode just isn't remembered */ } };
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <Theme theme={themes[defaultThemeSlug]} mode={mode}>
        <App />
      </Theme>
    </ModeContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Root /></StrictMode>);
