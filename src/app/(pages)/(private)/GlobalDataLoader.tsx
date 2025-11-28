"use client";
import { useGetAllFurnituresQuery } from "@/app/services/furnitureApi";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { useEffect } from "react";
import { useGetCustomersQuery } from "@/app/services/customersApi";

export default function GlobalDataLoader() {
  const dispatch = useAppDispatch();
  const { data: customers } = useGetCustomersQuery();
  const { data: furnitures } = useGetAllFurnituresQuery();
  
  return null; 
}
