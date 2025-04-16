export interface NavItem {
  label: string;
  href: string;
}

export interface User {
  name: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  isPopular?: boolean;
}