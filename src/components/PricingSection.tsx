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
    <div id="pricing" className="py-16 sm:py-20 lg:py-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-press-start-2p leading-tight">
          Pricing Plans
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          Choose the perfect plan for your gaming needs
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center gap-4 sm:gap-6 mb-10 sm:mb-12">
        <button
          onClick={() => setBillingPeriod('monthly')}
          className={cn(
            "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base",
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
            "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base",
            billingPeriod === 'yearly'
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          Yearly Plans
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-sm mx-auto md:max-w-none">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={cn(
              "relative bg-[#0E1221] rounded-2xl p-6 sm:p-8 border-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5",
              plan.isPopular
                ? "border-blue-500"
                : "border-transparent hover:border-purple-500/30"
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                MOST POPULAR
              </div>
            )}

            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{plan.tier}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-gray-400 text-sm sm:text-base ml-1 sm:ml-2">
                  /{billingPeriod === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
              {billingPeriod === 'yearly' && (
                <p className="text-xs sm:text-sm text-blue-400">
                  Save {plan.yearlyDiscount}% with annual billing
                </p>
              )}
            </div>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 sm:gap-3 text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={cn(
                "w-full py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base",
                plan.isPopular
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-[#1E2537] text-white hover:bg-[#2A3447]"
              )}
              onClick={() => {
                document.getElementById('hero')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              {plan.isPopular ? 'Start 7-day free trial' : 'Choose plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 