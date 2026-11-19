// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

/**
 * Dominio público del sitio: define la URL canónica, Open Graph (imagen al compartir) y el JSON-LD.
 * 1. SITE_URL, si está definida (cuando gauza.cl apunte a Vercel: SITE_URL=https://gauza.cl).
 * 2. El dominio de producción de Vercel (gauza-web.vercel.app) mientras sea una propuesta.
 * 3. gauza.cl en local.
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = process.env.SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "https://gauza.cl");

export default defineConfig({
  site,
  trailingSlash: "never",
  build: {
    format: "file",
    // Sin CSS en línea: la política de seguridad (vercel.json) solo permite archivos propios.
    inlineStylesheets: "never",
  },
  vite: {
    plugins: [tailwindcss()],
    // Sin scripts ni recursos incrustados en el HTML, por la misma razón.
    build: { assetsInlineLimit: 0 },
  },
});
