// seed.ts
// fills the database with the demo data: npm run seed
// running it again wipes the demo collections and starts fresh, so its always safe to re-run

import mongoose, { Types } from "mongoose";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { demoCategories, demoProducts } from "./demoData";
import { listProductionPhotoIds } from "../config/cloudinary";
import { products } from "./product";
import { categories } from "./categories";
import { connectDB } from "../config/database";

// Step: 13 : The seed command

// SeedDatabase() does the work and it exported, so the demo panel can re-use it.
// The bottom of the file runs it only when ypu type npm run seed.

export const seedDatabase = async () => {
  // 1. Empty the collections (both at the same time with Promise.all)

  await Promise.all([Category.deleteMany({}), Product.deleteMany({})]);

  // 2.) Save the categories, then remember each ones id by slug: "electronics" -> ObjectId(...)

  const savedCategories = await Category.insertMany(demoCategories());
  const categoryIds = new Map<string, Types.ObjectId>(
    savedCategories.map((category) => {
      return [category.slug, category._id];
    }),
  );

  // 3. Which photos are on cloudinary?

  const photoIds = await listProductionPhotoIds();

  // 4.) Save the products
  const saveProducts = await Product.insertMany(
    demoProducts(categoryIds, photoIds),
  );

  // 5. Link bundles and related products. products.ts uses names; we swap each name for its id.
  const productIds = new Map<string, Types.ObjectId>(
    saveProducts.map((product) => {
      return [product.name, product._id];
    }),
  );

  // ["Gold-plated 3.5mm AUX Cable", ...] -> [ObjectId(...)....]
  // A misspelt name stops the seed with a clear message instead of silentyly dropping the link

  const idsFor = (names: string[] | undefined, owener: string) => {
    return (names ?? []).map((name) => {
      const id = productIds.get(name);
      if (!id) {
        throw new Error(
          `"${owener}" link to a product that dosent exist: "${name}"`,
        );
      }
      return id;
    });
  };

  // BUlkwrite send all 40 updates to mongodb in one trip instead of 40 seperate saves

  await Product.bulkWrite(
    products.map((item) => {
      return {
        updateOne: {
          filter: { _id: productIds.get(item.name) },
          update: {
            $set: {
              boundleProducts: idsFor(item.bundle, item.name),
              relatedProducts: idsFor(item.related, item.name),
            },
          },
        },
      };
    }),
  );

  // 6. A summary for whoever ran the seed

  return {
    categories: savedCategories.length,
    products: saveProducts.length,
    withoutPhotos: saveProducts
      .filter((product) => {
        return product.images.length === 0;
      })

      .map((product) => {
        return product.name;
      }),
  };
};

// Runs when you type "npm run seed": connect, seed, report, disconnected

const runSeed = async () => {
  try {
    await connectDB();
    const result = await seedDatabase();

    console.log(
      `seeded ${result.categories} categories and ${result.products} products`,
    );

    if (result.withoutPhotos.length > 0) {
      console.log(
        "These products have no photos:",
        result.withoutPhotos.join(", "),
      );
    }
  } catch (error) {
    console.error("Seed failed: ", (error as Error).message);
    process.exitCode = 1; // tells the terminal it failed, without cutting of the discconect below
  } finally {
    await mongoose.disconnect(); // without this the command whould hang and never finish
  }
};

// "requir.main === module" is true only when this file is run directly (npm run seed)
// not when other file imports seedDatabase (the demo panel). so importing never re-seeds by accident

if (require.main === module) {
  runSeed();
}
