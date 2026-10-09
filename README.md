YE$! CHEF PRO — Handwriting OCR improvements (v7)

Files to upload to the ROOT of your existing GitHub Pages repository:
- index.html (updated OCR cleanup passes for faint/uneven handwriting and recipe photos)
- sw.js (new cache name to load the updated app)
- manifest.json
- icon.svg
- icon-192.png
- icon-512.png
- yes-chef-pro-logo.jpg

IMPORTANT:
1. Keep your existing repository and data; replace the matching files, do not delete your repository.
2. Upload/replace index.html and sw.js at minimum. Replace manifest/icons only if you want all package assets synced.
3. Commit to main and wait for GitHub Pages to publish.
4. Refresh the website. If the installed PWA still shows the old version, clear the site's stored data in Chrome and reopen the site.

The OCR update tries multiple image cleanups and rotations. Browser Tesseract OCR can still misread cursive handwriting; review all extracted names, quantities, prices, recipe measurements and instructions before saving. Truly reliable handwriting recognition generally requires a handwriting-capable AI service, which needs a secure backend/API key and is not included in this static GitHub Pages package.
