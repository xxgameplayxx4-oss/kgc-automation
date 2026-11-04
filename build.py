#!/usr/bin/env python3
"""Assemble src/ into dist/artifact.html (no doc wrapper, for claude.ai Artifact)
and dist/index.html (full standalone document, for Netlify or any static host)."""
from pathlib import Path
import base64, re

ROOT = Path(__file__).parent
SRC = ROOT / "src"
SEC = SRC / "sections"
# Each page is one view; the router in core.js shows one at a time (hash URLs, e.g. #pakete)
PAGES = [("top", ["hero", "vsl", "process", "showcase", "paths"]),
         ("leistungen", ["offers", "demo"]),
         ("pakete", ["packages"]),
         ("rechner", ["roi"]),
         ("arbeiten", ["work"]),
         ("faq", ["faq"]),
         ("offerte", ["quote"])]
ORDER = ["nav"] + [s for _, secs in PAGES for s in secs] + ["footer"]
PAGE_OF = {secs[0]: (pid, secs[-1]) for pid, secs in PAGES}
PAGE_END = {secs[-1] for _, secs in PAGES}

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Hanken+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">')
TITLE = "<title>KGC Automation</title>"
META = ('<meta name="claude:viewport-fit-sides" content="cover">'
        '<meta name="description" content="Websites und Automationen für Schweizer KMU: moderne Website plus automatische Anfragen, Termine, Bewertungen, Offerten und Rechnungen. Fixpreise.">')

def read(p):
    return p.read_text(encoding="utf-8") if p.exists() else ""

def main():
    (ROOT / "dist").mkdir(exist_ok=True)
    css = [read(SRC / "base.css")]
    html, js = [], [read(SRC / "core.js")]
    for name in ORDER:
        css.append(f"/* ==== {name} ==== */\n" + read(SEC / f"{name}.css"))
        h = read(SEC / f"{name}.html")
        if name in PAGE_OF:
            pid = PAGE_OF[name][0]
            html.append(f'<main class="page" data-page="{pid}"' + ('' if pid == "top" else ' hidden') + '>')
        if h:
            html.append(f"<!-- ==== {name} ==== -->\n" + h)
        if name in PAGE_END:
            html.append('</main>')
        js.append(f"/* ==== {name} ==== */\n" + read(SEC / f"{name}.js"))
    style = "<style>\n" + "\n".join(css) + "\n</style>"
    script = "<script>\n" + "\n;\n".join(js) + "\n</script>"
    body = "\n".join(html)

    artifact = f"{TITLE}\n{META}\n{FONTS}\n{style}\n{body}\n{script}\n"
    # The artifact is a single file: inline local images as data URIs
    def inline(m):
        f = ROOT / m.group(0)
        return "data:image/webp;base64," + base64.b64encode(f.read_bytes()).decode() if f.exists() else m.group(0)
    artifact = re.sub(r"assets/(?:work|media)/[\w.-]+\.webp", inline, artifact)
    (ROOT / "dist" / "artifact.html").write_text(artifact, encoding="utf-8")

    full = (f'<!doctype html>\n<html lang="de-CH" data-lang="de">\n<head>\n<meta charset="utf-8">\n'
            f'<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            f"{TITLE}\n{META}\n{FONTS}\n{style}\n</head>\n<body>\n{body}\n{script}\n</body>\n</html>\n")
    (ROOT / "index.html").write_text(full, encoding="utf-8")
    print("built", len(artifact) // 1024, "KB")

if __name__ == "__main__":
    main()
