const query = document.getElementById("query");
const results = document.getElementById("results");
const selectionStatus = document.getElementById("selection-status");
const labelResult = document.getElementById("label-result");

function grams(value) {
  return Number(value).toLocaleString("en-SG", { maximumFractionDigits: 1 });
}

function foodCard(food) {
  const card = document.createElement("article");
  card.className = "food-card";
  const title = document.createElement("h3");
  title.textContent = food.name;
  const figures = document.createElement("p");
  figures.className = "figures";
  const energy = document.createElement("span");
  energy.className = "energy";
  energy.textContent = `${food.kcal.toLocaleString("en-SG")} kcal`;
  const protein = document.createElement("span");
  protein.className = "protein";
  protein.textContent = `${grams(food.protein)} g protein`;
  figures.append(energy, protein);
  const source = document.createElement("p");
  source.className = "source";
  source.textContent = `${food.serving}, ${grams(food.grams)} ${food.unit} · SG FoodID (HPB) standard serving · ${food.source}, ${food.year}`;
  const page = GETLEAN_PAGES[food.page];
  const link = document.createElement("a");
  link.className = "result-link";
  link.href = page.href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = page.title;
  card.append(title, figures, source, link);
  return card;
}

function showResults(value) {
  results.replaceChildren();
  const term = value.trim();
  if (!term) return;
  const matches = findFoods(term);
  const intro = document.createElement("p");
  intro.className = "hint";
  intro.textContent = matches.length
    ? `${matches.length} matching reference ${matches.length === 1 ? "serving" : "servings"}. Choose the exact preparation and portion.`
    : "Not in the list yet. Use the label calculator below.";
  results.append(intro);
  for (const food of matches) results.append(foodCard(food));
}

query.addEventListener("input", () => showResults(query.value));

document.getElementById("selection").addEventListener("click", async () => {
  selectionStatus.textContent = "Reading highlighted text…";
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error("No active tab");
    const [injection] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection()?.toString().trim().slice(0, 120) || ""
    });
    const selected = injection?.result || "";
    if (!selected) {
      selectionStatus.textContent = "Nothing highlighted on this page. Type a food name instead.";
      return;
    }
    query.value = selected;
    showResults(selected);
    selectionStatus.textContent = `Looked up: ${selected}`;
  } catch {
    selectionStatus.textContent = "This page does not allow selection lookup. Type a food name instead.";
  }
});

document.getElementById("label-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const per100 = document.getElementById("per100").value;
  const amount = document.getElementById("grams").value;
  const total = labelKcal(per100, amount);
  labelResult.textContent = total === null
    ? "Enter a valid label value (0–1,000 kcal per 100 g) and amount (over 0 to 5,000 g)."
    : `About ${total.toLocaleString("en-SG")} kcal for ${Number(amount).toLocaleString("en-SG")} g, calculated from the label you entered.`;
});
