# Uro60 MDT Toolkit — project starter

Designed to match the existing drjay.uk site: navy background, blue highlights, DRJAY.UK header, panels, doctor-only disclaimer.

## Contents
- index.html — toolkit landing page with MDT / FRCS modes, search and specialty filters
- toolkit.css — matching design system
- toolkit.js — catalogue, interactive PSA doubling time and BOOI/BCI educational prototypes
- VALIDATION.md — clinical QA requirements and implementation roadmap

## Deployment
This is **not deployed** to drjay.uk. To preview, open `index.html` in a browser. For a GitHub Pages deployment, place these files in a new `toolkit/` directory of the existing repository and link to `/toolkit/` from the homepage. Do not replace the existing root `index.html` or calculator.html.

## Clinical status
PROTOTYPE — NOT VALIDATED FOR CLINICAL USE. Renal page implements educational prototypes for Leibovich 2003, VENUSS and IMDC/Heng; remaining scores are catalogued but not implemented. Implement only after primary-source verification, version selection, test vectors and clinical review.

## Renal release
Open `renal.html` for the three source-linked renal scores. Both modes share a single calculation function; clinical review remains outstanding.

## Renal diagrams (v3)
Four original SVG schematics are in `diagrams/` and embedded in both renal pages: RENAL nephrometry, Bosniak v2019, RCC venous TNM, and score selection. SVG assets are lightweight and work on GitHub Pages without dependencies. Diagrams are educational simplifications, not diagnostic images.
