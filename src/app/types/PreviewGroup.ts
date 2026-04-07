import { Piece } from "./Piece";
import { Sheet } from "./Sheet";

export interface PreviewGroup {
    sheet: Sheet;
    pieces: Piece[];
}