import { IProductService } from "../interfaces";
import { ProductService } from "../services";

class ProductServiceFactory {
  public readonly productService: IProductService;

  constructor() {
    this.productService = new ProductService();
  }
}

export const { productService } = new ProductServiceFactory();
