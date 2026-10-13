# Dr. Iskander Hasson A. Sattar — Research site

A static site (plain HTML, CSS and JavaScript — no server, no database) listing the publications of
Dr. Iskander Hasson A. Sattar, Associate Professor of Business Administration, University of Science and Technology, Aden.

| Page | What it is |
|---|---|
| `index.html` | Home: name, fields of work, recent papers |
| `research.html` | All publications, with search and filters by field and year |
| `paper.html?id=…` | One paper: details, citation, link to the publisher |
| `profile.html` | Profile (from his ResearchGate page), education, co-authors |
| `sources.html` | Every source used, per paper |
| `card.html` | Printable business card (85.6 × 54 mm) with the QR code |
| `print/card.pdf` | The card for a print shop: 2 pages at exact card size (85.6 × 54 mm) — page 1 front, page 2 back |
| `print/card-a4.pdf` | For printing at home: A4, one side per page |

## Adding a paper
Open `assets/data.js`, copy one block in `PAPERS`, and fill it in. The counts, filters and pages update themselves.

## Online address (the QR points here)
https://dr-iskander-sattar.vercel.app/ — hosted on Vercel (project `dr-iskander-sattar`).

If the address changes: `pip install segno && python tools/make_qr.py <new-url>`, then reprint the card.

## Offline
Every page works from the folder itself — open `index.html` directly, no internet needed.
Only the "Read at the publisher" and ResearchGate / Scholar links go online.
