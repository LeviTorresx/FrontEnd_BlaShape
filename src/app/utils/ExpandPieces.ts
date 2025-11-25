import { Piece } from "../types/Piece";

let tempIdCounter = 1; // contador global temporal

function nextTempId(): number {
  return tempIdCounter++;
}

export function expandPiecesByQuantity(pieces: Piece[]): Piece[] {
  const result: Piece[] = [];

  pieces.forEach((piece) => {
    const count = Math.max(1, piece.quantity);

    for (let i = 0; i < count; i++) {
      result.push({
        ...piece,
        quantity: 1,
        pieceId: nextTempId(),
      });
    }
  });

  return result;
}
