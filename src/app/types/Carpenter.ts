import { Workshop } from "./Workshop";

export interface CarpenterDTO {
  name: string;
  lastName: string;
  dni: string;
  rut: string;
  email: string;
  password: string;
  phone: string;
}

export interface Carpenter {
  carpenterId: number;
  name: string;
  lastName: string;
  dni: string;
  rut: string;
  email: string;
  password: string;
  phone: string;
  workshop: Workshop;
  furnitureListIds: [number];
}
