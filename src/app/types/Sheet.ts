import { Material } from "./Material";

export interface Sheet {
    sheetId: number;
    height: number;
    width: number;
    material: Material;
}

export interface SheetDTO {
    sheetId?: number;
    height: number;
    width: number;
    materialDTO: Material;
}