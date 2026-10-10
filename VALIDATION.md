# Uro60 MDT Toolkit — clinical validation and build roadmap

## Architecture
Each calculator must have one source-controlled model definition shared between MDT mode and FRCS revision mode. Separate presentation from calculation. Preserve source/version/date, population, exclusions, and interpretation.

## Build order
1. Leibovich 2003 clear-cell RCC; verify all T-stage, node, size, grade and necrosis point allocations against primary source; provide low/intermediate/high categories, limitations, and a follow-up reference.
2. IMDC metastatic RCC; 6 factors, risk groups, original cohort and modern treatment-era caveats.
3. VENUSS papillary RCC; subtype and applicability caveats.
4. RENAL nephrometry; component definitions and imaging reference illustrations.
5. EAU NMIBC risk classification; lock to dated guidance and patient population.
6. Prostate CPG / EAU risk groups; lock to guideline version.
7. IGCCCG 2021 classification; ensure seminoma and NSGCT criteria differ appropriately.
8. Bosniak v2019; imaging definitions and modality limits.
9. UTUC classification; guideline versioning.
10. Expand into UroBank-derived AAST, Clavien–Dindo, PI-RADS, BOOI/BCI, and statistical calculators.

## Clinical acceptance criteria
- Cite primary paper, DOI or current official guideline for each calculator.
- Explicitly distinguish historical prognostic cohort risk from contemporary treatment outcome.
- Independent hand-calculated tests for every score branch and boundary.
- Test missing inputs, impossible inputs, stage boundaries and contradictory fields.
- No patient-identifiable information stored or transmitted.
- Copyable MDT summary excludes identifiers and includes model version and date.
- FRCS view explains every input, score table, pitfalls and a viva prompt.
- Clinical reviewer signs off prior to removal of prototype warning.

## Source of initial backlog
UroBank FRCS audit checkpoint (September 2026), plus MDT-focused extensions. Provisional audit stem counts are not claims about the current UroBank website.
