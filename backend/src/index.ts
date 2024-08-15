import "dotenv/config";
import express from "express";
import cors from "cors";
import { productRouter, shipmentRouter } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/shipments", shipmentRouter);
app.use("/products", productRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT} 🚀`)
);
