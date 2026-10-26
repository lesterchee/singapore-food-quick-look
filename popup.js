const query = document.getElementById("query");
const results = document.getElementById("results");
const selectionStatus = document.getElementById("selection-status");
const labelResult = document.getElementById("label-result");

function showResults(value) {
  results.replaceChildren();
  const term = value.trim();
  if (!term) return;
  const matches = findFoods(term);
  const intro = document.createElement("p");
  intro.className = "hint";
  intro.textContent = matches.length
    ? `${matches.length} matching reference ${matches.length === 1 ? "serving" : "servings"}. Choose the exact preparation and portion.`
    : "No matching reference serving. Use the nutrition-label calculator below if you have the label.";
  results.append(intro);
  for (const food of matches) {
    const card = document.createElement("article");
    card.className = "food-card";
    const title = document.createElement("h3");
    title.textContent = food.name;
    const amount = document.createElement("p");
    amount.className = "energy";
    amount.textContent = `${food.kcal} kcal`;
    const detail = document.createElement("p");
    detail.textContent = `${food.serving} · SG FoodID ${food.source.toLowerCase()}, ${food.year}`;
    card.append(title, amount, detail);
    results.append(card);
  }
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
  const grams = document.getElementById("grams").value;
  const total = labelKcal(per100, grams);
  labelResult.textContent = total === null
    ? "Enter a valid label value (0–1,000 kcal per 100 g) and amount (over 0 to 5,000 g)."
    : `About ${total.toLocaleString("en-SG")} kcal for ${Number(grams).toLocaleString("en-SG")} g, calculated from the label you entered.`;
});
