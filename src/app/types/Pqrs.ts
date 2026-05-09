export type PqrsType = "PETICION" | "QUEJA" | "RECLAMO" | "SUGERENCIA";

export type PqrsStatus = "PENDIENTE" | "EN_PROCESO" | "RESUELTA" | "CERRADA";

export type PqrsScope = "GENERAL" | "WORKSHOP";

export const PqrsTypeLabels: Record<PqrsType, string> = {
  PETICION: "Petición",
  QUEJA: "Queja",
  RECLAMO: "Reclamo",
  SUGERENCIA: "Sugerencia",
};

export const PqrsStatusLabels: Record<PqrsStatus, string> = {
  PENDIENTE: "Pendiente",
  EN_PROCESO: "En proceso",
  RESUELTA: "Resuelta",
  CERRADA: "Cerrada",
};

export const PqrsStatusStyles: Record<PqrsStatus, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-800 border-yellow-200",
  EN_PROCESO: "bg-blue-100 text-blue-800 border-blue-200",
  RESUELTA: "bg-green-100 text-green-800 border-green-200",
  CERRADA: "bg-gray-100 text-gray-700 border-gray-200",
};

export const PqrsTypeStyles: Record<PqrsType, string> = {
  PETICION: "bg-purple-100 text-purple-800 border-purple-200",
  QUEJA: "bg-red-100 text-red-800 border-red-200",
  RECLAMO: "bg-orange-100 text-orange-800 border-orange-200",
  SUGERENCIA: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

/** Vista completa que devuelve el backend */
export interface PqrsRequest {
  subject: string;
  message: string;
  type: PqrsType;
  scope: PqrsScope;
  workshopId?: number;
  carpenterId?: number;
  guestName?: string;
  guestLastName?: string;
  guestEmail?: string;
  guestPhone?: string;
}

export interface Pqrs {
  pqrsId: number;
  subject: string;
  message: string;
  type: PqrsType;
  status: PqrsStatus;
  scope: PqrsScope;
  response?: string;
  trackingCode: string;
  createdAt: string;
  respondedAt?: string;
  customerId?: number;
  carpenterId?: number;
  workshopId?: number;
  guestName?: string;
  guestLastName?: string;
  guestEmail?: string;
  linkedToAccount: boolean;
}

/** Respuesta del POST /create */
export interface PqrsCreateResponse {
  pqrs: Pqrs;
  trackingCode: string;
  trackingLink: string;
  linkedToAccount: boolean;
}

export interface PqrsAnswerRequest {
  response: string;
}