"""Writes assets/qr.svg for the business card.

    pip install segno
    python tools/make_qr.py https://yousefpowerpoint-glitch.github.io/Iskander/

Run it again whenever the site's address changes, then reprint the card.
"""
import pathlib
import sys

import segno

url = sys.argv[1] if len(sys.argv) > 1 else "https://dr-iskander-sattar.vercel.app/"
out = pathlib.Path(__file__).resolve().parent.parent / "assets" / "qr.svg"
segno.make(url, error="q").save(str(out), kind="svg", scale=1, border=0, dark="#1d2733", xmldecl=False, svgns=True)
# give it a viewBox so it scales cleanly to any print size
svg = out.read_text()
svg = svg.replace('class="segno"', 'class="segno" shape-rendering="crispEdges"')
import re
m = re.search(r'width="(\d+)" height="(\d+)"', svg)
svg = svg.replace(m.group(0), f'viewBox="0 0 {m.group(1)} {m.group(2)}"', 1)
out.write_text(svg)
print(f"{out}  ->  {url}")
