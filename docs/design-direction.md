# Dirección creativa — Silvia Perruqueria Home i Dona

## Concepto: «Vista de nuca»

Todo el trabajo que Silvia publica está fotografiado **de espaldas**. Un recogido, una trenza o un buen corte de caballero se juzgan por detrás, y la persona peinada solo lo ve un momento: cuando la peluquera levanta el **espejo de mano** a su espalda.

La web se construye alrededor de esa idea:

- **Todas las fotos son de nuca o de espalda.** Nunca caras de frente sonriendo a cámara (lo que hace cualquier banco de imágenes de peluquería).
- **El espejo de mano** es el recurso de interacción: una lupa ovalada que deja ver de cerca horquillas, trenzas y rizos.
- **La pared roja de Sant Roc** es el soporte: la web usa los colores y las formas de la fachada real (estuco almagra, marco de piedra con remate ondulado, cristal verde), para que quien llegue a la calle reconozca el sitio.

El titular lo resume: **«La nuca también se peina.»**

## Personalidad

| Es | No es |
|---|---|
| Cercana, de pueblo, de tú | Salón «estilistas» de centro comercial |
| Detallista, artesana | Spa, wellness, estética con láser |
| Orgullosa de su calle y su pueblo | Lujo frío en negro y dorado |
| Valenciana con naturalidad | Folclórica ni traducida a la fuerza |

Tono del texto: frases cortas, concretas, de tú. Habla de pelo, horquillas, flequillos y horarios, no de «experiencias» ni de «bienestar».

## Color — sacado de la fachada

| Token | Hex | De dónde sale | Uso |
|---|---|---|---|
| `--almagra` | `#A13A33` | Estuco rojo de la pared | Fondo de cabecera, hero y bloques de marca. Texto blanco encima: 6,4:1 |
| `--almagra-fosc` | `#74251F` | La pared en sombra | Bordes, hover de botones, texto de acento sobre claro (8,6:1) |
| `--vidre` | `#2F574C` | Cristal verde esmerilado, oscurecido | Fondo de la sección de recogidos, botón principal sobre claro. Blanco encima: 7,9:1 |
| `--vidre-clar` | `#8DB5A5` | Cristal verde a pleno sol | Detalles gráficos, franjas del horario |
| `--pedra` | `#DCCCAE` | Marco de piedra de la ventana | Marcos de las fotos, filetes, horquilla (decorativo) |
| `--pedra-clar` | `#EEE5D5` | Piedra a pleno sol | Etiquetas pequeñas sobre almagra (5,3:1) y sobre vidre (6,5:1) |
| `--enlucit` | `#F6E8E0` | La pared roja descolorida por el sol | Fondo de las secciones de lectura |
| `--tinta` | `#2B1916` | Castaño oscuro del pelo | Texto sobre claro (14:1) |
| `--tinta-2` | `#5E4640` | Castaño medio | Texto secundario sobre claro (7,2:1) |
| `--retol` | `#FFFBF6` | Letrero blanco | Texto sobre almagra y vidre |

Regla: el rojo y el verde nunca se tocan sin un filete de piedra entre medias, como en la fachada.

## Tipografía

| Rol | Fuente | Por qué |
|---|---|---|
| Marca, titulares, cifras del horario | **Bodoni Moda** (variable, con eje óptico, redonda y cursiva) | Didona de revista de moda y peluquería. Sus trazos finos de pelo («hairlines») son literalmente hebras. La cursiva hace de letrero caligráfico de la fachada sin imitar una letra manuscrita falsa. |
| Texto, interfaz, etiquetas | **Hanken Grotesk** (variable) | Grotesca cálida y muy legible en móvil, con cifras claras para teléfonos y horas. Etiquetas en versalitas espaciadas, como «PELUQUERIA» en el cristal. |

Alojadas en el propio dominio (woff2, subconjunto latino). Sin Google Fonts: RGPD y rendimiento.

## Composición

- **Ventanas, no tarjetas.** Las fotos van dentro de un **marco de piedra con el remate superior ondulado**, copiado de la ventana de la fachada. Es la forma propia de la web.
- **Asimetría vertical**: las fotos de nuca son verticales; la maqueta alterna columnas estrechas de texto con ventanas altas.
- **Listas en vez de rejillas de tarjetas.** Los servicios se leen como un índice con filetes, agrupados por quién viene: *Dona*, *Home*, *Menuts* (niños).

## Elementos gráficos propios

1. **Marco ondulado** (fachada) para todas las fotografías.
2. **La horquilla**: un trazo fino en U con una pata ondulada. Marca listas, separa secciones y señala la hora actual en el horario.
3. **El horario como un peine**: cada día es una regleta de 8:00 a 20:00 con un diente por hora; las franjas abiertas se rellenan en verde. La horquilla marca el «ahora».
4. **La fachada dibujada** en «Cómo llegar»: pared roja, marco de piedra y cristal verde con «PELUQUERIA», para reconocer el local en la calle.

## Fotografía

- **Siempre de espaldas o de perfil trasero**: nuca, recogido, trenza, corte de caballero visto desde atrás.
- **Luz natural, tonos castaños y cobrizos**, que casan con el almagra.
- **Fotos de stock (Unsplash, licencia libre) solo como sustituto provisional.** Se rotulan como «foto de referencia» y la web dirige a Instagram para ver el trabajo real. No se presenta ninguna foto de stock como trabajo de Silvia.
- Cuando Silvia dé permiso, se sustituyen por sus fotos (mismos nombres de archivo en `_src/img`, `npm run images`).

Tratamiento: ligero calentamiento y contraste suave para unificar fotos de origen distinto; sin filtros de moda, sin duotonos.

## Interacción y animación

- **Espejo de mano**: en la galería de recogidos, al pasar el ratón o arrastrar el dedo sobre una foto aparece una lupa ovalada con el detalle ampliado. Es decorativa: el contenido no depende de ella.
- **Estado en vivo**: «Ahora abierto · hasta las 17:00» calculado con la hora de Madrid.
- **Animación mínima**: las ventanas suben ligeramente al entrar en pantalla (una vez). Nada se anima con `prefers-reduced-motion`.
- Sin carruseles, sin parallax, sin cursores personalizados.

## Navegación

- **Escritorio**: cabecera roja con la marca, cuatro anclas (Servicios, Recogidos, Horario, Cómo llegar) y el botón «Llamar · 634 46 36 34».
- **Móvil**: cabecera mínima con menú desplegable + **barra inferior fija** con dos botones grandes: «Llamar» y «Cómo llegar». En un móvil la acción es pulsar el teléfono; tiene que estar bajo el pulgar.

## Arquitectura

La arquitectura sale de lo que se consulta antes de ir a una peluquería de pueblo: *¿lo hace?, ¿cuándo abre?, ¿dónde está?, ¿a qué número llamo?* Más una página para lo que la diferencia: los recogidos.

### `/` Inicio
1. **Hero** — «La nuca también se peina.» Quién, dónde, para quién. Llamar + estado de hoy.
2. **Servicios** — índice por *Dona / Home / Menuts*, con los servicios verificados en las reseñas. Precio: se pregunta al pedir cita.
3. **Recogidos** (avance) — banda verde con tres ventanas, el sábado a las 8:00 y enlace a `/recogidos/`.
4. **Horario «Busca tu hueco»** — por situaciones (salgo tarde, solo tengo el mediodía, tengo un evento) + el peine semanal.
5. **Lo que dicen en Google** — dos frases reales cortas, nota y enlace a dejar reseña.
6. **Cómo llegar** — fachada dibujada, dirección, pago con tarjeta y móvil, botón a Google Maps.
7. **Pie** — NAP, redes, aviso legal, créditos de fotos.

### `/recogidos/`
1. Hero de la página: «Recogidos que se miran por detrás».
2. Tipos de recogido que aparecen en su trabajo (moño bajo, semirecogido, trenza, recogido de rizo, con flores o joya) en galería con espejo de mano.
3. «Antes de llamar, ten a mano»: fecha y hora, escote del vestido, accesorio, una foto de referencia, si tu pelo es rizado. Consejo práctico, no un servicio inventado.
4. El sábado desde las 8:00.
5. Llamar + Instagram.

### `/aviso-legal/`
Aviso legal, privacidad, cookies (la web no usa cookies), créditos de las fotografías.

### `404.html`

## Lo que la hace inconfundible

1. Colores y marco **de su propia fachada**, no de una paleta de tendencia.
2. **Fotos de nuca** como sistema, y el **espejo de mano** como interacción.
3. El **horario como peine** con horquilla, resolviendo un horario de verdad irregular.
4. Servicios **Dona / Home / Menuts**: la peluquería de toda la casa, en valenciano, como su nombre.

## Diferencias con otros proyectos de la agencia

| | Gula | El Pegolí | Portfolio | **Silvia** |
|---|---|---|---|---|
| Fondo dominante | Papel claro | Cal blanca | Papel blanco | **Rojo almagra y verde vidrio** |
| Titulares | Pincel / Barlow | Young Serif + Yellowtail | Schibsted Grotesk | **Bodoni Moda** |
| Texto | Barlow | Libre Franklin | Source Serif 4 | **Hanken Grotesk** |
| Recurso gráfico | Brochazo, reloj | Rótulo pintado, azulejo | Anotaciones a lápiz | **Marco ondulado, horquilla, peine** |
| Interacción | Reloj de servicio | — | Notas al margen | **Espejo de mano (lupa)** |
