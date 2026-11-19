/**
 * Datos del negocio. Es la única fuente: los componentes, el JSON-LD y los enlaces
 * de WhatsApp leen de aquí. Antes de publicar, confirmar con GAUZA lo marcado con «Confirmar».
 */
import { waUrl } from "../lib/whatsapp";

export const site = {
  name: "GAUZA",
  legalName: "GAUZA Arquitectura y Construcción",
  url: "https://gauza.cl",
  title: "GAUZA Arquitectura y Construcción | Diseño, planos y permisos DOM en la 5ª Región",
  description:
    "Diseño arquitectónico, planos, regularizaciones, subdivisiones y permisos ante la DOM en Villa Alemana y la Región de Valparaíso. Cotiza tu proyecto por WhatsApp.",
  whatsapp: "+56992381743",
  whatsappLabel: "+56 9 9238 1743",
  phone: "+56227919778",
  phoneLabel: "(22) 791 9778",
  email: "gauza.arquitectura@gmail.com", // Confirmar: en 2020 usaban admin@gauza.cl
  address: {
    street: "Santiago 710, oficina 206", // Confirmar: dirección publicada en 2020
    city: "Villa Alemana",
    region: "Región de Valparaíso",
    country: "CL",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Santiago+710+Villa+Alemana+Chile",
  instagram: "https://www.instagram.com/gauza_arquitectura/",
  instagramFollowers: "10,6 mil",
  credit: { name: "Tu Plan Digital", url: "https://tuplandigital.cl" },
} as const;

export const wa = (text = "") => waUrl(site.whatsapp, text);

/** Opciones del cotizador. El texto de cada opción es el que llega en el mensaje. */
export const needs = [
  "Diseñar una vivienda nueva",
  "Ampliar o remodelar mi casa",
  "Regularizar lo construido",
  "Subdividir o fusionar un terreno",
  "Un proyecto comercial o industrial",
  "Topografía, tasación o inspección",
] as const;

/** Comunas donde GAUZA ha trabajado o declara atender (según sus publicaciones). */
export const communes = [
  "Villa Alemana",
  "Quilpué",
  "Viña del Mar",
  "Valparaíso",
  "Limache",
  "Olmué",
  "Quillota",
  "La Calera",
  "La Cruz",
  "Casablanca",
  "San Antonio",
  "Los Andes",
] as const;

export const nav = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#proceso", label: "Cómo trabajamos" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#preguntas", label: "Preguntas" },
] as const;
