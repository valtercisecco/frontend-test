import { CreateShipmentDto, Shipment } from "../types";

export interface IShipmentService {
  createShipment(shipment: CreateShipmentDto): void;
  findAllShipments(): Omit<Shipment, "products">[];
  findShipmentById(id: string): Shipment | undefined;
}
