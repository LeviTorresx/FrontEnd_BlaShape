import { gruopedPieces, Piece } from "../types/Piece";

export function gruopPiecesByAttributes(pieces: Piece[]): gruopedPieces[] {
  const map = new Map<string, gruopedPieces>();

  for (const piece of pieces) {
    const key = `${piece.materialName}-${piece.color.hex}-${piece.color.name}`;

    if (!map.has(key)) {
      map.set(key, {
        key,
        materialname: piece.materialName,
        ColorHex: piece.color.hex,
        colorName: piece.color.name,
        thickness: piece.thickness,
        pieces: [],
      });
    }
    map.get(key)!.pieces.push(piece);
  }

  return Array.from(map.values());
}