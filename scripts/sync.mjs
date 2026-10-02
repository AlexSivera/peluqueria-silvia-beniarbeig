// Copia la cabecera (sprite + header) y el pie de index.html al resto de páginas.
// Uso: node scripts/sync.mjs  (después de cambiar la cabecera o el pie en index.html)
import { readFile, writeFile } from 'node:fs/promises';

const PAGINAS = { 'recogidos/index.html': '/recogidos/', 'aviso-legal/index.html': '/aviso-legal/', '404.html': null };
const src = await readFile('index.html', 'utf8');
const bloque = (txt, nombre) => {
  const m = txt.match(new RegExp(`<!-- ${nombre}:inicio -->[\\s\\S]*?<!-- ${nombre}:fin -->`));
  if (!m) throw new Error(`Falta el bloque ${nombre}`);
  return m[0];
};
for (const [archivo, ruta] of Object.entries(PAGINAS)) {
  let html = await readFile(archivo, 'utf8');
  for (const nombre of ['comun', 'pie']) {
    let b = bloque(src, nombre);
    if (nombre === 'comun' && ruta) b = b.replace(`<a href="${ruta}">`, `<a href="${ruta}" aria-current="page">`);
    html = html.replace(bloque(html, nombre), () => b);
  }
  await writeFile(archivo, html);
  console.log('sincronizada', archivo);
}
