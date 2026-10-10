# Dr Jay — Uro60 relapse risk explorer

Static, mobile-friendly educational website. No build step or server required.

## Preview
Open `index.html` locally, then follow the calculator link.

## Publish on GitHub Pages
1. Create a **public** repository (for example `drjay-site`) and upload these files to its root.
2. In Settings → Pages, select Deploy from a branch, `main`, `/ (root)`.
3. For the **apex domain** `drjay.uk`, enter it in Pages → Custom domain and save **before** configuring DNS.
4. In IONOS → Domains & SSL → DNS, configure `A` records for host `@` pointing to GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Remove conflicting default website records only after checking what they serve. Preserve MX/TXT email records.
5. Optional: `www` CNAME → `YOUR-GITHUB-USERNAME.github.io` (not the repository path).
6. Verify the domain in GitHub, then enable Enforce HTTPS when available. DNS changes can take time.

Official instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Academic credit
The implementation is attributed to Dr Jay Atkinson; the prognostic model is attributed to Wagner et al. A DOI has **not** yet been registered. Add a licence after deciding reuse terms, then archive a release with Zenodo. Do not claim the original model as your own.

## Safety and validation
The seminoma calculator is an illustrative approximation based on rounded HRs and 6% reference risk, not the original fitted Cox model. Non-seminoma numerical prediction is intentionally disabled pending source verification. It is **not** suitable for clinical decision-making. No patient information is collected or transmitted.

## Testing
`node tests.js` checks baseline, factor ordering, and that all 24 seminoma combinations produce finite values.
