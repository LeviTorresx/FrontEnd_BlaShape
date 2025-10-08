export interface CustomerDTO {
  name: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
}

export interface Customer {
  customerId: number;
  name: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  role: string;
  furnitureList: number[];
}
