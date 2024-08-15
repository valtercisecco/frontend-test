import { IProductController, IProductService } from "../interfaces";

export class ProductController implements IProductController {
  constructor(private productService: IProductService) {}

  findAllProducts() {
    return this.productService.findAllProducts();
  }
}
