"use client";
import { useGetAllFurnituresQuery } from "@/app/services/furnitureApi";
import { useGetCustomersQuery } from "@/app/services/customersApi";

export default function GlobalDataLoader() {
  useGetCustomersQuery();
  useGetAllFurnituresQuery();

  return null;
}
