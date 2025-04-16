export type BillingPeriod = 'monthly' | 'yearly';

export type PlanTier = 'Basic' | 'Pro' | 'Elite';

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  tier: PlanTier;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  yearlyDiscount: number;
} 