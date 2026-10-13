# Dr. Iskander Hasson A. Sattar — Research site

A static site (plain HTML, CSS and JavaScript — no server, no database) listing the publications of
Dr. Iskander Hasson A. Sattar, Associate Professor of Business Administration, University of Science and Technology, Aden.

| Page | What it is |
|---|---|
| `index.html` | Home: name, fields of work, recent papers |
| `research.html` | All publications, with search and filters by field and year |
| `paper.html?id=…` | One paper: details, citation, link to the publisher |
| `profile.html` | Short profile, research interests, co-authors |
| `card.html` | Printable business card (85.6 × 54 mm) with the QR code |
| `print/card.pdf` | The card, ready for a print shop |

## Adding a paper
Open `assets/data.js`, copy one block in `PAPERS`, and fill it in. The counts, filters and pages update themselves.

## Putting it online (for the QR code)
1. Merge this branch into `main`.
2. On GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root**.
3. The site appears at `https://yousefpowerpoint-glitch.github.io/Iskander/` — the address the QR already points to.

If the address changes: `pip install segno && python tools/make_qr.py <new-url>`, then reprint the card.

## Offline
Every page works from the folder itself — open `index.html` directly, no internet needed.
Only the "Read at the publisher" and ResearchGate / Scholar links go online.
