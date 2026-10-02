# Silvia Perruqueria Home i Dona — web

Web estática (HTML, CSS y JS sin dependencias) para la peluquería de Silvia Poquet en Carrer Sant Roc, 39, Beniarbeig.

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # enlaces, imágenes, alt, ids, contraste
npm run images   # regenera assets/img desde _src/img
node scripts/sync.mjs   # copia cabecera y pie de index.html al resto de páginas
npm run deploy   # genera dist/ con las rutas de GitHub Pages y lo sube a la rama gh-pages
```

- Publicada en GitHub Pages: https://alexsivera.github.io/peluqueria-silvia-beniarbeig/
- `scripts/build.mjs` copia solo lo publicable a `dist/` y reescribe las rutas `/…` al subdirectorio del repo y el dominio provisional a la URL final (`SITE_URL`). Con dominio propio: `SITE_URL=https://www.dominio.es/ npm run deploy`.
- Documentación: [business-brief](docs/business-brief.md), [dirección creativa](docs/design-direction.md), [QA](docs/qa-report.md).
- Las fotos actuales son de Unsplash y provisionales: ver «Pendiente» en el informe de QA.
