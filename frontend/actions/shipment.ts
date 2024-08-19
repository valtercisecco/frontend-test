"use server";

import { Shipment, CreateShipmentDto } from "@/types";

export async function findAllShipments() {
    return (
        await fetch(`${process.env.API_URL}/shipments`)
    ).json() as unknown as Shipment[];
}

export async function findShipmentById(id: string): Promise<Shipment> {
    const response = await fetch(`${process.env.API_URL}/shipments/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch shipment: ${response.statusText}`);
    }
    const shipment = await response.json() as Shipment;
    console.log("Fetched shipment data:", shipment);
    return shipment;
}

export async function createShipment(shipmentData: CreateShipmentDto): Promise<Shipment | string> {
    const response = await fetch(`${process.env.API_URL}/shipments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(shipmentData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create shipment: ${response.statusText}`);
    }

    const text = await response.text();
    if (text) {
        return JSON.parse(text) as Shipment;
    } else {
        return "Shipment created successfully, but no content returned from the server.";
    }
}
