import { InventoryMaterial } from "../types/InventoryMaterial";

export const mock_INVENTORY_MATERIALS: InventoryMaterial[] = [
  {
    inventoryMaterialId: 1,
    name: "RH",
    sizes: [
      { width: 2420, height: 1020, thickness: 15 },
      { width: 2420, height: 1220, thickness: 18 },
    ],
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Negro", hex: "#000000" },
    ],
  },
  {
    inventoryMaterialId: 2,
    name: "Melamina",
    sizes: [
      { width: 2440, height: 1220, thickness: 15 },
      { width: 2440, height: 1220, thickness: 18 },
    ],
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Nogal", hex: "#8B5A2B" },
      { name: "Gris", hex: "#808080" },
    ],
  },
  {
    inventoryMaterialId: 3,
    name: "Triplex",
    sizes: [
      { width: 2440, height: 1530, thickness: 15 },
        { width: 2440, height: 1530, thickness: 18 },
    ],
    colors: [
      { name: "Natural", hex: "#D2B48C" },
      { name: "Caoba", hex: "#8B0000" },
    ],
  },
  {
    inventoryMaterialId: 4,
    name: "MDF",
    sizes: [
      { width: 2440, height: 1530, thickness: 15 },
      { width: 2440, height: 1530, thickness: 18 },
    ],
    colors: [
      { name: "Natural", hex: "#D2B48C" },
      { name: "Verde", hex: "#008000" },
    ],
  },
];
