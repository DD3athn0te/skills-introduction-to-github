<div align="center">

# CIPHER NOTES // GITHUB → APP

### A neon-grade local notes app prototype for **CipherNotes v1.4.1**

[![Release](https://img.shields.io/badge/release-v1.4.1-00f5ff?style=for-the-badge&logo=github&logoColor=white&labelColor=050816)](https://github.com/CipherApps/cipher-notes/releases/tag/v1.4.1)
[![Status](https://img.shields.io/badge/status-app_prototype-ff2bd6?style=for-the-badge&labelColor=050816)](./index.html)
[![Platform](https://img.shields.io/badge/pipeline-GitHub_to_App-8cff00?style=for-the-badge&logo=githubactions&logoColor=white&labelColor=050816)](https://github.com/CipherApps/cipher-notes)

</div>

## What changed

This repository now contains a runnable static web app instead of only a release landing page. The prototype gives **Cipher Notes (GitHub to App)** a cybernetic command-deck interface for writing, tagging, prioritizing, saving, deleting, and exporting local notes.

## Run the app

Open `index.html` directly in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 4173
```

Then visit <http://localhost:4173>.

## App features

- **Cybernetic vault rail:** browse saved signals with priority, tag, and last-updated metadata.
- **Autosaving editor:** every title, body, priority, and tag update persists to `localStorage`.
- **Launch-ready starter notes:** preloaded v1.4.1 and roadmap notes make the app feel alive immediately.
- **Portable export:** download the full vault as JSON for the next native or hosted app iteration.
- **Release uplink:** jump from the app shell to the official CipherNotes v1.4.1 GitHub release.

## Mission brief

Version **v1.4.1** is represented as a hotfix-focused release path from GitHub into an app experience. The interface keeps the previous cyberpunk identity while adding functional app behavior: local persistence, editing workflow, diagnostics, and export.

## Project files

- `index.html` — app structure and semantic interface regions.
- `styles.css` — cybernetic visual system, responsive layout, and neon controls.
- `app.js` — note state, local persistence, rendering, create/delete, and JSON export.
