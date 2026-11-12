// Local matching for Singapore Food Quick Look. Runs only in the popup; nothing is sent anywhere.
// FOOD_DATA comes from data.js. Aliases there are our own matching help, not SG FoodID data.

// Spellings that mean the same thing at the stall. Applied to the search and to every name alike.
const CANON = [
  [/ (siew|sui|siu) (dai|tai) /g, " siu dai "],
  [/ less (sugar|sweet) /g, " siu dai "],
  [/ no sugar /g, " kosong "],
  [/ (peng|ice) /g, " iced "],
  [/ (bee hoon|bihun|bee hon) /g, " beehoon "],
  [/ (kuey|kuay|koay|kueh) teow /g, " kway teow "],
  [/ (kuey|kuay|koay) /g, " kway "],
  [/ (kuih|kue) /g, " kueh "],
  [/ (won ton|wonton|wan tan|wantan|wan ton) /g, " wanton "],
  [/ fish ball /g, " fishball "],
  [/ beef ball /g, " beefball "],
  [/ (char siu|cha siu|cha shao) /g, " char siew "],
  [/ economy /g, " economic "],
  [/ (biryani|beriani|briani) /g, " briyani "],
  [/ sate /g, " satay "],
  [/ noodles /g, " noodle "],
  [/ prawns /g, " prawn "],
  [/ (dosa|tosai) /g, " thosai "],
  [/ cendol /g, " chendol "],
  [/ (tau huay|tau hway|dou hua) /g, " tau huey "],
  [/ soya /g, " soy "],
  [/ (congee|jook) /g, " porridge "],
  [/ omelet /g, " omelette "],
  [/ kopio /g, " kopi o "],
  [/ kopic /g, " kopi c "],
  [/ teho /g, " teh o "],
  [/ tehc /g, " teh c "]
];

// Words that change the drink or dish. When the search carries one, a record is shown only if its
// own name or alias carries it too, so "milo kosong" never shows plain Milo.
const MODIFIERS = new Set(["kosong", "siu", "dai", "gao", "po", "gah", "iced", "c", "o", "halia", "tarik", "limau", "dinosaur", "godzilla", "dry"]);
const CJK_MODIFIERS = ["少甜", "少糖", "无糖", "走糖", "冰", "乌", "加浓", "浓", "淡", "干"];
const STOP = new Set(["with", "and", "or", "the", "a", "an", "of", "in", "pc", "pcs", "s"]);
const CJK = /[㐀-鿿豈-﫿]/;

function normalise(value) {
  let s = String(value || "").normalize("NFKC").toLocaleLowerCase("en-SG");
  s = s.replace(/s?\$\s*\d+(?:\.\d+)?/g, " ").replace(/\d+\.\d+/g, " ");
  s = s.replace(/[^a-z0-9㐀-鿿豈-﫿]+/g, " ");
  s = ` ${s.replace(/\s+/g, " ").trim()} `;
  for (const [pattern, replacement] of CANON) {
    s = s.replace(pattern, replacement).replace(pattern, replacement);
  }
  return s.replace(/\s+/g, " ").trim();
}

function prepare(value) {
  const text = normalise(value);
  const tokens = text.split(" ").filter((t) => t && !STOP.has(t) && !CJK.test(t));
  const cjk = text.replace(/[^㐀-鿿豈-﫿]/g, "");
  return { text: tokens.join(" "), tokens, cjk };
}

let FOOD_INDEX = null;
function foodIndex() {
  if (FOOD_INDEX) return FOOD_INDEX;
  FOOD_INDEX = FOOD_DATA.map((food) => {
    const open = food.name.indexOf("(");
    const qualifier = open >= 0 ? food.name.slice(open) : "";
    const strings = [food.name, ...food.aliases.map((alias) => `${alias} ${qualifier}`)];
    return { food, candidates: strings.map(prepare) };
  });
  return FOOD_INDEX;
}

function tokenMatches(queryToken, candidateTokens) {
  return candidateTokens.some((t) => t === queryToken || (queryToken.length >= 3 && t.startsWith(queryToken)));
}

function modifiersKept(q, candidate) {
  for (const t of q.tokens) if (MODIFIERS.has(t) && !candidate.tokens.includes(t)) return false;
  for (const m of CJK_MODIFIERS) if (q.cjk.includes(m) && !candidate.cjk.includes(m)) return false;
  return true;
}

function findFoods(query) {
  const q = prepare(query);
  if (!q.cjk && q.text.replace(/ /g, "").length < 2) return [];
  if (!q.cjk && !q.tokens.length) return [];
  const hits = new Map();
  const keep = (food, rank, length) => {
    const seen = hits.get(food.id);
    if (!seen || rank < seen.rank || (rank === seen.rank && length < seen.length)) hits.set(food.id, { food, rank, length });
  };
  for (const { food, candidates } of foodIndex()) {
    for (const c of candidates) {
      if (q.tokens.length && !q.tokens.every((t) => tokenMatches(t, c.tokens))) continue;
      if (q.cjk && !c.cjk.includes(q.cjk)) continue;
      let rank = 2;
      if (c.text === q.text && c.cjk === q.cjk) rank = 0;
      else if (` ${c.text} `.includes(` ${q.text} `) && c.cjk.includes(q.cjk)) rank = 1;
      keep(food, rank, c.text.length + c.cjk.length);
    }
  }
  if (!hits.size) {
    // Highlighted menu text often carries extra words ("Signature roasted chicken rice (large)").
    // Then show the records whose whole name sits inside the text, longest names only.
    let best = 0;
    const found = [];
    for (const { food, candidates } of foodIndex()) {
      for (const c of candidates) {
        if (!c.tokens.length && !c.cjk) continue;
        if (!c.tokens.every((t) => q.tokens.includes(t))) continue;
        if (c.cjk && !q.cjk.includes(c.cjk)) continue;
        if (!c.cjk && c.text.replace(/ /g, "").length < 4) continue;
        if (!modifiersKept(q, c)) continue;
        const size = c.tokens.length + c.cjk.length;
        found.push({ food, size, length: c.text.length + c.cjk.length });
        best = Math.max(best, size);
      }
    }
    for (const f of found) if (f.size === best) keep(f.food, 3, f.length);
  }
  return [...hits.values()]
    .sort((a, b) => a.rank - b.rank || a.length - b.length || a.food.name.localeCompare(b.food.name, "en-SG"))
    .map((hit) => hit.food);
}

function labelKcal(per100g, grams) {
  if (String(per100g).trim() === "" || String(grams).trim() === "") return null;
  const p = Number(per100g);
  const g = Number(grams);
  if (!Number.isFinite(p) || !Number.isFinite(g) || p < 0 || p > 1000 || g <= 0 || g > 5000) return null;
  return Math.round(p * g / 100);
}
