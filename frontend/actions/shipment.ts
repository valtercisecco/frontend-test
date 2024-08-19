"use server";

import { Shipment, CreateShipmentDto } from "@/types";

export async function findAllShipments() {
    return (
        await fetch(`${process.env.API_URL}/shipments`)
    ).json() as unknown as Shipment[];
}

export async function findShipmentById(id: string) {
    return (
        await fetch(`${process.env.API_URL}/shipments/${id}`)
    ).json() as unknown as Shipment;
}

export async function createShipment(shipmentData: CreateShipmentDto) {
    return (
        await fetch(`${process.env.API_URL}/shipments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(shipmentData),
        })
    ).json() as unknown as Shipment;
}
