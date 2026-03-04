import { motion } from 'framer-motion';
import { useState } from 'react';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 9 : 7,
      subtitle: 'Perfect for individuals',
      features: [
        '2,000 voice queries/month',
        'Basic analytics',
        'Email support',
        'Community access'
      ],
      buttonStyle: 'secondary'
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 19 : 15,
      subtitle: 'For growing teams',
      features: [
        'Unlimited voice queries',
        'AI-powered analytics',
        'API access',
        'Priority support',
        'Weekly AI insights'
      ],
      buttonStyle: 'primary',
      popular: true
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 39 : 31,
      subtitle: 'For large organizations',
      features: [
        'Everything in Pro',
        'Dedicated AI assistant',
        'Custom integrations',
        'Advanced security',
        '24/7 premium support'
      ],
      buttonStyle: 'outline'
    }
  ];

  return (
    <section id="pricing" className="relative py-32 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-6">
            <span className="px-6 py-2 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white text-sm font-bold tracking-wider uppercase rounded-full shadow-lg">
              PRICING PLANS
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Flexible pricing for every stage of growth
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start small, scale infinitely with Voice AI intelligence.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-20"
        >
          <div className="relative bg-white rounded-full p-2 shadow-xl border-2 border-gray-200">
            <div className="relative flex items-center gap-2">
              {/* Sliding Background */}
              <motion.div
                className="absolute top-0 bottom-0 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] rounded-full shadow-lg"
                initial={false}
                animate={{
                  left: billingCycle === 'monthly' ? '0%' : '50%',
                  width: '50%'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 35
                }}
              />
              
              {/* Monthly Button */}
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`relative z-10 px-12 py-4 rounded-full font-bold text-base transition-all duration-300 whitespace-nowrap ${
                  billingCycle === 'monthly' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              
              {/* Annual Button */}
              <button
                onClick={() => setBillingCycle('annual')}
                className={`relative z-10 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 flex items-center gap-3 whitespace-nowrap ${
                  billingCycle === 'annual' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <span>Annual</span>
                <span className={`text-xs font-extrabold px-3 py-1.5 rounded-full transition-all duration-300 ${
                  billingCycle === 'annual' 
                    ? 'bg-white/30 text-white backdrop-blur-sm' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 group flex flex-col ${
                plan.popular ? 'border-[#C19A6B] md:scale-105' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-6 py-2 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white text-xs font-bold tracking-widest uppercase rounded-full shadow-xl">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-base mb-8">{plan.subtitle}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 text-xl font-medium">/mo</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    Billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-5 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-[#C19A6B] flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 leading-relaxed text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-full font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white hover:from-[#A67C52] hover:to-[#8B6F47]"
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
