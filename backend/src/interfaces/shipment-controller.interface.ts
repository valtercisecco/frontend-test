import { CreateShipmentDto, Shipment } from "../types/shipment";

export interface IShipmentController {
  createShipment(shipment: CreateShipmentDto): void;
  findAllShipments(): Omit<Shipment, "products">[];
  findShipmentById(id: string): Shipment | undefined;
}
