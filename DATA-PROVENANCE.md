# Food reference data provenance

Version 0.2.0 bundles 757 SG FoodID records: Singapore hawker, coffee-shop and local-snack dishes and drinks. They were fetched from the Health Promotion Board's public SG FoodID service on 12 November 2026. This is a fixed snapshot, not a live HPB feed; the extension makes no network call.

## What each record holds

For each record, `data.js` keeps HPB's own values, unchanged: the SG FoodID ID, the name, the default (standard) serving and its weight in grams (millilitres for drinks), energy (kcal) and protein (g) for that serving, the source type (`Lab Analysis`, `Derived`, `Borrowed` or `NIP`) and the year of the data. The popup shows all of them on every result, with the label "SG FoodID (HPB) standard serving". A `Derived` or `Borrowed` record is not described as lab measured. The figures describe a reference serving, not the recipe or portion at any particular stall.

Records by source type: Lab Analysis 604, Derived 142, Borrowed 8, NIP 3.

## How the records were found

1. The SG FoodID web app (https://pphtpc.hpb.gov.sg/web/sgfoodid/) loads its food groups and food lists from `https://pphtpc.hpb.gov.sg/bff/v1/food-portal/`. We read the group list (`foods/groups`), then every page of each relevant subgroup's list (`foods?pageNumber=…&foodGroupId=…&foodSubGroupId=…`, 25 records a page). No ID was guessed.
2. From those lists we chose local dishes and drinks as sold at hawker centres and coffee shops: Chinese, Malay, Indian, Peranakan and Indonesian-Malay dishes, local snacks and desserts, and drinks made at the stall (kopi, teh, Milo, soy milk, barley, chrysanthemum and other herbal drinks, fresh juice). Japanese, Korean, Thai, Vietnamese, Western, fast-food, cafe, bubble tea, packaged and sachet items were left out. 761 IDs were chosen.
3. The full records came from the comparison endpoint, `foods/compare?crIds=…`, 10 IDs per call, at least one second between calls. 77 responses were saved.
4. Four chosen records have no SG FoodID protein figure (HPB marks it -1) and are left out, because the popup shows calories and protein together: D05010070 Ginseng chrysanthemum drink, D09020133 Iced Teh O, D09020134 Iced Teh O kosong, D09020140 Iced Teh O siu dai.

In all, 160 calls were made to the data service (1 group list, 81 list pages, 78 comparison calls, one of which was refused because it held a single ID and was repeated with two), plus 5 requests for the web app's own page files. There was no 403, 429 or bot check, and the User-Agent was never changed. Each raw response is saved with its SHA-256 in the GetLean project evidence; the hash list itself has SHA-256 `238915b5f5c7642ce5b936715a3e4f903526486a71c72635102744dc9625c5b8`.

## Records by SG FoodID subgroup

| Subgroup | Records |
| --- | ---: |
| Noodle/Pasta-based dishes | 100 |
| Rice-based dishes | 91 |
| Local ethnic snacks | 74 |
| Bread-based dishes | 54 |
| Pork-based dishes | 47 |
| Vegetable-based dishes | 47 |
| Chicken-based dishes | 38 |
| Fish-based dishes | 29 |
| Seafood-based dishes | 29 |
| Tea and related drinks | 26 |
| Soup desserts | 24 |
| Mutton-based dishes | 21 |
| Coffee | 16 |
| Egg-based dishes | 15 |
| Beef-based dishes | 14 |
| Soy-based dishes | 14 |
| Customisable mixed dishes | 13 |
| Jellies and puddings | 11 |
| Legume-based dishes | 11 |
| Soy milk | 10 |
| Malted and chocolate drinks | 10 |
| Asian and herbal drinks | 10 |
| Pies and pastries | 10 |
| Batter-based dishes | 9 |
| Pancakes, waffles and dough-based snacks | 9 |
| Ice confections | 7 |
| Duck-based dishes | 7 |
| Breads and flatbreads | 5 |
| Juice drinks | 5 |
| Grain-based dishes | 1 |
| **Total** | **757** |

The ten records bundled in version 0.1.0 (26 October 2026) are all still included, with the same name, energy and protein.

## Local names: GetLean's matching help, not SG FoodID data

So that people can search the way they order, each record may carry extra search names in English, Chinese and Malay (for example 鸡饭 and nasi ayam for chicken rice, roti telur for egg prata, cai png for economic rice). These aliases, the common spelling variants (kuey teow, siew dai, peng) and the matching rules are written by GetLean. They are not part of SG FoodID and change no figure.

An ordering word such as "kosong", "siu dai", "gao" or "peng" shows a figure only when SG FoodID has that exact record. For example, "kopi siew dai" finds Kopi siu dai and "kopi peng" finds Iced Kopi, but "milo kosong" and "kopi gao" find nothing, because SG FoodID has no such record. The popup never shows a sweeter drink for an unsweetened order.

## Licence and attribution

**Specific data licence:** [SG FoodID Terms of Use PDF](https://file.go.gov.sg/termsofuse-hpbsgfoodid.pdf), re-checked 12 November 2026 and unchanged since 26 October 2026 (SHA-256 `a3ebebb5cb2a6b19731507c1fed2696a8b723ba30144e0d734e2b228bdd917ef`). Section 10 grants a worldwide, perpetual, royalty-free, non-exclusive licence to use, copy, distribute, modify and adapt the **Data**, commercially or non-commercially, and bars suggestions of HPB endorsement. Section 11 requires conspicuous acknowledgement of the data source and a link to the current licence. The popup has both. Other HPB materials and third-party rights are outside this clearance.

**Attribution notice:** Contains information from Singapore Food Insights Database (SG FoodID) accessed on 12 November 2026 from Health Promotion Board, made available under the [SG FoodID Terms of Use](https://file.go.gov.sg/termsofuse-hpbsgfoodid.pdf). The data is provided as is and has inherent limitations. HPB does not endorse this extension.
