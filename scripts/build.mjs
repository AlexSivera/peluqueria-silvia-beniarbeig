// Copia la web publicable a dist/ adaptando las rutas a un subdirectorio y a la URL final.
// Uso: SITE_URL=https://usuario.github.io/repo/ node scripts/build.mjs
// En local la web usa rutas desde la raíz (/assets/…); GitHub Pages de proyecto la sirve en /repo/.
import { cp, mkdir, readFile, rm, writeFile, readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';

const SITE = (process.env.SITE_URL || 'https://www.silviaperruqueria.es/').replace(/\/?$/, '/');
const BASE = new URL(SITE).pathname; // «/» o «/repo/»
const DOMINIO_PROVISIONAL = 'https://www.silviaperruqueria.es/';
const PUBLICAR = ['index.html', '404.html', 'favicon.svg', 'robots.txt', 'sitemap.xml', 'assets', 'recogidos', 'aviso-legal'];

await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const p of PUBLICAR) await cp(p, join('dist', p), { recursive: true });
await writeFile('dist/.nojekyll', '');

const conBase = (txt) => txt
  .replaceAll(DOMINIO_PROVISIONAL, SITE)
  // atributos con ruta desde la raíz: href="/…", src="/…", srcset="/… 480w, /… 800w"
  .replace(/\b(href|src|srcset)="([^"]*)"/g, (m, attr, val) =>
    `${attr}="${val.replace(/(^|,\s*)\/(?!\/)/g, `$1${BASE}`)}"`)
  .replace(/url\("\/(?!\/)/g, `url("${BASE}`)
  .replace(/`\/assets\//g, `\`${BASE}assets/`);

async function recorrer(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await recorrer(p);
    else if (['.html', '.css', '.js', '.xml', '.txt'].includes(extname(p))) {
      await writeFile(p, conBase(await readFile(p, 'utf8')));
    }
  }
}
await recorrer('dist');
console.log(`dist/ listo para ${SITE} (base ${BASE})`);
