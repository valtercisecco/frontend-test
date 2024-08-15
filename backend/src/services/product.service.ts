import { productsData } from "../db";
import { IProductService } from "../interfaces";

export class ProductService implements IProductService {
  findAllProducts() {
    return productsData;
  }
}
