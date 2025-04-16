import { useState } from 'react';
import { Check } from 'lucide-react';
import { BillingPeriod, PricingPlan } from '../types/pricing';
import { cn } from '../lib/utils';

const plans: PricingPlan[] = [
  {
    tier: 'Basic',
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    yearlyDiscount: 16,
    features: [
      '720p streaming',
      '20 hours gameplay/month',
      'Standard peripherals',
      '5 game library access',
      'Email support'
    ]
  },
  {
    tier: 'Pro',
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    yearlyDiscount: 17,
    isPopular: true,
    features: [
      '1080p streaming',
      '50 hours gameplay/month',
      'Premium peripherals',
      '20 game library access',
      'Priority email & chat support',
      'Save game progress'
    ]
  },
  {
    tier: 'Elite',
    monthlyPrice: 29.99,
    yearlyPrice: 299.99,
    yearlyDiscount: 17,
    features: [
      '4K streaming',
      'Unlimited gameplay',
      'Premium peripherals',
      'Full game library access',
      '24/7 priority support',
      'Exclusive early access',
      'Custom peripherals setup'
    ]
  }
];

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  return (
    <div id="pricing" className="py-24 sm:py-32 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4 font-press-start-2p text-3xl sm:text-4xl leading-relaxed">
          Pricing Plans
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Choose the perfect plan for your gaming needs
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center gap-4 mb-12">
        <button
          onClick={() => setBillingPeriod('monthly')}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-colors",
            billingPeriod === 'monthly'
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          Monthly Plans
        </button>
        <button
          onClick={() => setBillingPeriod('yearly')}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-colors",
            billingPeriod === 'yearly'
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          Yearly Plans
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={cn(
              "relative bg-[#0E1221] rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5",
              plan.isPopular
                ? "border-blue-500"
                : "border-transparent hover:border-purple-500/30"
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">{plan.tier}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-white">
                  ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-gray-400 ml-2">
                  /{billingPeriod === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
              {billingPeriod === 'yearly' && (
                <p className="text-sm text-blue-400">
                  Save {plan.yearlyDiscount}% with annual billing
                </p>
              )}
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={cn(
                "w-full py-3 rounded-lg font-medium transition-colors",
                plan.isPopular
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-[#1E2537] text-white hover:bg-[#2A3447]"
              )}
            >
              {plan.isPopular ? 'Start 7-day free trial' : 'Choose plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 