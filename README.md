# GAUZA Arquitectura y Construcción — gauza.cl

Sitio web de GAUZA (Villa Alemana, Región de Valparaíso), desarrollado por [Tu Plan Digital](https://tuplandigital.cl). Su objetivo es **convertir visitas en consultas por WhatsApp**: cada sección termina en una acción y el cotizador arma el mensaje con el trámite, la comuna y el tipo de propiedad.

Hecho en **Astro + Tailwind CSS**: el resultado es HTML estático, rápido y sin JavaScript de terceros.

## Trabajar en local

```bash
npm install
npm run dev       # http://localhost:4321
npm test          # tests de los enlaces y mensajes de WhatsApp (node --test)
npm run build     # genera dist/
npm run check     # tests + build (lo mismo que corre en cada pull request)
```

Requiere Node 22.18 o superior (los tests se ejecutan en TypeScript sin compilar).

## Dominio y vista previa al compartir

`astro.config.mjs` define el dominio público: usa `SITE_URL` si existe; si no, el dominio de producción de Vercel (`gauza-web.vercel.app`). Así la imagen de `public/og.jpg` siempre carga al compartir el enlace por WhatsApp, aunque gauza.cl todavía no esté conectado.

## Estructura

```
src/
  data/site.ts          datos del negocio: WhatsApp, teléfono, correo, dirección, comunas, menú
  data/content.ts       servicios, proyectos (antes/después), pasos del proceso y preguntas frecuentes
  lib/whatsapp.ts       funciones puras para armar enlaces y mensajes de WhatsApp (con tests)
  layouts/Base.astro    <head>: SEO, Open Graph y datos estructurados (ProfessionalService y FAQPage)
  components/           una sección por archivo (Header, Hero, Quote, Services, Projects, …)
  scripts/main.ts       interacción: menú, aparición al hacer scroll, comparador, pestañas y cotizador
  styles/global.css     tokens de diseño (@theme) y componentes base
  assets/               logo e imágenes de los proyectos (WebP, Astro las optimiza en el build)
public/                 favicon, og.jpg, robots.txt, sitemap.xml
scripts/og-image.py     genera public/og.jpg (requiere Pillow)
tests/                  node --test
vercel.json             headers de seguridad (CSP) y caché
```

## Dónde cambiar cosas

| Qué | Dónde |
| --- | --- |
| WhatsApp, teléfono, correo, dirección | `src/data/site.ts`. Todo el sitio y el JSON-LD leen de ahí. |
| Servicios, proyectos, pasos, preguntas | `src/data/content.ts`. Las preguntas se publican también como `FAQPage` automáticamente. |
| Opciones del cotizador | `needs` y `communes` en `src/data/site.ts`. |
| Colores, tipografías, radios, sombras | `@theme` en `src/styles/global.css`. Ningún otro archivo define colores. |
| Nuevo proyecto antes/después | Dos imágenes WebP del mismo tamaño en `src/assets/proyectos/` y una entrada en `projects`. |

## Convenciones

- **Tokens primero**: colores (`wine`, `ink`, `paper`, `sand`, `line`), tipografías (`font-display` para títulos, `font-sans` para texto) y movimiento (`--ease-out-soft`) salen de `@theme`.
- **CSS antes que JavaScript**: transiciones, hover, menú y acordeón son CSS. El JavaScript solo agrega estado (abrir/cerrar, pestañas, comparador) y todo funciona sin él (mejora progresiva).
- **Sin estilos ni scripts en línea**: la CSP de `vercel.json` solo permite archivos propios. Por eso el escalonado de animaciones usa `data-i` y Astro está configurado para no incrustar CSS ni JS.
- **Menú móvil**: se despliega bajo el encabezado fijo, sin bloquear el scroll del body; abrir o cerrar nunca mueve la página. Se cierra con Escape, al tocar fuera o al elegir una sección.
- **Movimiento reducido**: todas las animaciones se desactivan con `prefers-reduced-motion`.
- **Ramas**: `main` es lo publicado y `development` donde se integra. Cada cambio en su rama desde `development` (`feature/…`, `fix/…`) con pull request hacia `development`.
- **Commits** con prefijo (`feat:`, `fix:`, `docs:`, `chore:`) y cambios visibles en `CHANGELOG.md`.

## Antes de publicar (pendiente de confirmar con GAUZA)

- [ ] Correo de contacto: hoy `gauza.arquitectura@gmail.com` (en 2020 usaban `admin@gauza.cl`).
- [ ] Dirección de la oficina: `Santiago 710, oficina 206, Villa Alemana` (publicada en 2020).
- [ ] Imágenes en buena resolución: las actuales son recortes de Instagram (546 px) y sirven solo para la propuesta.
- [ ] Enlace de Facebook («GAUZA Arquitectura y Construcción») para el pie y el JSON-LD.
- [ ] Respuestas de las preguntas frecuentes y datos de cada proyecto.
- [ ] Dominio gauza.cl apuntando a Vercel y la variable `SITE_URL=https://gauza.cl` en el proyecto (canónica, Open Graph y JSON-LD); luego enviar el sitemap en Google Search Console.

## Estándar de calidad

Se revisa con el [estándar de Tu Plan Digital](https://github.com/bohaz/tu-plan-digital-web/blob/development/docs/estandar-de-calidad.md): un `h1` y una acción principal visible sin scroll, escala tipográfica y de espaciado, imágenes con `alt`, `width` y `height`, áreas táctiles de 44 px, sin scroll horizontal en 390, 1000 y 1366 px, foco visible, HTML semántico, datos estructurados y sin errores de consola.
