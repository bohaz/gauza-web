import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizePhone, waUrl, quoteMessage } from "../src/lib/whatsapp.ts";

test("normalizePhone deja solo dígitos", () => {
  assert.equal(normalizePhone("+569 9238 1743"), "56992381743");
  assert.equal(normalizePhone("(22) 791-9778"), "227919778");
});

test("waUrl sin texto abre el chat vacío", () => {
  assert.equal(waUrl("+56992381743"), "https://wa.me/56992381743");
  assert.equal(waUrl("+56992381743", "   "), "https://wa.me/56992381743");
});

test("waUrl codifica tildes, signos y espacios", () => {
  const url = waUrl("+56992381743", "¿Cuánto vale regularizar?");
  assert.equal(url, "https://wa.me/56992381743?text=%C2%BFCu%C3%A1nto%20vale%20regularizar%3F");
});

test("quoteMessage con todos los datos", () => {
  assert.equal(
    quoteMessage({ need: "Regularizar lo construido", commune: "Quilpué", property: "Urbana" }),
    "Hola GAUZA, quiero cotizar: regularizar lo construido en Quilpué (propiedad urbana). ¿Me pueden orientar sobre los pasos y el valor?"
  );
});

test("quoteMessage omite los campos vacíos", () => {
  assert.equal(
    quoteMessage({ need: "", commune: "Limache" }),
    "Hola GAUZA, quiero cotizar en Limache. ¿Me pueden orientar sobre los pasos y el valor?"
  );
  assert.equal(
    quoteMessage({}),
    "Hola GAUZA, quiero cotizar. ¿Me pueden orientar sobre los pasos y el valor?"
  );
});
