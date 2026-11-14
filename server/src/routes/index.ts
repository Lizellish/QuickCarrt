// routes/index.ts
// Join all the files together; app.ts puts these under /api

import { Router } from "express";
import categoryRoutes from "./categoryRoutes";

import productRoutes from "./productRoutes";
const router = Router();

// Get /api/health: a quick check that the API is running
router.get("/health", (_req, res) =>
  res.json({ status: "ok", message: "QuickCart API is running" }),
);

router.use("/categories", categoryRoutes); // /api/categories...

router.use("/products", productRoutes); // /api/products
export default router;

// NEXT STEP 6: Start the server => server/src/server.ts
