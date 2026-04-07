import { Piece } from "@/app/types/Piece";
import { Material } from "@/app/types/Material";
import { InventoryMaterial } from "@/app/types/InventoryMaterial";
import { PreviewRequestDTO } from "../types/PreviewRequest";
import { PieceDTO } from "../types/Piece";
import { SheetDTO } from "../types/Sheet";

export function buildPreviewGroups(
  pieces: Piece[],
  inventoryMaterials: InventoryMaterial[]
): PreviewRequestDTO {
  const groups = Object.values(
    pieces.reduce((acc, piece) => {
      const key = `${piece.materialName}-${piece.thickness}-${piece.color.hex}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(piece);
      return acc;
    }, {} as Record<string, Piece[]>)
  ).map((groupPieces) => {
    const first = groupPieces[0];
    const inventoryMaterial = inventoryMaterials.find(
      (m) => m.name === first.materialName
    );
    if (!inventoryMaterial) throw new Error("Material no encontrado");

    const size = inventoryMaterial.sizes.find((s) => s.thickness === first.thickness);
    if (!size) throw new Error("Size no encontrado para ese thickness");

    const material: Material = {
      name: inventoryMaterial.name,
      thickness: first.thickness,
      color: first.color
    };

    const sheetDTO: SheetDTO = {
      sheetId: 0,
      height: size.height,
      width: size.width,
      materialDTO: material
    };

    const piecesDTO: PieceDTO[] = groupPieces.map((p, index) => ({
      pieceId: p.pieceId,
      name: `pieza_${index + 1}`,
      rotationAllowed: true,
      quantity: p.quantity,
      height: p.height,
      width: p.width,
      thickness: p.thickness,
      colorDTO: p.color,
      materialName: p.materialName,
      edgesDTO: { ...p.edges }
    }));

    return { sheet: sheetDTO, pieces: piecesDTO };
  });

  return { groups };
}