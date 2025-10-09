import { Furniture } from "../types/Furniture";

export const mock_FURNITURES: Furniture[] = [
  {
    furnitureId: 1,
    name: "Closet de RH",
    imageInitUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    creationDate: "2024-09-12T00:00:00.000Z", // ✅ string ISO
    status: "Disponible",
    carpenterId: 1,
    customerId: 1,
    endDate: "2024-10-12T00:00:00.000Z", // ✅ string ISO
    pieces: [],
  },
  {
    furnitureId: 2,
    name: "Closet de Melamina",
    imageInitUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    creationDate: "2025-09-12T00:00:00.000Z",
    status: "Disponible",
    carpenterId: 1,
    customerId: 1,
    endDate: "2025-10-12T00:00:00.000Z",
    pieces: [],
  },
  {
    furnitureId: 3,
    name: "Silla",
    imageInitUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    creationDate: "2025-09-12T00:00:00.000Z",
    status: "Disponible",
    carpenterId: 1,
    customerId: 1,
    endDate: "2025-10-12T00:00:00.000Z",
    pieces: [],
  },
];
