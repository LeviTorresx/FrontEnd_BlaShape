import { Piece, PieceDTO } from "./Piece";

export interface Cutting{
    cuttingId?: number;
    materialName?: string;
    sheetQuantity?: number;
    pieces:Piece[];
}

export interface CuttingDTO{
    cuttingId?: number;
    materialName: string;
    sheetQuantity: number;
    pieces: PieceDTO[];
}