# Portfolio Operating Dashboard

A premium React + Vite + Tailwind demo for an internal BI operating dashboard.

It includes:

- 3 role-based views: Executive, AI Product Manager, and Operations Lead
- bilingual UI: English and Chinese
- mock filters, KPI cards, charts, alerts, and a role-aware portfolio table
- a static build that can be deployed directly to GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

After the repo is pushed to GitHub:

1. Open the repository on GitHub.
2. Go to `Settings` -> `Pages`.
3. Set the source to `GitHub Actions`.
4. Push to the `main` branch.
5. GitHub will build and publish the site automatically.

Your live URL will usually be:

```text
https://<your-github-username>.github.io/<repo-name>/
```
