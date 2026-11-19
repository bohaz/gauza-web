/**
 * Contenido de las secciones: servicios, proyectos, proceso y preguntas.
 * Los datos de cada proyecto salen de las publicaciones de @gauza_arquitectura.
 */
import type { ImageMetadata } from "astro";
import rautenRender from "../assets/proyectos/rauten-render.webp";
import rautenObra from "../assets/proyectos/rauten-obra.webp";
import maturanaRender from "../assets/proyectos/maturana-render.webp";
import maturanaObra from "../assets/proyectos/maturana-obra.webp";
import sanIsidroRender from "../assets/proyectos/san-isidro-render.webp";
import sanIsidroObra from "../assets/proyectos/san-isidro-obra.webp";
import palmasRender from "../assets/proyectos/las-palmas-render.webp";
import palmasObra from "../assets/proyectos/las-palmas-obra.webp";
import auraRender from "../assets/proyectos/aura-render.webp";
import auraObra from "../assets/proyectos/aura-obra.webp";
import centralRender from "../assets/proyectos/central-724-render.webp";
import centralObra from "../assets/proyectos/central-724-obra.webp";

export type IconName = "plano" | "sello" | "terreno" | "dron";

export interface Service {
  id: string;
  icon: IconName;
  title: string;
  text: string;
  items: string[];
  message: string;
}

export const services: Service[] = [
  {
    id: "diseno",
    icon: "plano",
    title: "Diseño arquitectónico",
    text: "Viviendas, ampliaciones y locales pensados para tu terreno y tu forma de vivir, antes de poner el primer ladrillo.",
    items: ["Anteproyecto y planos", "Maqueta 3D y renders", "Proyectos comerciales"],
    message: "Hola GAUZA, quiero diseñar un proyecto. ¿Me pueden orientar?",
  },
  {
    id: "permisos",
    icon: "sello",
    title: "Regularización y permisos DOM",
    text: "Preparamos la carpeta, los planos y la documentación, y hacemos el seguimiento ante la Dirección de Obras.",
    items: ["Permiso de obra nueva y obra menor", "Regularizaciones", "Recepción definitiva"],
    message: "Hola GAUZA, necesito regularizar o sacar un permiso ante la DOM. ¿Me pueden orientar?",
  },
  {
    id: "subdivision",
    icon: "terreno",
    title: "Subdivisiones y fusiones",
    text: "Revisamos la situación de tu predio, urbano o rural, para que le saques el mejor provecho en una herencia o compraventa.",
    items: ["Estudio del predio", "Subdivisión y fusión", "Loteos y cambio de destino"],
    message: "Hola GAUZA, quiero subdividir o fusionar un terreno. ¿Me pueden orientar?",
  },
  {
    id: "terreno",
    icon: "dron",
    title: "Topografía, tasación e inspección",
    text: "Medimos lo construido y el terreno con precisión, también desde el aire, para partir cada proyecto sobre datos reales.",
    items: ["Levantamiento planimétrico", "Vuelos con dron", "Tasaciones e inspecciones"],
    message: "Hola GAUZA, necesito un levantamiento, tasación o inspección. ¿Me pueden orientar?",
  },
];

export interface Project {
  id: string;
  name: string;
  place: string;
  type: string;
  summary: string;
  facts: string[];
  before: { src: ImageMetadata; label: string; alt: string };
  after: { src: ImageMetadata; label: string; alt: string };
}

export const projects: Project[] = [
  {
    id: "rauten",
    name: "Vivienda Rautén",
    place: "Sector rural, Quillota",
    type: "Ampliación",
    summary: "Una casa de 1 dormitorio que creció junto a su familia, sin perder lo que ya existía.",
    facts: ["De 55 a 164 m²", "3 dormitorios y 3 baños", "Permisos ante la DOM de Quillota"],
    before: { src: rautenRender, label: "Propuesta 3D", alt: "Render de la ampliación de la vivienda Rautén" },
    after: { src: rautenObra, label: "Obra construida", alt: "Vivienda Rautén ampliada y construida, en Quillota" },
  },
  {
    id: "maturana",
    name: "Vivienda Maturana",
    place: "Sector urbano, Villa Alemana",
    type: "Vivienda nueva",
    summary: "Una casa pensada para adultos mayores: dormitorio y baño accesible en el primer piso.",
    facts: ["123 m² en dos niveles", "Albañilería y metalcon", "En recepción definitiva"],
    before: { src: maturanaRender, label: "Propuesta 3D", alt: "Render de la vivienda Maturana de dos pisos" },
    after: { src: maturanaObra, label: "Obra construida", alt: "Vivienda Maturana construida en Villa Alemana" },
  },
  {
    id: "san-isidro",
    name: "Vivienda San Isidro",
    place: "Parcela, Quillota",
    type: "Regularización",
    summary: "Medimos lo construido y lo llevamos a un anteproyecto aprobado para legalizar la obra.",
    facts: ["75 m² en metalcon", "Parcela de 5.040 m²", "Aprobado por la DOM de Quillota"],
    before: { src: sanIsidroRender, label: "Maqueta 3D", alt: "Maqueta 3D de la vivienda San Isidro" },
    after: { src: sanIsidroObra, label: "Obra construida", alt: "Vivienda San Isidro construida en una parcela de Quillota" },
  },
  {
    id: "las-palmas",
    name: "Galería Las Palmas",
    place: "Villa Alemana",
    type: "Proyecto comercial",
    summary: "Tres locales comerciales diseñados para arrendar, acogidos a la ley de copropiedad.",
    facts: ["3 locales de 40 m²", "Permiso de edificación", "DOM de Villa Alemana"],
    before: { src: palmasRender, label: "Así lo diseñamos", alt: "Modelo 3D de la Galería Las Palmas" },
    after: { src: palmasObra, label: "Así se construyó", alt: "Galería Las Palmas construida en Villa Alemana" },
  },
  {
    id: "aura",
    name: "Vivienda Aura",
    place: "Lo Orozco, Casablanca",
    type: "Levantamiento y permisos",
    summary: "Del levantamiento de lo existente a la maqueta 3D y los renders para sus permisos.",
    facts: ["118 m² aprox.", "3 dormitorios y 2 baños", "Terreno de 10.000 m²"],
    before: { src: auraRender, label: "Render", alt: "Render de la vivienda Aura con terraza de madera" },
    after: { src: auraObra, label: "Vivienda real", alt: "Vivienda Aura en el sector rural de Casablanca" },
  },
  {
    id: "central-724",
    name: "Ampliación Central 724",
    place: "Quilpué",
    type: "Segundo nivel",
    summary: "Un segundo piso con 3 dormitorios nuevos, oficina y sala de música sobre la casa original.",
    facts: ["De 2 a 5 dormitorios", "Permiso de obra menor", "Obra aprobada por la DOM"],
    before: { src: centralRender, label: "Imagen objetivo", alt: "Modelo 3D del segundo nivel de la ampliación Central 724" },
    after: { src: centralObra, label: "En obra", alt: "Ampliación Central 724 en construcción, en Quilpué" },
  },
];

export const steps = [
  {
    title: "Conversamos tu caso",
    text: "Nos cuentas qué quieres hacer y revisamos la situación de tu propiedad y la normativa que le aplica.",
  },
  {
    title: "Levantamiento y diseño",
    text: "Medimos lo existente y desarrollamos el anteproyecto con planos, maqueta 3D y renders.",
  },
  {
    title: "Ingreso a la DOM",
    text: "Armamos la carpeta con los documentos y planos, la ingresamos y respondemos las observaciones.",
  },
  {
    title: "Recepción final",
    text: "Te acompañamos hasta la recepción definitiva, para que tu obra quede en regla.",
  },
];

export const faqs = [
  {
    q: "¿Qué significa regularizar una construcción?",
    a: "Es dejar en regla ante la Dirección de Obras lo que se construyó sin permiso, como una ampliación o un segundo piso. Medimos lo existente, preparamos los planos y la carpeta, y hacemos el trámite por ti.",
  },
  {
    q: "¿Qué documentos necesito para empezar?",
    a: "Depende del trámite y de cada municipio. En la primera conversación te decimos exactamente cuáles reunir; normalmente se parte con la escritura, el certificado de dominio vigente y los planos anteriores si existen.",
  },
  {
    q: "¿Cuánto demora un permiso en la DOM?",
    a: "Los plazos dependen de cada Dirección de Obras y del tipo de proyecto. Te damos una estimación para tu caso antes de empezar y te mantenemos al tanto en cada etapa.",
  },
  {
    q: "¿Trabajan fuera de Villa Alemana?",
    a: "Sí. Tenemos proyectos en toda la Región de Valparaíso: Quilpué, Viña del Mar, Valparaíso, Limache, Quillota, Casablanca y más comunas.",
  },
  {
    q: "¿Cómo cotizo mi proyecto?",
    a: "Escríbenos por WhatsApp contándonos qué necesitas y en qué comuna está la propiedad. Con eso te orientamos sobre los pasos y el valor.",
  },
];
