// routes/index.ts
// Join all the files together; app.ts puts these under /api
import accountRoutes from "./accountRoutes";
import { Router } from "express";
import categoryRoutes from "./categoryRoutes";
import promoRoutes from "./promoRoute";
import productRoutes from "./productRoutes";
import orderRoutes from "./orderRoutes";
import reviewRoutes from "./reviewRoutes";
import newsletterRoutes from "./newsletterRoutes";
import adminRoutes from "./adminRoutes";
const router = Router();

// Get /api/health: a quick check that the API is running
router.get("/health", (_req, res) =>
  res.json({ status: "ok", message: "QuickCart API is running" }),
);

router.use("/categories", categoryRoutes); // /api/categories...
router.use("/account", accountRoutes); // /api/account...
router.use("/products", productRoutes); // /api/products
router.use("/promo-codes", promoRoutes); // /api/promo-codes...
router.use("/orders", orderRoutes); // /api/orders...
router.use("/reviews", reviewRoutes); // /api/reviews...
router.use("/newsletter", newsletterRoutes); // /api/newsletter...
router.use("/admin", adminRoutes); // /api/admin... (admins only)
export default router;

// NEXT STEP 6: Start the server => server/src/server.ts
