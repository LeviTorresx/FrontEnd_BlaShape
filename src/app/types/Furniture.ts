import { Cutting } from "./Cutting";
import { Piece } from "./Piece";

export const FurnitureTypes = {
  COCINA: { id: 1, label: "Cocina", value: "COCINA", ref: "bs-1ref" },
  SALA: { id: 2, label: "Mueble de sala", value: "SALA", ref: "bs-2ref" },
  NOCHERO: { id: 3, label: "Nochero", value: "NOCHERO", ref: "bs-3ref" },
  GABETER0: { id: 4, label: "Gabetero", value: "GABETER0", ref: "bs-4ref" },
  CLOSET: { id: 5, label: "Closet", value: "CLOSET", ref: "bs-5ref" },
  BAÑO: { id: 6, label: "Mueble de baño", value: "BAÑO", ref: "bs-6ref" },
  ESCRITORIO: {
    id: 7,
    label: "Escritorio",
    value: "ESCRITORIO",
    ref: "bs-7ref",
  },
  MESA: { id: 8, label: "Mesa", value: "MESA", ref: "bs-8ref" },
  SILLA: { id: 9, label: "Silla", value: "SILLA", ref: "bs-9ref" },
  OTRO: { id: 10, label: "Otro", value: "OTRO", ref: "bs-0ref" },
} as const;

export type FurnitureType = keyof typeof FurnitureTypes;

export interface Furniture {
  furnitureId: number;
  name: string;
  type: FurnitureType;
  documentURL?: string;
  imageInitURL?: string;
  imageEndURL?: string;
  creationDate: string;
  endDate: string;
  status: string;
  carpenterId: number;
  customerId: number;
  cutting: Cutting;
}

export interface FurnitureDTO {
  furnitureId?: number;
  name: string;
  document: File;
  imageInit: File;
  imageEnd: File;
  creationDate: string;
  endDate: string;
  status: string;
  carpenterId: number;
  customerId: number;
  pieces: Piece[];
}

export interface FurnitureRequest {
  furnitureId?: number;
  name: string;
  type: FurnitureType;
  document?: File;
  imageInit?: File;
  imageEnd?: File;
  creationDate: string;
  endDate: string;
  status: string;
  carpenterId: number;
  customerId: number;
  cutting?: Cutting;
}
