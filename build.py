#!/usr/bin/env python3
"""Assemble src/ into dist/artifact.html (no doc wrapper, for claude.ai Artifact)
and dist/index.html (full standalone document, for Netlify or any static host)."""
from pathlib import Path
import base64, re

ROOT = Path(__file__).parent
SRC = ROOT / "src"
SEC = SRC / "sections"
ORDER = ["nav", "hero", "demo", "offers", "work", "roi", "packages", "quote", "process", "faq", "footer"]

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Hanken+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">')
TITLE = "<title>KGC Automation</title>"
META = ('<meta name="claude:viewport-fit-sides" content="cover">'
        '<meta name="description" content="Massgeschneiderte Automationen für Schweizer Unternehmen: Bewertungen, Anfragen, Buchungen, Offerten und Rechnungen laufen von selbst.">')

def read(p):
    return p.read_text(encoding="utf-8") if p.exists() else ""

def main():
    (ROOT / "dist").mkdir(exist_ok=True)
    css = [read(SRC / "base.css")]
    html, js = [], [read(SRC / "core.js")]
    for name in ORDER:
        css.append(f"/* ==== {name} ==== */\n" + read(SEC / f"{name}.css"))
        h = read(SEC / f"{name}.html")
        if h:
            html.append(f"<!-- ==== {name} ==== -->\n" + h)
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
