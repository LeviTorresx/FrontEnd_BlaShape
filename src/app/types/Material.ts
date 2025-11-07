import { Color } from "./Color";
import { Size } from "./Size";

export interface Material {
  materialId?: number;
  name: string;
  sizes: Size[];
  colors: Color[];
}
