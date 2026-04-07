import { PieceDTO } from "./Piece";
import { SheetDTO } from "./Sheet";

export interface PreviewGroupDTO {
    sheet: SheetDTO;
    pieces: PieceDTO[];
}