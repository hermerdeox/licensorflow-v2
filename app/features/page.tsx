'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Award, 
  Lock, 
  Users, 
  Clock, 
  BarChart3, 
  FileText, 
  Smartphone,
  Cloud,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Play
} from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
  const features = [
    {
      category: "Compliance Training",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
      items: [
        {
          title: "HIPAA Training Modules",
          description: "Comprehensive HIPAA compliance training with interactive scenarios and real-world case studies.",
          features: ["Interactive Learning", "Scenario-Based Training", "Progress Tracking", "Certification"]
        },
        {
          title: "OSHA Safety Courses",
          description: "Workplace safety training covering all OSHA requirements for healthcare environments.",
          features: ["Safety Protocols", "Emergency Procedures", "Equipment Training", "Compliance Reporting"]
        },
        {
          title: "Software Certifications",
          description: "Master leading healthcare software platforms with hands-on training modules.",
          features: ["Epic EHR Training", "Cerner PowerChart", "Dentrix Mastery", "Microsoft 365"]
        }
      ]
    },
    {
      category: "License Management",
      icon: Lock,
      color: "from-green-500 to-green-600",
      items: [
        {
          title: "License Vault",
          description: "Securely store and manage all your software licenses in one encrypted location.",
          features: ["Encrypted Storage", "Expiry Alerts", "Team Sharing", "Cost Tracking"]
        },
        {
          title: "Automated Renewals",
          description: "Never miss a license renewal with automated tracking and notification systems.",
          features: ["Auto-Reminders", "Bulk Renewals", "Cost Optimization", "Vendor Management"]
        },
        {
          title: "Compliance Reporting",
          description: "Generate comprehensive reports for audits and compliance requirements.",
          features: ["Audit Reports", "Usage Analytics", "Cost Analysis", "Compliance Status"]
        }
      ]
    },
    {
      category: "Learning Management",
      icon: Award,
      color: "from-purple-500 to-purple-600",
      items: [
        {
          title: "Interactive Learning",
          description: "Engaging multimedia content with quizzes, simulations, and hands-on exercises.",
          features: ["Video Lessons", "Interactive Quizzes", "Simulations", "Progress Tracking"]
        },
        {
          title: "Certification Tracking",
          description: "Track and manage all certifications with automated renewal reminders.",
          features: ["Certification Database", "Renewal Alerts", "Digital Certificates", "Verification System"]
        },
        {
          title: "Team Management",
          description: "Manage team training progress and compliance across your organization.",
          features: ["Team Dashboards", "Progress Reports", "Assignment Tools", "Performance Analytics"]
        }
      ]
    },
    {
      category: "Analytics & Reporting",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      items: [
        {
          title: "Real-time Analytics",
          description: "Comprehensive analytics dashboard with real-time insights into training progress.",
          features: ["Progress Tracking", "Performance Metrics", "Completion Rates", "Trend Analysis"]
        },
        {
          title: "Custom Reports",
          description: "Generate detailed reports for management, compliance, and audit purposes.",
          features: ["Custom Dashboards", "Scheduled Reports", "Export Options", "Visual Analytics"]
        },
        {
          title: "ROI Tracking",
          description: "Measure the return on investment of your training and compliance programs.",
          features: ["Cost Analysis", "Efficiency Metrics", "Compliance ROI", "Performance Impact"]
        }
      ]
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Time Savings",
      description: "Reduce administrative time by 70% with automated compliance tracking and reporting."
    },
    {
      icon: Shield,
      title: "Risk Reduction",
      description: "Minimize compliance risks with comprehensive training and automated monitoring."
    },
    {
      icon: Users,
      title: "Team Efficiency",
      description: "Improve team productivity with streamlined training and certification management."
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Make informed decisions with detailed analytics and performance metrics."
    }
  ];

  const integrations = [
    { name: "Epic EHR", logo: "🏥" },
    { name: "Cerner", logo: "💻" },
    { name: "Dentrix", logo: "🦷" },
    { name: "Microsoft 365", logo: "📊" },
    { name: "Salesforce", logo: "☁️" },
    { name: "Slack", logo: "💬" },
    { name: "Teams", logo: "👥" },
    { name: "Zoom", logo: "📹" }
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
              Powerful Features for Healthcare Compliance
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive training, license management, and compliance tracking tools designed specifically for healthcare organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center px-8 py-4 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Comprehensive Feature Set</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage compliance, training, and licenses in one powerful platform.
            </p>
          </motion.div>

          <div className="space-y-20">
            {features.map((category, categoryIndex) => (
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
                  <h3 className="text-3xl font-bold">{category.category}</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                      <p className="text-gray-300 mb-4">{item.description}</p>
                      <ul className="space-y-2">
                        {item.features.map((feature, featureIndex) => (
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
            <h2 className="text-4xl font-bold mb-4">Why Choose LicensorFlow?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the benefits of streamlined compliance management and comprehensive training solutions.
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg mb-4">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Seamless Integrations</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with your existing tools and workflows for a unified experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="text-3xl mb-2">{integration.logo}</div>
                <p className="text-sm text-gray-300">{integration.name}</p>
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
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Compliance Management?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of healthcare organizations already using LicensorFlow to streamline their compliance processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
