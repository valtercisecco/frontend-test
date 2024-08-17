import { Product } from "./product";

export interface Shipment {
  id: string;
  shipmentNumber: string;
  sendDate: Date;
  lastUpdate: Date;
  status: ShipmentStatus;
  products: Product[];
}

export enum ShipmentStatus {
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface CreateShipmentDto {
  products: string[];
}
