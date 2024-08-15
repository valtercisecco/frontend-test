import { Router } from "express";
import { productController } from "../factories/product-controller.factory";

const router = Router();

router.get("/", (req, res) => {
  const products = productController.findAllProducts();
  res.json(products);
});

export const productRouter = router;
