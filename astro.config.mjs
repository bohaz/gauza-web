// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://gauza.cl",
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
