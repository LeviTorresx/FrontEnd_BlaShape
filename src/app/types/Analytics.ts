// ─── Enums ────────────────────────────────────────────────────────────────────

export type FurnitureType =
  | "COCINA"
  | "SALA"
  | "NOCHERO"
  | "GABETERO"
  | "CLOSET"
  | "BAÑO"
  | "ESCRITORIO"
  | "MESA"
  | "SILLA"
  | "OTRO";

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface FurnitureTypeCount {
  furnitureType: FurnitureType;
  count: number;
}

export interface MostUsedMaterial {
  material: string;
  count: number;
}

export interface TopCustomer {
  fullName: string;
  dni: string;
  furnitureCount: number;
}

export interface TopCarpenter {
  carpenterId: number;
  fullName: string;
  count: number;
}

export interface TopCarpenterAmount {
  carpenterId: number;
  fullName: string;
  totalAmount: number;
}

export interface SubscriptionPlan {
  plan: string;
  count: number;
}

// ─── Query params ─────────────────────────────────────────────────────────────

export interface FurnituresByDateParams {
  carpenterId: number;
  startDate: string; // "YYYY-MM-DD"
  endDate: string;   // "YYYY-MM-DD"
}

export interface TopCustomersParams {
  carpenterId: number;
  limit: number;
}

export interface MostUsedMaterialsParams {
  carpenterId: number;
}

export interface TopCarpentersParams {
  limit: number;
}

export interface TotalBetweenDatesParams {
  startDate: string;
  endDate: string;
}