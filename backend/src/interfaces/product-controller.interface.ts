import { Product } from "../types";

export interface IProductController {
  findAllProducts(): Product[];
}
