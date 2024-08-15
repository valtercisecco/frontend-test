import { Product } from "../types";

export interface IProductService {
  findAllProducts(): Product[];
}
