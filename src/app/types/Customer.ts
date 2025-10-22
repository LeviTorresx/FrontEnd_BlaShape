export interface Customer {
  customerId?: number;
  name: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  role?: string;
  carpenterId?: number;
  furnitureList: number[];
}
