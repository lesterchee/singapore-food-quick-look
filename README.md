# Singapore Food Quick Look

A small Chrome extension for food reference while browsing Singapore menus. Highlight a food name on an ordinary page, open the toolbar popup and press **Use selection**, or type a name. The popup shows matching SG FoodID reference servings and their energy. A nutrition-label calculator handles foods outside the ten bundled records.

It does not send selected text or label values anywhere, save them, or request access to all websites. The only browser permissions are `activeTab` and `scripting`, needed when the user explicitly presses **Use selection**. No background process, analytics, accounts, external API, patient data, personalised calorie target or medication advice. Links open only when clicked.

## Install locally

1. Open `chrome://extensions` in Chrome and enable Developer mode.
2. Choose **Load unpacked** and select this directory.
3. Pin **Singapore Food Quick Look**. Highlight “chicken rice” on a normal web page, open the popup, then press **Use selection**. Two preparations should appear so you can pick the exact one.
4. Type “kopi” to see its two distinct database records. Type an unlisted food to see the label fallback.

Browser internal pages, the Chrome Web Store, and some protected pages do not allow extension script injection. The typed search still works on those pages.

## Data and licence

The ten records are a deliberately limited, named-reference sample of [SG FoodID](https://pphtpc.hpb.gov.sg/web/sgfoodid/), read 26 October 2026. Each has a default serving, energy, source tag and year. A `Derived` value is not a lab measurement; a `Lab analysis` value is identified separately. These values are not what any particular stall serves. The list does not mix results from the separate Yeo meal study.

SG FoodID's [specific terms of use](https://file.go.gov.sg/termsofuse-hpbsgfoodid.pdf), sections 10 and 11, permit commercial and non-commercial use, copying and distribution of the **Data**, require a conspicuous source and licence notice, and prohibit suggesting HPB endorsement. This does not grant rights to other HPB website material or third-party rights. The popup carries that notice. [`DATA-PROVENANCE.md`](DATA-PROVENANCE.md) records the ten rows, source endpoint, access date and hashes of the original licence PDF and response. Refresh facts against HPB before adding or changing entries.

The extension's original code and interface are MIT licensed (see `LICENSE`). SG FoodID Data remains under its own terms above.

## Build and test

There are no build dependencies. `manifest.json`, the four popup assets and three PNG icons can be loaded directly as an unpacked Chrome extension. To make a Store upload ZIP from this directory:

```sh
zip -j singapore-food-quick-look-0.1.0.zip manifest.json popup.html popup.css popup.js data.js icon-16.png icon-48.png icon-128.png
```

The Store ZIP intentionally contains only the eight runtime files. Before a public listing, the publisher should inspect the final ZIP, Store privacy disclosures, screenshot and official fee shown at registration. This project has not been uploaded or published. The ready-to-review drafts are `PRIVACY.md` and `STORE-LISTING.md`.

## About GetLean

GetLean Clinic is a Singapore doctor-led weight-loss programme designed to end, with a planned pace and taper. This food reference is educational and independent of any individual treatment. The only clinic link in the popup leads to a public food explainer.
