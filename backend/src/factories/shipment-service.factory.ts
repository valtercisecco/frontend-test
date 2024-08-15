import { IShipmentService } from "../interfaces";
import { ShipmentService } from "../services";

class ShipmentServiceFactory {
  public readonly shipmentService: IShipmentService;

  constructor() {
    this.shipmentService = new ShipmentService();
  }
}

export const { shipmentService } = new ShipmentServiceFactory();
