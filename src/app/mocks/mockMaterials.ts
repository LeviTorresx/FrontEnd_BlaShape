import { Material } from "../types/Material";

export const mock_MATERIALS: Material[] = [
  {
    materialId: 1,
    name: "RH",
    sizes: [
      { height: 200, width: 100, thickness: 3 },
      { height: 250, width: 120, thickness: 5 },
    ],
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Negro", hex: "#000000" },
    ],
  },
  {
    materialId: 2,
    name: "Melamina",
    sizes: [
      { width: 243, height: 183, thickness: 3 },
      { width: 244, height: 122, thickness: 7 },
    ],
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Nogal", hex: "#8B5A2B" },
      { name: "Gris", hex: "#808080" },
    ],
  },
  {
    materialId: 3,
    name: "Triplex",
    sizes: [
      { width: 244, height: 122, thickness: 3 },
      { width: 244, height: 153, thickness: 7 },
    ],
    colors: [
      { name: "Natural", hex: "#D2B48C" },
      { name: "Caoba", hex: "#8B0000" },
    ],
  },
  {
    materialId: 4,
    name: "MDF",
    sizes: [
      { width: 244, height: 122, thickness: 3 },
      { width: 244, height: 153, thickness: 7 },
    ],
    colors: [
      { name: "Natural", hex: "#D2B48C" },
      { name: "Verde", hex: "#008000" },
    ],
  },
];
