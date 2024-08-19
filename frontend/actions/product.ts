"use server";

import { Product } from "@/types";

export async function findAllProducts() {
    return (
        await fetch(`${process.env.API_URL}/products`)
    ).json() as unknown as Product[];
}