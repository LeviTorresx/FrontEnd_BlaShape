import { Cutting } from "./Cutting";
import { Piece } from "./Piece";

export enum FurnitureType {
  COCINA = "Cocina",
  SALA = "Mueble de sala",
  NOCHERO = "Nochero",
  GABETER0 = "Gabetero",
  CLOSET = "Closet",
  BAÑO = "Mueble de baño",
  ESCRITORIO = "Escritorio",
  MESA = "Mesa",
  SILLA = "Silla",
  OTRO = "otro",
}


export interface Furniture {
  furnitureId: number;
  name: string;
  type: FurnitureType;
  documentUrl?: string;
  imageInitUrl: string;
  imageEndUrl?: string;
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
