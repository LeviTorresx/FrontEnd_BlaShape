import { Color } from "./Color";
import { Size } from "./Size";

export interface InventoryMaterial {
  inventoryMaterialId?: number;
  name: string;
  sizes: Size[];
  colors: Color[];
}
