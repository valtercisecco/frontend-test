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
  SHIPPED = "Enviado",
  DELIVERED = "Entregue",
  CANCELLED = "Cancelado",
}

export interface CreateShipmentDto {
  products: string[];
}
