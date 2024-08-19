"use client";

import { Button, Table } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { findAllShipments } from "@/actions/shipment";
import { Shipment, ShipmentStatus } from "@/types";

export default function ShipmentPage() {
  const router = useRouter();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await findAllShipments();
        setShipments(data);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const columns = [
    {
      title: "Shipment Number",
      dataIndex: "shipmentNumber",
      key: "shipmentNumber",
    },
    {
      title: "Send Date",
      dataIndex: "sendDate",
      key: "sendDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Last Update",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: ShipmentStatus) => status,
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products: Shipment["products"]) => products.map((product) => product.name).join(", "),
    },
  ];

  const buttonClick = () => {
    router.push("../product");
  };

  return (
    <div>
      <div>
        <Button type="primary" onClick={buttonClick}>
          Criar envio
        </Button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Table
          dataSource={shipments.map((shipment) => ({
            key: shipment.id,
            shipmentNumber: shipment.shipmentNumber,
            sendDate: shipment.sendDate,
            lastUpdate: shipment.lastUpdate,
            status: shipment.status,
            products: shipment.products,
          }))}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
}
