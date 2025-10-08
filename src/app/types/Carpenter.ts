export interface CarpenterDTO {
  name: string;
  lastName: string;
  idNumber: string;
  rut: string;
  email: string;
  password: string;
  phone: string;
}

export interface Carpenter {
  carpenterId: number;
  name: string;
  lastName: string;
  idNumber: string;
  rut: string;
  email: string;
  password: string;
  phone: string;
  workshopId: number;
  furnitureListIds: [number];
}
