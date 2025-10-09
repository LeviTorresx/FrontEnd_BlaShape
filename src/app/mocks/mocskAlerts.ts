import { Alert } from "../types/Alert";

export const mock_ALERTS: Alert[] = [
  {
    alertId: 1,
    mensaje: "Entrega de muebles a cliente",
    date: "2025-10-07T08:00:00Z",
    time: "08:00 AM",
    severity: "HIGH",
  },
  {
    alertId: 2,
    mensaje: "Llamar al proveedor de madera",
    date: "2025-10-07T09:30:00Z",
    time: "09:30 AM",
    severity: "MEDIUM",
  },
  {
    alertId: 3,
    mensaje: "Revisión de diseño en taller",
    date: "2025-10-07T11:00:00Z",
    time: "11:00 AM",
    severity: "LOW",
  },
  {
    alertId: 4,
    mensaje: "Reunión con cliente nuevo",
    date: "2025-10-07T15:00:00Z",
    time: "03:00 PM",
    severity: "HIGH",
  },
];
