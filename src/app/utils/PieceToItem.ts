import { Item } from "../types/Item";
import { Piece } from "../types/Piece";

export function piecesToItems(pieces: Piece[]): Item[] {
  return pieces.map((p, index) => ({
    id: p.pieceId ?? index,
    width: Number(p.width) || 0,
    height: Number(p.height) || 0,
    color: { hex: p.ColorHex ?? "#cccccc", name: p.colorName ?? "n/a" }, // <-- seguro
    edges: {
      top: !!p.edges?.top,
      bottom: !!p.edges?.bottom,
      left: !!p.edges?.left,
      right: !!p.edges?.right,
    },
    rotated: false,
    x: 0,
    y: 0,
  }));
}

