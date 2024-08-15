import { IShipmentController, IShipmentService } from "../interfaces";
import { CreateShipmentDto } from "../types";

export class ShipmentController implements IShipmentController {
  constructor(private readonly shipmentService: IShipmentService) {}

  createShipment(shipment: CreateShipmentDto) {
    return this.shipmentService.createShipment(shipment);
  }

  findAllShipments() {
    return this.shipmentService.findAllShipments();
  }

  findShipmentById(id: string) {
    return this.shipmentService.findShipmentById(id);
  }
}
