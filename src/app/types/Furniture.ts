import { Piece } from "./Piece";

export interface Furniture {
  furnitureId: number;
  name: string;
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
