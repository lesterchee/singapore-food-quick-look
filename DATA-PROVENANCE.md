# Food reference data provenance

The extension bundles only these ten named SG FoodID records, fetched from HPB's public comparison endpoint on 26 October 2026. This is a fixed snapshot, not a live HPB feed. The default serving, energy, year and `Lab Analysis` versus `Derived` source type are displayed per record in the popup. A `Derived` record is not described as lab measured. The numerical data do not identify the recipe or portion at any particular stall.

| SG FoodID ID | Record | Default serving | Energy (kcal) | Source type | Year |
| --- | --- | --- | ---: | --- | ---: |
| F05100037 | Economic rice (2 meats) | 1 plate, 526 g | 757 | Derived | 2026 |
| F05060057 | Fishball noodles (soup) | 1 bowl, 798 g | 511 | Lab Analysis | 2025 |
| F01050005 | Fried egg | 1 piece, 39 g | 91 | Lab Analysis | 2025 |
| F05020057 | Kaya and butter toast | 1 piece, 94 g | 376 | Lab Analysis | 2025 |
| D09010035 | Kopi | 1 regular cup, 250 ml | 193 | Derived | 2026 |
| D09010040 | Kopi O kosong | 1 regular cup, 250 ml | 33 | Derived | 2026 |
| F05060084 | Mee rebus | 1 plate, 619 g | 698 | Lab Analysis | 2025 |
| F05100087 | Nasi lemak (chicken wing set) | 1 plate, 410 g | 815 | Derived | 2026 |
| F05100112 | Roasted chicken rice | 1 plate, 363 g | 643 | Lab Analysis | 2025 |
| F05100133 | Steamed chicken rice | 1 plate, 346 g | 475 | Lab Analysis | 2025 |

**Source endpoint:** `https://pphtpc.hpb.gov.sg/bff/v1/food-portal/foods/compare?crIds=F05020057&crIds=F01050005&crIds=D09010035&crIds=D09010040&crIds=F05100112&crIds=F05100133&crIds=F05060084&crIds=F05060057&crIds=F05100087&crIds=F05100037`. The raw response saved in the GetLean project evidence has SHA-256 `1019ffb33b60d27a9c0f9789a353b796bea160617b1b1b604fc336e35d65e71c`.

**Specific data licence:** [SG FoodID Terms of Use PDF](https://file.go.gov.sg/termsofuse-hpbsgfoodid.pdf), accessed 26 October 2026, SHA-256 `a3ebebb5cb2a6b19731507c1fed2696a8b723ba30144e0d734e2b228bdd917ef`. Section 10 grants a worldwide, perpetual, royalty-free, non-exclusive licence to use, copy, distribute, modify and adapt the **Data**, commercially or non-commercially, and bars suggestions of HPB endorsement. Section 11 requires conspicuous acknowledgement of the data source and a link to the current licence. The popup has both. Other HPB materials and third-party rights are outside this clearance.

**Attribution notice:** Contains information from Singapore Food Insights Database (SG FoodID) accessed on 26 October 2026 from Health Promotion Board, made available under the [SG FoodID Terms of Use](https://file.go.gov.sg/termsofuse-hpbsgfoodid.pdf). The data is provided as is and has inherent limitations. HPB does not endorse this extension.
