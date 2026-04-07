export type SubscriptionStatus = "ACTIVE" | "CANCELED" | "PAST_DUE" | "INCOMPLETE";
export type PaymentType = "SUBSCRIPTION" | "ONE_TIME_PRODUCT";
export type PlanInterval = "DAY" | "WEEK" | "MONTH" | "YEAR";

export interface Plan {
  planId: number;              
  planName: string;        
  description: string;
  interval: PlanInterval;
  price: number;           
  currency: string;
  stripePriceId: string;
  cuttingLimit: number;    // 0 = ilimitado (PRO), N = límite mensual (BASIC), 1 (SINGLE_CUT)
  svg: boolean;
  limitedSvg: boolean;
  pdf: boolean;
  limitedRecord: boolean;
  meaningPieces: boolean;
  analyticsModule: boolean;
  businessLicence: boolean;
}

// Request para POST /api_BS/stripe/create-checkout-session
export interface CheckoutRequest {
  id: number;              // Plan ID en BD
  carpenterId: number;
  paymentType: PaymentType;
  description: string;
  successUrl: string;
  cancelUrl: string;
}


// Suscripción activa del usuario
export interface Subscription {
  id: number;
  plan: Plan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
}