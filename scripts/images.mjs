// Genera las imágenes de la web a partir de _src/img.
// Uso: npm run images
// Para sustituir una foto de stock por una de Silvia: deja su foto en _src/img con el
// mismo nombre de archivo, ajusta fx/fy (punto de interés, 0–1) si hace falta y vuelve a ejecutar.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = '_src/img';
const OUT = 'assets/img';

// ratio = ancho/alto del recorte · fx/fy = centro del recorte (0–1) · zoom > 1 recorta más cerca
const JOBS = [
  { src: 'mono-flores', out: 'mono-flores', ratio: 4 / 5, fx: 0.5, fy: 0.42, widths: [480, 800, 1200] },
  { src: 'mono-flores', out: 'mono-flores-detalle', ratio: 3 / 4, fx: 0.53, fy: 0.41, zoom: 2.6, widths: [320, 560] },
  { src: 'mono-bajo', out: 'mono-bajo', ratio: 4 / 5, fx: 0.55, fy: 0.42, widths: [480, 800, 1200] },
  { src: 'novia-ventana', out: 'novia-ventana', ratio: 4 / 5, fx: 0.55, fy: 0.5, widths: [480, 800, 1000] },
  { src: 'recogido-rizo-cobrizo', out: 'recogido-rizo-cobrizo', ratio: 4 / 5, fx: 0.36, fy: 0.55, widths: [480, 800, 1000] },
  { src: 'semirecogido', out: 'semirecogido', ratio: 4 / 5, fx: 0.5, fy: 0.36, widths: [480, 800, 1200] },
  { src: 'rizos-semirecogido', out: 'rizos-semirecogido', ratio: 4 / 5, fx: 0.5, fy: 0.5, widths: [480, 800, 1200] },
  { src: 'rizos-sueltos', out: 'rizos-sueltos', ratio: 4 / 5, fx: 0.5, fy: 0.42, widths: [480, 800, 1200] },
  { src: 'trenza', out: 'trenza', ratio: 4 / 5, fx: 0.27, fy: 0.5, widths: [480, 800, 1000] },
  { src: 'caballero-nuca', out: 'caballero-nuca', ratio: 4 / 5, fx: 0.47, fy: 0.5, widths: [480, 800] },
  { src: 'flequillo-nena', out: 'flequillo-nena', ratio: 4 / 5, fx: 0.62, fy: 0.5, widths: [480, 800] },
];

function cropBox(w, h, { ratio, fx, fy, zoom = 1 }) {
  let cw = w, ch = Math.round(w / ratio);
  if (ch > h) { ch = h; cw = Math.round(h * ratio); }
  cw = Math.round(cw / zoom); ch = Math.round(ch / zoom);
  const left = Math.min(Math.max(Math.round(fx * w - cw / 2), 0), w - cw);
  const top = Math.min(Math.max(Math.round(fy * h - ch / 2), 0), h - ch);
  return { left, top, width: cw, height: ch };
}

await mkdir(OUT, { recursive: true });
for (const job of JOBS) {
  const input = sharp(`${SRC}/${job.src}.jpg`);
  const { width, height } = await input.metadata();
  const box = cropBox(width, height, job);
  // Tratamiento común: un punto más cálido y algo de contraste suave para unificar fuentes distintas.
  const base = sharp(`${SRC}/${job.src}.jpg`).extract(box).modulate({ saturation: 0.94 })
    .recomb([[1.03, 0.01, 0], [0, 1, 0], [0, 0.01, 0.94]]).linear(1.04, -4);
  for (const w of job.widths) {
    const r = base.clone().resize({ width: w, withoutEnlargement: true });
    await r.clone().webp({ quality: 74 }).toFile(`${OUT}/${job.out}-${w}.webp`);
    await r.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(`${OUT}/${job.out}-${w}.jpg`);
  }
  console.log(`${job.out}: ${box.width}×${box.height} → ${job.widths.join(', ')}`);
}
