import { Customer } from "../types/Customer";

export const mock_CUSTOMERS: Customer[] = [
  {
    customerId: 1,
    name: "Juan",
    lastName: "Pérez",
    dni: "12345678",
    email: "fake",
    phone: "555-1234",
    role: "user",
    furnitureList: [1, 2],
  },
  {
    customerId: 2,
    name: "María",
    lastName: "Gómez",
    dni: "87654321",
    email: "fake2",
    phone: "555-5678",
    role: "admin",
    furnitureList: [3],
  },
  {
    customerId: 3,
    name: "Luis",
    lastName: "Martínez",
    dni: "11223344",
    email: "fake3",
    phone: "555-9012",
    role: "user",
    furnitureList: [],
  },
];
