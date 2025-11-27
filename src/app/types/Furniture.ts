import { Piece } from "./Piece";

export enum FurnitureType {
  COCINA = "cocina",
  SALA = "mueble de sala",
  NOCHERO = "nochero",
  GABETER0 = "gabetero",
  CLOSET = "closet",
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
  pieces: Piece[];
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
