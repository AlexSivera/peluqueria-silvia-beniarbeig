# Informe de QA — Silvia Perruqueria Home i Dona

Fecha: 1 de octubre de 2026 · Servidor local `npm run dev` (http://localhost:4321) · Playwright (Chromium) + axe-core 4 + `npm run check`.

## 1. Qué se ha comprobado

| Área | Cómo | Resultado |
|---|---|---|
| Compila / se sirve | Web estática sin build. Las 4 páginas responden 200; una ruta inexistente devuelve 404 con `404.html` | OK |
| Enlaces e imágenes internas | `npm run check`: todas las rutas `src`, `href` y `srcset` existen; anclas `/#…` existen en inicio; iconos `<use>` definidos | OK |
| HTML | Un `h1` por página, sin ids duplicados, todas las imágenes con `alt`, `width` y `height` | OK |
| Accesibilidad automática | axe-core (WCAG 2.0/2.1 A y AA + buenas prácticas) en 4 páginas × escritorio y móvil | 0 infracciones. «Incompletos»: solo contraste de texto sobre degradados/fotos que axe no puede medir; revisados a mano |
| Contraste de la paleta | 17 pares calculados en `npm run check` | Todos ≥ 4,5:1 para texto (el «8:00» decorativo grande, 3,6:1, es texto grande) |
| Teclado | Tab desde el inicio: «Saltar al contenido» → marca → menú → llamar → CTAs. Foco visible (3 px) en claro y en oscuro | OK |
| Menú móvil | Abre/cierra, `aria-expanded` correcto, Escape cierra y devuelve el foco, se cierra al pulsar un enlace | OK |
| Sin JavaScript | Menú visible en móvil, horario completo en texto, contenido íntegro | OK |
| Responsive | 390, 768, 1024, 1280 y 1440 px. Sin desplazamiento horizontal en ningún ancho | OK |
| Barra inferior móvil | Llamar + Cómo llegar fijos bajo el pulgar; el cuerpo reserva su altura | OK |
| Estado «abierto ahora» | Calculado con hora de Madrid; probado jueves 16:xx → «Abierto ahora · hasta las 17:00», fila «Jueves · hoy» y horquilla en el peine | OK |
| Foto de servicios (escritorio) | Al pasar por *Home* y *Menuts* cambia a su foto, con fundido | OK |
| Espejo de mano | Ratón: lupa ovalada sigue al cursor con zoom 2,4×. Táctil (simulado con CDP): aparece al mantener el dedo, encima del dedo, y desaparece al soltar | OK |
| `prefers-reduced-motion` | Sin aparición animada ni scroll suave | OK (por CSS/JS) |
| Consola | Sin errores en las 4 páginas (solo el 404 esperado de la ruta inexistente) | OK |
| Rendimiento | Inicio en escritorio: ~450 KB en total (HTML 24 KB, CSS 27 KB, JS 8 KB, 3 fuentes 132 KB, imágenes WebP). Hero con `fetchpriority="high"`, resto `loading="lazy"`; fotos de servicios solo se precargan si el ratón entra en la lista | OK |
| SEO | `title`/`description` por página, canónicas, Open Graph con imagen propia 1200×630, JSON-LD `HairSalon` (dirección, coordenadas, horario, teléfono, redes) y `BreadcrumbList`, `robots.txt`, `sitemap.xml`, aviso legal `noindex` | OK |

## 2. Problemas encontrados y corregidos

1. **El pie del espejo de mano tapaba la foto principal** del hero → se movió debajo de la foto, a la derecha del espejo.
2. **La lupa se recortaba** en los bordes porque vivía dentro del marco enmascarado → ahora se añade a la `figure` exterior.
3. **Etiquetas pequeñas en piedra sobre rojo a 4,2:1** → nuevo token `--pedra-clar` (5,3:1).
4. **«Busca tu hueco» a cuatro columnas en 1024 px** partía las frases en 4 líneas → dos columnas por debajo de 1180 px.
5. **Se precargaban 150 KB de fotos de servicios** en todas las cargas, también en móvil → solo al acercar el ratón, y en WebP.
6. **Rojo y verde se tocaban** en la cabecera de `/recogidos/`, contra la regla de la dirección creativa → filete de piedra entre ambos.
7. **Pulsación larga en móvil** podía abrir el menú nativo de imagen → `touch-callout: none` en las fotos con lupa.
8. **Textos sin verificar** en el primer borrador («Silvia trabaja sola», «sin aplastar el rizo») → eliminados.

## 3. Autocrítica

**¿Parece hecha para esta empresa?** Sí. El rojo, el marco ondulado y el cristal verde salen de su fachada; las fotos de nuca salen de cómo publica ella su trabajo; Dona / Home / Menuts salen de su nombre en valenciano; el peine resuelve su horario real.

**¿Podría confundirse con otra web de la agencia?** No. El Pegolí también usa rojo, pero como letra pintada sobre cal blanca y con otra tipografía; aquí el rojo es el muro entero, con Bodoni, marcos de piedra y verde. Ninguna otra usa fotografía de espaldas, lupa ni horario en forma de peine.

**¿Componentes genéricos?** La sección de opiniones es el patrón más común. Se mantiene porque son citas reales, cortas y atribuidas, con enlace a dejar reseña (la ficha solo tiene 5). No hay tarjetas de servicios ni carrusel.

**¿El visitante entiende qué hacer?** Sí: el teléfono aparece en la cabecera, en el hero, en «Cómo llegar», en el pie y, en móvil, fijo abajo. El horario se entiende sin llamar.

**Lo más débil:** las fotos. Son de stock y, aunque se rotulan como referencia, la web gana mucho con las fotos reales de Silvia.

## 4. Pendiente antes de publicar (requiere a Silvia)

- [ ] **Permiso para usar sus fotos de Instagram/Facebook** y sustituir las de Unsplash (mismos nombres en `_src/img`, `npm run images`, actualizar créditos en el aviso legal).
- [ ] **Confirmar horario** (Google Maps y un directorio antiguo no coinciden en martes y jueves). Si cambia: `index.html` (huecos, peine, pie, JSON-LD), `recogidos/index.html` y `HORARIO` en `assets/js/site.js`.
- [ ] **NIF** para el aviso legal (marcado en amarillo).
- [ ] **Validar el texto de privacidad** (uso de los datos de la llamada).
- [ ] **¿WhatsApp en el 634 46 36 34?** Si lo tiene, añadir un botón secundario en la barra móvil.
- [ ] **¿Sigue activo el fijo 965 767 424?** No se usa en la web.
- [ ] **Dominio definitivo**: la web usa `https://www.silviaperruqueria.es` (provisional) en canónicas, OG, JSON-LD, robots y sitemap.
- [ ] Revisar la nota «5,0 · 5 reseñas» cuando cambie.
- [ ] Fuera de la web: reclamar la ficha de Google, subir fotos, marcar servicios y fusionar la ficha duplicada «PERRUQUERIA SILVIA».

## 5. Mejoras futuras

- Versión en **valenciano** (y quizá un resumen en inglés para residentes extranjeros, si Silvia atiende en inglés).
- Galería de recogidos alimentada con sus fotos reales, agrupadas por tipo.
- Probar en Safari iOS real (máscaras CSS con prefijo `-webkit-` incluidas, pero solo se ha probado Chromium).
- Lighthouse en el servidor de producción, con caché y compresión activadas.
