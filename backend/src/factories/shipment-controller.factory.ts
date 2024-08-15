import { ShipmentController } from "../controllers";
import { IShipmentController } from "../interfaces";
import { shipmentService } from "./shipment-service.factory";

class ShipmentControllerFactory {
  public readonly shipmentController: IShipmentController;

  constructor() {
    this.shipmentController = new ShipmentController(shipmentService);
  }
}

export const { shipmentController } = new ShipmentControllerFactory();
