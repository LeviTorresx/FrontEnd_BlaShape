import { Material } from "./Material";

export interface Sheet {
    sheetId: number;
    height: number;
    width: number;
    material: Material;
}