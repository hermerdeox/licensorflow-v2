'use client';

import { motion } from 'framer-motion';
import { 
  Check, 
  Star, 
  Users, 
  Shield, 
  Zap, 
  Crown,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small practices and individual professionals",
      price: { monthly: 29, annual: 290 },
      icon: Users,
      color: "from-blue-500 to-blue-600",
      features: [
        "Up to 5 users",
        "Basic compliance training",
        "License tracking (up to 10)",
        "Email support",
        "Basic reporting",
        "Mobile app access"
      ],
      limitations: [
        "Limited integrations",
        "Basic analytics"
      ],
      popular: false
    },
    {
      name: "Professional",
      description: "Ideal for growing healthcare organizations",
      price: { monthly: 79, annual: 790 },
      icon: Shield,
      color: "from-purple-500 to-purple-600",
      features: [
        "Up to 25 users",
        "Advanced compliance training",
        "License tracking (unlimited)",
        "Priority support",
        "Advanced reporting & analytics",
        "API access",
        "Custom integrations",
        "Team management tools"
      ],
      limitations: [],
      popular: true
    },
    {
      name: "Enterprise",
      description: "Comprehensive solution for large healthcare systems",
      price: { monthly: 199, annual: 1990 },
      icon: Crown,
      color: "from-orange-500 to-orange-600",
      features: [
        "Unlimited users",
        "Full compliance suite",
        "Advanced license management",
        "24/7 dedicated support",
        "Custom reporting & dashboards",
        "Full API access",
        "White-label options",
        "Advanced security features",
        "Custom training modules",
        "Dedicated account manager"
      ],
      limitations: [],
      popular: false
    }
  ];

  const addOns = [
    {
      name: "Additional Training Modules",
      description: "Specialized training for specific software or compliance requirements",
      price: { monthly: 15, annual: 150 },
      features: ["Custom content", "Specialized certifications", "Industry-specific training"]
    },
    {
      name: "Advanced Analytics",
      description: "Enhanced reporting and analytics capabilities",
      price: { monthly: 25, annual: 250 },
      features: ["Custom dashboards", "Advanced metrics", "Predictive analytics"]
    },
    {
      name: "Priority Support",
      description: "Faster response times and dedicated support channels",
      price: { monthly: 20, annual: 200 },
      features: ["24/7 support", "Phone support", "Dedicated support agent"]
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to start your trial."
    },
    {
      question: "What happens if I exceed my user limit?",
      answer: "We'll notify you when you're approaching your limit. You can upgrade your plan or purchase additional user licenses as needed."
    },
    {
      question: "Do you offer custom pricing for large organizations?",
      answer: "Yes, we offer custom pricing and features for organizations with specific needs. Contact our sales team to discuss your requirements."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, ACH transfers, and can arrange invoicing for enterprise customers."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade security with SOC 2 compliance, encryption at rest and in transit, and regular security audits."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Choose the perfect plan for your healthcare organization. All plans include our core compliance and training features.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span className={`mr-3 ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-3 ${isAnnual ? 'text-white' : 'text-gray-400'}`}>Annual</span>
              {isAnnual && (
                <span className="ml-2 px-2 py-1 bg-green-600 text-white text-sm rounded-full">
                  Save 20%
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-gray-800 rounded-lg p-8 border-2 ${
                  plan.popular 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-700 hover:border-gray-600'
                } transition-colors`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} rounded-lg mb-4`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-300 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-gray-400 ml-2">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>

                  <Link
                    href="/contact"
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg mb-4">What's included:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Add-ons & Extensions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enhance your plan with additional features and capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2">{addon.name}</h3>
                <p className="text-gray-300 mb-4">{addon.description}</p>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold">
                    ${isAnnual ? addon.price.annual : addon.price.monthly}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {addon.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-300">
                      <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                  Add to Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about our pricing and plans.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of healthcare organizations already using LicensorFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
