import { Piece } from "./Piece";

export interface Furniture {
    furnitureId: number;
    name: string;
    documentUrl?: string;
    imageUrl?: string;
    imageEnd?: string;
    creationDate: Date;
    endDate?: Date;
    status: string;
    carpenterId: number;
    customerId: number;
    pieces:Piece[]
}