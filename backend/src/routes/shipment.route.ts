import { Router } from "express";
import { shipmentController } from "../factories/shipment-controller.factory";

const router = Router();

router.get("/", (req, res) => {
  const shipments = shipmentController.findAllShipments();
  res.json(shipments);
});
router.get("/:id", (req, res) => {
  const shipment = shipmentController.findShipmentById(req.params.id);
  res.json(shipment);
});
router.post("/", (req, res) => {
  try {
    const shipment = shipmentController.createShipment(req.body);
    res.json(shipment);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export const shipmentRouter = router;
