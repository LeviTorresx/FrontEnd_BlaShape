import { Piece } from "./Piece";

export interface Cutting{
    cuttingId?: number;
    materialName?: string;
    sheetQuantity?: number;
    pieces:Piece[];
}