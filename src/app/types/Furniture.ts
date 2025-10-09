import { Piece } from "./Piece";

export interface Furniture {
    furnitureId: number;
    name: string;
    documentUrl?: string;
    imageInitUrl: string;
    imageEnd?: string;
    creationDate: string;
    endDate: string;
    status: string;
    carpenterId: number;
    customerId: number;
    pieces:Piece[]
}