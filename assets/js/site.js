// Silvia Perruqueria — interacción mínima, sin dependencias.
(() => {
  const d = document;

  /* ---------- Horario (hora de Madrid) ---------- */
  // 0 = domingo … 6 = sábado · tramos en horas decimales
  const HORARIO = {
    0: [], 1: [],
    2: [[9.5, 17]], 3: [[10, 13], [16, 20]], 4: [[9.5, 17]], 5: [[10, 13], [16, 20]],
    6: [[8, 14]],
  };
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const fmt = (h) => `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`;

  function ahoraMadrid() {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date()).map((x) => [x.type, x.value]));
    const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    return { dia, h: Number(p.hour) + Number(p.minute) / 60 };
  }

  function estado() {
    const { dia, h } = ahoraMadrid();
    const hoy = HORARIO[dia];
    const tramo = hoy.find(([a, b]) => h >= a && h < b);
    if (tramo) return { abierto: true, dia, h, corto: `<strong>Abierto ahora</strong> · hasta las ${fmt(tramo[1])}`, largo: `Ahora mismo está abierto, hasta las ${fmt(tramo[1])}.` };
    const luego = hoy.find(([a]) => a > h);
    if (luego) return { abierto: false, dia, h, corto: `Cerrado ahora · abre hoy a las ${fmt(luego[0])}`, largo: `Ahora está cerrado. Hoy abre a las ${fmt(luego[0])}.` };
    for (let i = 1; i <= 7; i++) {
      const sig = (dia + i) % 7;
      if (HORARIO[sig].length) {
        const cuando = i === 1 ? 'mañana' : `el ${DIAS[sig]}`;
        return { abierto: false, dia, h, corto: `Cerrado ahora · abre ${cuando} a las ${fmt(HORARIO[sig][0][0])}`, largo: `Ahora está cerrado. Vuelve a abrir ${cuando} a las ${fmt(HORARIO[sig][0][0])}.` };
      }
    }
    return null;
  }

  function pintarEstado() {
    const e = estado();
    if (!e) return;
    d.querySelectorAll('[data-estado]').forEach((el) => {
      el.classList.toggle('abierto', e.abierto);
      const t = el.querySelector('.estado__txt');
      if (t) t.innerHTML = e.corto;
    });
    d.querySelectorAll('[data-estado-largo]').forEach((el) => { el.textContent = e.largo; });

    const peine = d.querySelector('[data-peine]');
    if (!peine) return;
    peine.querySelectorAll('li').forEach((li) => li.classList.remove('es-hoy'));
    const fila = peine.querySelector(`li[data-dia="${e.dia}"]`);
    if (!fila) return;
    fila.classList.add('es-hoy');
    const pua = fila.querySelector('.peine__pua');
    let marca = pua.querySelector('.ahora');
    if (e.h >= 8 && e.h <= 20) {
      if (!marca) {
        marca = d.createElement('span');
        marca.className = 'ahora';
        marca.setAttribute('aria-hidden', 'true');
        marca.innerHTML = '<svg viewBox="0 0 16 64" preserveAspectRatio="none"><use href="#i-horquilla-v"/></svg>';
        pua.appendChild(marca);
      }
      marca.style.setProperty('--t', (e.h - 8).toFixed(3));
    } else if (marca) {
      marca.remove();
    }
  }
  pintarEstado();
  setInterval(pintarEstado, 60_000);

  /* ---------- Menú móvil ---------- */
  const btn = d.querySelector('.menu-btn');
  const nav = d.getElementById('menu');
  if (btn && nav) {
    const cerrar = () => { nav.classList.remove('abierto'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', () => {
      const abierto = nav.classList.toggle('abierto');
      btn.setAttribute('aria-expanded', String(abierto));
    });
    nav.addEventListener('click', (ev) => { if (ev.target.closest('a')) cerrar(); });
    d.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && nav.classList.contains('abierto')) { cerrar(); btn.focus(); }
    });
  }

  /* ---------- Servicios: la foto cambia según el grupo ---------- */
  const fotoGrupo = d.querySelector('[data-foto-grupo]');
  if (fotoGrupo) {
    const FOTOS = { dona: 'rizos-sueltos', home: 'caballero-nuca', menuts: 'flequillo-nena' };
    let actual = 'dona';
    const poner = (g) => {
      if (g === actual || !FOTOS[g]) return;
      actual = g;
      fotoGrupo.classList.add('cambiando');
      setTimeout(() => {
        fotoGrupo.src = `/assets/img/${FOTOS[g]}-800.webp`;
        fotoGrupo.onload = () => fotoGrupo.classList.remove('cambiando');
      }, 180);
    };
    d.querySelectorAll('[data-grupo]').forEach((g) => {
      g.addEventListener('mouseenter', () => poner(g.dataset.grupo));
      g.addEventListener('focusin', () => poner(g.dataset.grupo));
    });
    // precarga solo cuando el ratón se acerca a la lista (en móvil no se usa esta foto)
    d.querySelector('.servicios__listas')?.addEventListener('pointerenter', () => {
      Object.values(FOTOS).forEach((f) => { const i = new Image(); i.src = `/assets/img/${f}-800.webp`; });
    }, { once: true });
  }

  /* ---------- Espejo de mano: lupa ovalada ---------- */
  const ZOOM = 2.4;
  d.querySelectorAll('[data-espejo]').forEach((fig) => {
    const img = fig.querySelector('img');
    if (!img) return;
    const lupa = d.createElement('span');
    lupa.className = 'lupa';
    lupa.setAttribute('aria-hidden', 'true');
    // fuera de la ventana: su máscara recortaría la lupa en los bordes
    const caja = fig.closest('figure') || fig;
    caja.appendChild(lupa);

    const mover = (ev) => {
      const r = img.getBoundingClientRect();
      const fr = caja.getBoundingClientRect();
      const x = Math.min(Math.max(ev.clientX - r.left, 0), r.width);
      const y = Math.min(Math.max(ev.clientY - r.top, 0), r.height);
      const lw = lupa.offsetWidth, lh = lupa.offsetHeight;
      lupa.style.left = `${ev.clientX - fr.left}px`;
      lupa.style.top = `${ev.clientY - fr.top - (ev.pointerType === 'touch' ? lh * 0.7 : 0)}px`;
      lupa.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
      lupa.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
      lupa.style.backgroundPosition = `${-(x * ZOOM - lw / 2 + 7)}px ${-(y * ZOOM - lh / 2 + 7)}px`;
    };
    const mostrar = (ev) => { mover(ev); lupa.classList.add('visible'); };
    const ocultar = () => lupa.classList.remove('visible');

    fig.addEventListener('pointerenter', (ev) => { if (ev.pointerType === 'mouse') mostrar(ev); });
    fig.addEventListener('pointermove', (ev) => { if (lupa.classList.contains('visible')) mover(ev); });
    fig.addEventListener('pointerleave', ocultar);
    // en táctil: mantener pulsado
    let t;
    fig.addEventListener('pointerdown', (ev) => {
      if (ev.pointerType !== 'touch') return;
      t = setTimeout(() => mostrar(ev), 220);
    });
    ['pointerup', 'pointercancel'].forEach((n) => fig.addEventListener(n, (ev) => {
      clearTimeout(t);
      if (ev.pointerType === 'touch') ocultar();
    }));
    fig.addEventListener('contextmenu', (ev) => { if (lupa.classList.contains('visible')) ev.preventDefault(); });
  });
  const pista = d.querySelector('[data-pista-espejo]');
  if (pista && matchMedia('(hover: none)').matches) pista.textContent = 'Mantén el dedo sobre una foto para verla de cerca, como en el espejo de mano.';

  /* ---------- Aparición suave de las ventanas ---------- */
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const els = d.querySelectorAll('main .ventana:not(.ventana--hero), .grupo, .huecos li, .cita, .antes li');
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('visto'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight) return; // lo que ya se ve, no se anima
      el.classList.add('aparece');
      io.observe(el);
    });
  }

  d.querySelectorAll('[data-anyo]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
