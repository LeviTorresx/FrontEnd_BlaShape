import { Furniture } from "@/app/types/Furniture";

export const mock_FURNITURES: Furniture[] = [
  {
    furnitureId: 1,
    carpenterId: 101,
    customerId: 201,
    creationDate: "2025-09-15T00:00:00Z",
    endDate: "2025-09-25T00:00:00Z",
    imageInitUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    name: "Mesa de comedor rústica",
    pieces: [],
    status: "FINALIZADO",
  },
  {
    furnitureId: 2,
    carpenterId: 102,
    customerId: 202,
    creationDate: "2025-09-28T00:00:00Z",
    endDate: "2025-10-12T00:00:00.000Z",
    imageInitUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    name: "Silla moderna de roble",
    pieces: [
      {
        pieceId: 1,
        ColorHex: "#ffffff",
        colorName: "Blanco",
        height: 90,
        width: 100,
        thickness: 3,
        materialName: "RH",
        quantity: 2,
        edges: { bottom: true, left: true, right: false, top: false },
      },{
        pieceId: 2,
        ColorHex: "#ffffff",
        colorName: "Blanco",
        height: 80,
        width: 100,
        thickness: 3,
        materialName: "RH",
        quantity: 2,
        edges: { bottom: true, left: true, right: false, top: false },
      },
    ],
    status: "EN_PROCESO",
  },
  {
    furnitureId: 3,
    carpenterId: 103,
    customerId: 203,
    creationDate: "2025-10-01T00:00:00Z",
    endDate: "2025-10-12T00:00:00.000Z",
    imageInitUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    name: "Armario minimalista blanco",
    pieces: [],
    status: "INICIAL",
  },
  {
    furnitureId: 4,
    carpenterId: 104,
    customerId: 204,
    creationDate: "2025-08-10T00:00:00Z",
    endDate: "2025-09-05T00:00:00Z",
    imageInitUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    name: "Cama estilo escandinavo",
    pieces: [],
    status: "FINALIZADO",
  },
];
