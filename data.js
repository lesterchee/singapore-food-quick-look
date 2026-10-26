// SG FoodID records read 26 Oct 2026. Exact response and terms are in docs/tickets/evidence/t823.
// Per-serving energy is a reference for the named record, not an estimate of a particular stall.
const FOOD_DATA = Object.freeze([
  { id: "F05100037", name: "Economic rice (2 meats)", serving: "1 plate (526 g)", kcal: 757, source: "Derived", year: 2026, aliases: ["economic rice", "mixed rice", "cai png"] },
  { id: "F05060057", name: "Fishball noodles (soup)", serving: "1 bowl (798 g)", kcal: 511, source: "Lab analysis", year: 2025, aliases: ["fishball noodle", "fish ball noodles"] },
  { id: "F01050005", name: "Fried egg", serving: "1 piece (39 g)", kcal: 91, source: "Lab analysis", year: 2025, aliases: ["fried egg"] },
  { id: "F05020057", name: "Kaya and butter toast", serving: "1 piece (94 g)", kcal: 376, source: "Lab analysis", year: 2025, aliases: ["kaya toast", "kaya and butter toast"] },
  { id: "D09010035", name: "Kopi", serving: "1 regular cup (250 ml)", kcal: 193, source: "Derived", year: 2026, aliases: ["kopi"] },
  { id: "D09010040", name: "Kopi O kosong", serving: "1 regular cup (250 ml)", kcal: 33, source: "Derived", year: 2026, aliases: ["kopi o kosong", "kopi kosong"] },
  { id: "F05060084", name: "Mee rebus", serving: "1 plate (619 g)", kcal: 698, source: "Lab analysis", year: 2025, aliases: ["mee rebus"] },
  { id: "F05100087", name: "Nasi lemak (chicken wing set)", serving: "1 plate (410 g)", kcal: 815, source: "Derived", year: 2026, aliases: ["nasi lemak", "chicken wing set"] },
  { id: "F05100112", name: "Roasted chicken rice", serving: "1 plate (363 g)", kcal: 643, source: "Lab analysis", year: 2025, aliases: ["roasted chicken rice", "chicken rice"] },
  { id: "F05100133", name: "Steamed chicken rice", serving: "1 plate (346 g)", kcal: 475, source: "Lab analysis", year: 2025, aliases: ["steamed chicken rice", "chicken rice"] }
]);

function normalise(value) {
  return String(value || "").toLocaleLowerCase("en-SG").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

function findFoods(query) {
  const q = normalise(query);
  if (q.length < 2) return [];
  return FOOD_DATA.filter((food) => [food.name, ...food.aliases].some((name) => {
    const n = normalise(name);
    return n.includes(q) || (q.length >= 4 && q.includes(n));
  }));
}

function labelKcal(per100g, grams) {
  if (String(per100g).trim() === "" || String(grams).trim() === "") return null;
  const p = Number(per100g);
  const g = Number(grams);
  if (!Number.isFinite(p) || !Number.isFinite(g) || p < 0 || p > 1000 || g <= 0 || g > 5000) return null;
  return Math.round(p * g / 100);
}
