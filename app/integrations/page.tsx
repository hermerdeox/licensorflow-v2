'use client';

import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Code,
  Database,
  Cloud
} from 'lucide-react';
import Link from 'next/link';

export default function IntegrationsPage() {
  const integrations = [
    {
      category: "Electronic Health Records (EHR)",
      description: "Seamlessly integrate with leading EHR systems for comprehensive compliance tracking",
      icon: Database,
      color: "from-blue-500 to-blue-600",
      systems: [
        {
          name: "Epic",
          description: "Full integration with Epic EHR for training and compliance tracking",
          status: "Available",
          features: ["User sync", "Training assignments", "Compliance reporting"]
        },
        {
          name: "Cerner",
          description: "Connect with Cerner PowerChart for automated compliance management",
          status: "Available",
          features: ["Role-based access", "Automated assignments", "Progress tracking"]
        },
        {
          name: "Allscripts",
          description: "Integration with Allscripts EHR for streamlined workflows",
          status: "Available",
          features: ["Single sign-on", "Data synchronization", "Custom reporting"]
        }
      ]
    },
    {
      category: "Practice Management",
      description: "Connect with practice management systems for comprehensive healthcare operations",
      icon: Users,
      color: "from-green-500 to-green-600",
      systems: [
        {
          name: "Dentrix",
          description: "Full integration with Dentrix practice management software",
          status: "Available",
          features: ["Staff management", "Training tracking", "Compliance monitoring"]
        },
        {
          name: "Eaglesoft",
          description: "Seamless connection with Eaglesoft practice management",
          status: "Available",
          features: ["User provisioning", "Role management", "Automated reporting"]
        },
        {
          name: "Open Dental",
          description: "Integration with Open Dental for comprehensive practice management",
          status: "Available",
          features: ["Data sync", "Training assignments", "Compliance alerts"]
        }
      ]
    },
    {
      category: "Communication & Collaboration",
      description: "Integrate with your existing communication tools for better team coordination",
      icon: Cloud,
      color: "from-purple-500 to-purple-600",
      systems: [
        {
          name: "Microsoft Teams",
          description: "Connect with Microsoft Teams for seamless collaboration",
          status: "Available",
          features: ["Notifications", "Training reminders", "Progress updates"]
        },
        {
          name: "Slack",
          description: "Integrate with Slack for team communication and updates",
          status: "Available",
          features: ["Bot notifications", "Channel integration", "Status updates"]
        },
        {
          name: "Zoom",
          description: "Connect with Zoom for virtual training sessions",
          status: "Available",
          features: ["Meeting integration", "Attendance tracking", "Recording management"]
        }
      ]
    },
    {
      category: "HR & Workforce Management",
      description: "Connect with HR systems for comprehensive workforce compliance management",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      systems: [
        {
          name: "Workday",
          description: "Integration with Workday for employee lifecycle management",
          status: "Available",
          features: ["Employee sync", "Role management", "Compliance tracking"]
        },
        {
          name: "BambooHR",
          description: "Connect with BambooHR for streamlined HR processes",
          status: "Available",
          features: ["User provisioning", "Department sync", "Training assignments"]
        },
        {
          name: "ADP",
          description: "Integration with ADP for comprehensive workforce management",
          status: "Available",
          features: ["Employee data sync", "Compliance reporting", "Training tracking"]
        }
      ]
    }
  ];

  const apiFeatures = [
    {
      icon: Code,
      title: "RESTful API",
      description: "Comprehensive REST API for custom integrations and data access",
      features: ["JSON-based", "OAuth 2.0 authentication", "Rate limiting", "Comprehensive documentation"]
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security with full compliance support",
      features: ["SOC 2 Type II", "HIPAA compliant", "End-to-end encryption", "Audit logging"]
    },
    {
      icon: Zap,
      title: "Real-time Sync",
      description: "Real-time data synchronization for up-to-date information",
      features: ["Webhook support", "Event-driven updates", "Bidirectional sync", "Conflict resolution"]
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Comprehensive analytics and reporting capabilities",
      features: ["Custom reports", "Data export", "Real-time dashboards", "Trend analysis"]
    }
  ];

  const benefits = [
    {
      title: "Reduced Manual Work",
      description: "Automate data entry and reduce administrative overhead by up to 70%",
      icon: "⚡"
    },
    {
      title: "Improved Accuracy",
      description: "Eliminate data entry errors with automated synchronization",
      icon: "🎯"
    },
    {
      title: "Enhanced Visibility",
      description: "Get a unified view of compliance across all your systems",
      icon: "👁️"
    },
    {
      title: "Faster Implementation",
      description: "Get up and running quickly with pre-built connectors",
      icon: "🚀"
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
              Seamless Integrations
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect LicensorFlow with your existing healthcare systems for a unified compliance management experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Request Integration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/api-docs"
                className="inline-flex items-center px-8 py-4 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <Code className="mr-2 h-5 w-5" />
                View API Docs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Integrate?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your compliance management with powerful integrations that work seamlessly with your existing systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Available Integrations</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with the tools and systems you already use to streamline your compliance workflow.
            </p>
          </motion.div>

          <div className="space-y-16">
            {integrations.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-8">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{category.category}</h3>
                    <p className="text-gray-300">{category.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {category.systems.map((system, systemIndex) => (
                    <motion.div
                      key={system.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: systemIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-semibold">{system.name}</h4>
                        <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                          {system.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{system.description}</p>
                      
                      <ul className="space-y-2">
                        {system.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful API & Development Tools</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Build custom integrations and extend LicensorFlow with our comprehensive API and development tools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {apiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
              >
                <div className="p-3 bg-blue-600 rounded-lg w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
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
            <h2 className="text-4xl font-bold mb-4">Ready to Integrate?</h2>
            <p className="text-xl mb-8 opacity-90">
              Connect LicensorFlow with your existing systems and transform your compliance management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/api-docs"
                className="inline-flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
              >
                <Code className="mr-2 h-5 w-5" />
                View Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
