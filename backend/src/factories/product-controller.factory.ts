import { ProductController } from "../controllers";
import { IProductController } from "../interfaces";
import { productService } from "./product-service.factory";

class ProductControllerFactory {
  public readonly productController: IProductController;

  constructor() {
    this.productController = new ProductController(productService);
  }
}

export const { productController } = new ProductControllerFactory();
