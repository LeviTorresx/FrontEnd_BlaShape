import { gruopedPieces, Piece } from "@/app/types/Piece";
import { Item } from "@/app/types/Item";

export const convertGroupedPiecesToItems = (groups: gruopedPieces[]) => {
  const items: Item[] = [];

  groups.forEach(group => {
    group.pieces.forEach(piece => {
      for (let i = 0; i < piece.quantity; i++) {
        items.push({
          id: `${piece.pieceId}-${i}`,
          width: piece.width,
          height: piece.height,
          rotated: false,
          x: 0,
          y: 0,
          color: { hex: piece.ColorHex }
        });
      }
    });
  });

  return items;
};
