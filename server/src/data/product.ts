// product.ts
// Every product from the designs (shop, home & product details page) .
// product that appear on several pages under diffrent names are listed once, using the shop page name.

import {
  IProductColor,
  IProductHighlight,
  IproductSpec,
} from "../models/Product";

// The order of this list is the "Featured" order on the shop page.
// "category" is a category slug: seed.ts swaps it for the real category id.
// prices are whole naira (4500 = 45,000)
// tag used by the home page sections: feartured, flash-deal, deal, new-arrival, recommended.

export type SeedProduct = {
  name: string;
  category: string;
  brand: string;
  sku: string;
  price: number;
  oldPrice: number;
  stock: number;
  rating: number;
  reviewCount: number;
  sold?: number; // units solid; seed.ts uses reviewCounts x 4 when not set
  flashSaleStock?: number; // units offered in the flash sale
  description: string;
  tagline?: string; // on short line for small cards
  priceNote?: string; // short line under the price on small card
  badge?: string;
  features?: string[];
  colors?: IProductColor[];
  specs?: IproductSpec[];
  tags?: string[];
  gallery?: string[]; // extra photo files names in /images/products/ for the product page
  highlights?: IProductHighlight[];
  ratingCounts?: number[]; // 5, 4,3, 2, 1, star counts; seed.ts makes them up.
  bundle?: string[]; // names of "Frequently bought together products"
  related?: string[]; // names of related products
};

// step 10 (part of this step): Write the demo data
// The 40 demo products
// Main explanation: Step 10 in server/src/data/categories.ts

export const products: SeedProduct[] = [
  {
    name: "Wireless Noise-Cancelling Headphones",
    category: "electronics",
    brand: "Aura Sound Labs",
    sku: "QC-AU-9042",
    price: 40000,
    oldPrice: 60000,
    stock: 124,
    rating: 4.8,
    reviewCount: 124,
    description:
      "Immersive sound with adaptive hybrid active noise cancellation, 30-hours battery life, and plush memory foam over-ear cups. Enginnered for pure accustics clarity and supreme everyday durability",
    features: [
      " 40mm Neodymiun Drivers",

      "Bluetooth 5.3 multiPoint",
      "30h playback w/ ANC",
      "USB-C Fast fueling",
    ],

    colors: [
      { name: "Midnight Black", hex: "#1f2937" },
      { name: "Silver Frost", hex: "#cbd5el" },
      { name: "Spece Navy", hex: "#1e293b" },
    ],

    specs: [
      {
        group: "Audio & Connectivity",
        label: " Driver Size",
        value: "40mm Neodymium Custom Tuned",
      },

      {
        group: "Audio & Connectivity",
        label: " Frequency Response",
        value: "15 Hz – 40,000 Hz",
      },

      {
        group: "Audio & Connectivity",
        label: " Bluetooth Version",
        value: "v5.3 MultiPoint (2 devies simultaneouse)",
      },
      {
        group: "Audio & Connectivity",
        label: " Supported Codecs",
        value: "LDAC, AAC, SBC",
      },

      {
        group: "Audio & Connectivity",
        label: " Noise Cancellation",
        value: "Hybrid ANC with Ambient Aware Mode",
      },

      {
        group: "Power, Build & Box Contents",
        label: "Battery Life",
        value: " 30 hrs (ANC On) / 45 hrs (ANC Off)",
      },
      {
        group: "Power, Build & Box Contents",
        label: "Charging Port",
        value: "USB Type-C Fast Charge",
      },
      {
        group: "Power, Build & Box Contents",
        label: "Total Weight",
        value: "250 grams (Ultra lightweight)",
      },
      {
        group: "Power, Build & Box Contents",
        label: "Microphones",
        value: "4 Beamforming with ENC voice clarity",
      },
      {
        group: "Power, Build & Box Contents",
        label: "Included in Box",
        value: " Headphones, Hard Case, 3.5mm Aux Cable, USB-C",
      },
    ],

    tags: ["audio", "wireless", "noise-cancelling", "bluetooth", "featured"],

    gallery: [
      "Wireless headset1.jpeg",
      "Wireless headset2.jpeg",
      "Wireless headset3.jpeg",
      "Wireless headset4.jpeg",
      "Wireless headset5.jpeg",
    ],
  },
];
