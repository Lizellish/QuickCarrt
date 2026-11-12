// demoData.
// Turns the demo data files (categories.ts, product.ts) into records shaped like the models, ready for seeds.ts to save. Nothing here talks to MongoDB

import { Types } from "mongoose";
import { PHOTO_FOLDER, photoUrl } from "../config/cloudinary";
import { categories } from "./categories";
import { products, SeedProduct } from "./product";
import { slugify } from "../utils/slugify";

// next: Step 12 : Put the demo data in the database (part 1: shape the records)
// the data files use slugs and simple names: the database need to real ids, full photo address and every field the model expect. theses functions do that translation

// -------- Star rating breakdown ---------------------------------------
// the product page shows bars for 5, 4, 3, 2, and 1 stars. when product.ts dosent give ratingCounts, we make belivable ones for the avarage rating.
// Each row: "if the rating is atleats Minrating, Split the review like this (persent.)"

const RATING_SHARE = [
  { minRating: 4.7, shares: [80, 14, 4, 1, 1] },
  { minRating: 4.4, shares: [65, 22, 8, 3, 2] },
  { minRating: 4.7, shares: [50, 20, 12, 6, 4] },
  { minRating: 4.7, shares: [35, 30, 30, 10, 7] },
];

// makeRatingCounts(4.8, 248) -> [199, 35, 10, 2, 2] (adds up to exactly 248)

export const makeRatingCount = (
  rating: number,
  reviewCount: number,
): number[] => {
  const { shares } = RATING_SHARE.find((row) => {
    return rating >= row.minRating;
  })!;

  const counts = shares.map((share) => {
    return Math.round((reviewCount * share) / 100);
  });

  // Rounding can leave us 1 or 2 off, given the diffrent to the star bar

  const total = counts.reduce((sum, count) => {
    return sum + count;
  }, 0);

  counts[0] += reviewCount - total;

  return counts;
};

// --- Photos ----------
// from All photo ids on cloudinary, pick this products ones ("<slug>-1, "<slug>-2" ....)

// put them in number order, and turn them  into full addresses.
export const photosFor = (slug: string, photoIds: string[]): string[] => {
  const prefix = `${PHOTO_FOLDER} /${slug}-`;

  return photoIds
    .filter((id) => {
      return id.startsWith(prefix) && /^\d+$/.test(id.slice(prefix.length));
    })

    .sort((a, b) => {
      return Number(a.slice(prefix.length)) - Number(b.slice(prefix.length));
    })
    .map(photoUrl);
};

// ------Categories--------------------------
// categories.ts already shaped like the caetgory, model, so we hand it over as it is.

export const demoCategories = () => {
  return categories;
};

// -------Products --------------------------------
// one product from products.ts -> one record shape like the product model.
// bundle and related are left out here: they point to other products, which dont have ids untill they are saved seed.ts links them afterwards (STEP 13 )

const buildProduct = (
  item: SeedProduct,
  categoryId: Types.ObjectId,
  photoIds: string[],
) => {
  const slug = slugify(item.name);

  return {
    name: item.name,
    slug,
    description: item.description,
    tagline: item.tagline,
    priceNote: item.priceNote,
    features: item.features ?? [],
    specs: item.specs ?? [],
    category: categoryId,
    brand: item.brand,
    sku: item.sku,
    price: item.price,
    oldPrice: item.oldPrice,
    costPrice: Math.round(item.price * 0.6), // pretend the shop paid 60% (admin margin display)
    trackStock: true,
    stock: item.stock,
    lowStockThreshold: 10,
    images: photosFor(slug, photoIds),
    gallery: [], // empty = the product page uses images
    colors: item.colors ?? [],
    tags: item.tags ?? [],
    badge: item.badge,
    highlights: item.highlights ?? [],
    ratings: item.rating, // products.ts says "rating", the model says "ratings"
    reviewCount: item.reviewCount,
    ratingCounts:
      item.ratingCounts ?? makeRatingCount(item.rating, item.reviewCount),
    sold: item.sold ?? item.reviewCount * 4,
    flashSaleStock: item.flashSaleStock,
    status: "published" as const,
  };
};

// All 40 products. categoryIds maps a catergory slug to its saved _id,

// e.g "electronics" -> ObjectId("665f.....")

export const demoProducts = (
  categoryIds: Map<string, Types.ObjectId>,
  photoId: string[],
) => {
  return products.map((item) => {
    const categoryId = categoryIds.get(item.category);

    // a Typo in in products.ts e.g ("electronic") should stop the seed loudly, not save bad category
    if (!categoryId) {
      throw new Error(
        `"${item.name}" has an unkown category: "${item.category}"`,
      );
    }

    return buildProduct(item, categoryId, photoId);
  });
};
