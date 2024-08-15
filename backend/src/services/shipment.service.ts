import { productsData, shipmentsData } from "../db";
import { IShipmentService } from "../interfaces";
import { CreateShipmentDto, ShipmentStatus } from "../types";

export class ShipmentService implements IShipmentService {
  createShipment(shipment: CreateShipmentDto) {
    const products = productsData.filter((product) =>
      shipment.products.includes(product.id)
    );

    if (products.length !== shipment.products.length) {
      throw new Error(
        `Produto(s) ${shipment.products
          .filter(
            (productId) => !products.some((product) => product.id === productId)
          )
          .join(", ")} não encontrado(s)`
      );
    }

    let shipmentNumber = Math.floor(Math.random() * 1000000).toString();

    while (
      shipmentsData.some(
        (shipment) => shipment.shipmentNumber === shipmentNumber
      )
    ) {
      shipmentNumber = Math.floor(Math.random() * 1000000).toString();
    }

    shipmentsData.push({
      id: shipmentsData.length.toString(),
      products,
      lastUpdate: new Date(),
      sendDate: new Date(),
      shipmentNumber,
      status: ShipmentStatus.SHIPPED,
    });
  }

  findAllShipments() {
    return shipmentsData.map(({ products, ...shipment }) => shipment);
  }

  findShipmentById(id: string) {
    return shipmentsData.find((shipment) => shipment.id === id);
  }
}
