/**
 * Enlaces de WhatsApp con mensaje prellenado.
 * Funciones puras: se usan en los componentes (build) y en el navegador (cotizador),
 * y están cubiertas por tests en tests/whatsapp.test.ts.
 */

/** Deja solo los dígitos del número (wa.me no acepta +, espacios ni guiones). */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/** URL de wa.me con el texto codificado. Sin texto, abre el chat vacío. */
export function waUrl(phone: string, text = ""): string {
  const base = `https://wa.me/${normalizePhone(phone)}`;
  const clean = text.trim();
  return clean ? `${base}?text=${encodeURIComponent(clean)}` : base;
}

export interface QuoteInput {
  need?: string;
  commune?: string;
  property?: string;
}

/**
 * Mensaje del cotizador. Solo incluye los datos que la persona eligió,
 * para que el mensaje se lea natural aunque deje campos en blanco.
 */
export function quoteMessage({ need, commune, property }: QuoteInput): string {
  const parts: string[] = [];
  const n = need?.trim();
  const c = commune?.trim();
  const p = property?.trim();

  let line = "Hola GAUZA, quiero cotizar";
  if (n) line += `: ${n.charAt(0).toLowerCase()}${n.slice(1)}`;
  if (c) line += ` en ${c}`;
  if (p) line += ` (propiedad ${p.toLowerCase()})`;
  parts.push(`${line}.`);
  parts.push("¿Me pueden orientar sobre los pasos y el valor?");
  return parts.join(" ");
}
