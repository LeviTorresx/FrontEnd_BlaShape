// SINGLE_CUT = pago puntual por corte
// BASIC / PRO  = suscripciones mensuales recurrentes
export type PlanId = "SINGLE_CUT" | "BASIC" | "PRO";

export type SubscriptionStatus =
  | "active"
  | "inactive"
  | "canceled"
  | "past_due"
  | "trialing";

export interface Plan {
  planId: PlanId;
  name: string;
  price: number;          // en centavos USD  (ej: 200 = $2, 1000 = $10)
  currency: string;       // "usd"
  interval: "month" | "one_time";   // SINGLE_CUT → "one_time"
  stripePriceId: string;
  features: PlanFeatures;
}

export interface PlanFeatures {
  pdf: boolean;
  svg: "full" | "limited" | false;
  cuts: number | "unlimited";        // SINGLE_CUT=1, BASIC=20, PRO=unlimited
  history: "full" | "limited" | "single";
  commercialLicense: boolean;
  analytics: boolean;
}

// Suscripción activa del usuario (BASIC o PRO)
export interface Subscription {
  subscriptionId: string;
  planId: PlanId;
  status: SubscriptionStatus;
  currentPeriodStart: string;    // ISO date
  currentPeriodEnd: string;      // ISO date
  cancelAtPeriodEnd: boolean;
  cutsUsed?: number;             // relevante para BASIC (cortes usados del mes)
  cutsLimit?: number;            // relevante para BASIC (límite del mes, ej: 20)
}

// Para BASIC/PRO: flujo SetupIntent + createSubscription
export interface CreateSubscriptionRequest {
  planId: PlanId;
  paymentMethodId: string;
}

export interface CreateSubscriptionResponse {
  subscriptionId: string;
  clientSecret: string | null;
  status: SubscriptionStatus;
}

// Para SINGLE_CUT: flujo PaymentIntent directo (pago único)
export interface CreateSingleCutPaymentRequest {
  cutId: string;                 // ID del corte que el usuario quiere comprar
  paymentMethodId: string;
}

export interface CreateSingleCutPaymentResponse {
  paymentIntentId: string;
  clientSecret: string | null;
  status: "succeeded" | "requires_action";
}

