

import { Piece } from "@/app/types/Piece";
import { PreviewGroup } from "@/app/types/PreviewGroup";
import { Material } from "@/app/types/Material";
import { Sheet } from "@/app/types/Sheet";
import { InventoryMaterial } from "@/app/types/InventoryMaterial";


export function buildPreviewGroups(
  pieces: Piece[],
  inventoryMaterials: InventoryMaterial[]
): PreviewGroup[] {
  return Object.values(
    pieces.reduce((acc, piece) => {
      const key = `${piece.materialName}-${piece.thickness}-${piece.color.hex}`;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(piece);
      return acc;
    }, {} as Record<string, Piece[]>)
  ).map((groupPieces) => {
    const first = groupPieces[0];

    const inventoryMaterial = inventoryMaterials.find(
      (m) => m.name === first.materialName
    );

    if (!inventoryMaterial) {
      throw new Error("Material no encontrado en inventory");
    }

    const size = inventoryMaterial.sizes.find(
      (s) => s.thickness === first.thickness
    );

    if (!size) {
      throw new Error("Size no encontrado para ese thickness");
    }

    const material: Material = {
      name: inventoryMaterial.name,
      thickness: first.thickness,
      color: first.color,
    };

    const sheet: Sheet = {
      sheetId: 0,
      height: size.height,
      width: size.width,
      material,
    };

    return {
      sheet,
      pieces: groupPieces,
    };
  });
}