import { Color } from "./Color";

export interface Material {
    materialId?: number;
    name: string;
    color: Color;
    thickness: number;
}
