// Comprobaciones estáticas: enlaces internos, imágenes, alt, ids duplicados, un h1 por página
// y contraste de los pares de color de la paleta. Uso: npm run check
import { readFile, access } from 'node:fs/promises';

const PAGINAS = ['index.html', 'recogidos/index.html', 'aviso-legal/index.html', '404.html'];
const errores = [];
const existe = (p) => access(p).then(() => true, () => false);

for (const pag of PAGINAS) {
  const html = await readFile(pag, 'utf8');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  ids.filter((id, i) => ids.indexOf(id) !== i).forEach((id) => errores.push(`${pag}: id duplicado «${id}»`));
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errores.push(`${pag}: ${h1} h1`);

  for (const [, tag] of html.matchAll(/(<img\b[^>]*>)/g)) {
    if (!/\salt="/.test(tag)) errores.push(`${pag}: imagen sin alt ${tag.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) errores.push(`${pag}: imagen sin width/height ${tag.slice(0, 80)}`);
  }
  const rutas = [
    ...[...html.matchAll(/\s(?:src|href)="(\/[^"#?]*)/g)].map((m) => m[1]),
    ...[...html.matchAll(/srcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(' ')[0])),
  ];
  for (const r of new Set(rutas)) {
    const f = r.endsWith('/') ? `${r.slice(1)}index.html` : r.slice(1);
    if (!(await existe(f || 'index.html'))) errores.push(`${pag}: no existe ${r}`);
  }
  for (const [, ancla] of html.matchAll(/href="\/#([^"]+)"/g)) {
    const inicio = await readFile('index.html', 'utf8');
    if (!inicio.includes(`id="${ancla}"`)) errores.push(`${pag}: ancla /#${ancla} no existe en inicio`);
  }
  for (const [, use] of html.matchAll(/<use href="#([^"]+)"/g)) {
    if (!ids.includes(use)) errores.push(`${pag}: icono #${use} no definido`);
  }
}

// Contraste WCAG
const lum = (hex) => {
  const c = hex.match(/\w\w/g).map((x) => parseInt(x, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const PARES = [
  ['texto sobre enlucit', '2B1916', 'F6E8E0', 4.5], ['texto 2 sobre enlucit', '5E4640', 'F6E8E0', 4.5],
  ['acento almagra-fosc sobre enlucit', '74251F', 'F6E8E0', 4.5], ['retol sobre almagra', 'FFFBF6', 'A13A33', 4.5],
  ['etiqueta pedra-clar sobre almagra', 'EEE5D5', 'A13A33', 4.5], ['etiqueta pedra-clar sobre vidre', 'EEE5D5', '2F574C', 4.5], ['retol sobre vidre', 'FFFBF6', '2F574C', 4.5],
  ['texto claro sobre vidre', 'E3EEE9', '2F574C', 4.5], ['nota foto sobre vidre', 'C9DCD4', '2F574C', 4.5],
  ['almagra-fosc sobre retol (botón)', '74251F', 'FFFBF6', 4.5], ['pie sobre tinta', 'EADBD3', '2B1916', 4.5],
  ['legal pie sobre tinta', 'BFA99F', '2B1916', 4.5], ['cita pie sobre almagra', 'F2D2C8', 'A13A33', 4.5],
  ['estado sobre almagra', 'F5DCD3', 'A13A33', 4.5], ['vidre sobre retol (barra)', '2F574C', 'FFFBF6', 4.5],
  ['texto 2 sobre retol', '5E4640', 'FFFBF6', 4.5], ['8:00 vidre-clar sobre vidre', '8DB5A5', '2F574C', 3],
];
for (const [n, a, b, min] of PARES) {
  const r = ratio(a, b);
  console.log(`${r >= min ? 'ok ' : 'MAL'} ${r.toFixed(2)}:1  ${n}`);
  if (r < min) errores.push(`contraste insuficiente: ${n} (${r.toFixed(2)})`);
}

if (errores.length) { console.error(`\n${errores.length} problemas:\n- ${errores.join('\n- ')}`); process.exit(1); }
console.log('\nTodo correcto.');
