/**
 * Interacción del sitio. Todo funciona sin este script (mejora progresiva):
 * el menú queda visible, los enlaces de WhatsApp abren un mensaje general
 * y el contenido se muestra sin animación.
 */
import { quoteMessage, waUrl } from "../lib/whatsapp";

const root = document.documentElement;
root.classList.replace("no-js", "js");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- Encabezado: fondo al hacer scroll + botón flotante ---------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const float = document.querySelector<HTMLElement>("[data-wa-float]");
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    header?.toggleAttribute("data-scrolled", y > 12);
    float?.classList.toggle("is-visible", y > 480);
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

/* ---------- Menú hamburguesa ----------
   No bloquea el scroll del body ni cambia la altura del documento:
   abrir o cerrar nunca mueve la página. */
function initMenu() {
  const button = document.querySelector<HTMLButtonElement>("[data-menu-btn]");
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!button || !nav || !menu) return;
  const desktop = window.matchMedia("(min-width: 1024px)");

  const isOpen = () => button.getAttribute("aria-expanded") === "true";
  const setOpen = (open: boolean) => {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    nav.classList.toggle("is-open", open);
    // Fuera de la vista, los enlaces del panel cerrado no reciben foco con Tab.
    if (!desktop.matches) menu.inert = !open;
  };

  button.addEventListener("click", () => setOpen(!isOpen()));
  // Al elegir una sección se cierra y el ancla hace su desplazamiento normal.
  menu.addEventListener("click", (e) => {
    if ((e.target as Element).closest("a")) setOpen(false);
  });
  document.addEventListener("click", (e) => {
    if (isOpen() && !nav.contains(e.target as Node)) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      button.focus({ preventScroll: true });
    }
  });
  // Al pasar a escritorio (giro o ventana más ancha) se cierra y el menú vuelve a ser accesible.
  desktop.addEventListener("change", () => {
    setOpen(false);
    menu.inert = !desktop.matches && !isOpen();
  });
  menu.inert = !desktop.matches;
}

/* ---------- Aparición suave al hacer scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Comparador antes/después ---------- */
function initBeforeAfter() {
  const sliders = document.querySelectorAll<HTMLElement>("[data-ba]");
  sliders.forEach((ba) => {
    const range = ba.querySelector<HTMLInputElement>("[data-ba-range]");
    if (!range) return;
    const set = () => {
      ba.classList.remove("is-hinting");
      ba.style.setProperty("--pos", `${range.value}%`);
    };
    range.addEventListener("input", set);
  });

  // Pista de uso: el primer comparador visible se mueve solo una vez.
  if (reduceMotion.matches || !("IntersectionObserver" in window)) return;
  const first = sliders[0];
  if (!first) return;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      first.classList.add("is-hinting");
      first.addEventListener("animationend", () => first.classList.remove("is-hinting"), { once: true });
      io.disconnect();
    },
    { threshold: 0.6 },
  );
  io.observe(first);
}

/* ---------- Pestañas de proyectos (patrón WAI-ARIA Tabs) ---------- */
function initTabs() {
  const group = document.querySelector<HTMLElement>("[data-tabs]");
  if (!group) return;
  const tabs = Array.from(group.querySelectorAll<HTMLButtonElement>("[data-tab]"));

  const select = (tab: HTMLButtonElement, focus = false) => {
    for (const t of tabs) {
      const active = t === tab;
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls") ?? "");
      if (panel) panel.hidden = !active;
    }
    if (focus) tab.focus({ preventScroll: true });
    // En celular la lista es un carrusel: se centra la pestaña elegida sin mover la página.
    const list = tab.parentElement;
    if (list && list.scrollWidth > list.clientWidth) {
      const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
      list.scrollTo({ left, behavior: reduceMotion.matches ? "auto" : "smooth" });
    }
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (e) => {
      const keys: Record<string, number> = {
        ArrowRight: i + 1,
        ArrowDown: i + 1,
        ArrowLeft: i - 1,
        ArrowUp: i - 1,
        Home: 0,
        End: tabs.length - 1,
      };
      if (!(e.key in keys)) return;
      e.preventDefault();
      const next = tabs[(keys[e.key] + tabs.length) % tabs.length];
      select(next, true);
    });
  });
}

/* ---------- Cotizador ---------- */
function initQuote() {
  const form = document.querySelector<HTMLFormElement>("[data-quote]");
  if (!form) return;
  const phone = form.dataset.phone ?? "";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const url = waUrl(
      phone,
      quoteMessage({
        need: String(data.get("need") ?? ""),
        commune: String(data.get("commune") ?? ""),
        property: String(data.get("property") ?? ""),
      }),
    );
    window.open(url, "_blank", "noopener");
  });
}

function init() {
  initHeader();
  initMenu();
  initReveal();
  initBeforeAfter();
  initTabs();
  initQuote();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
