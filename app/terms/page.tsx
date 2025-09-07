'use client';

import { motion } from 'framer-motion';
import { FileText, Scale, Users, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing and using LicensorFlow services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
          subtitle: "Modifications",
          text: "We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform. Continued use of our services after such modifications constitutes acceptance of the updated terms."
        }
      ]
    },
    {
      title: "Service Description",
      icon: FileText,
      content: [
        {
          subtitle: "Platform Services",
          text: "LicensorFlow provides healthcare compliance training, license management, and related services including:",
          items: [
            "HIPAA and OSHA compliance training modules",
            "Software license tracking and management",
            "Compliance reporting and analytics",
            "Certification tracking and renewal alerts",
            "Team management and progress monitoring"
          ]
        },
        {
          subtitle: "Service Availability",
          text: "We strive to maintain high service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our services with reasonable notice."
        }
      ]
    },
    {
      title: "User Accounts and Responsibilities",
      icon: Users,
      content: [
        {
          subtitle: "Account Creation",
          text: "To access our services, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
          subtitle: "User Responsibilities",
          text: "As a user of our platform, you agree to:",
          items: [
            "Provide accurate and up-to-date information",
            "Maintain the security of your account credentials",
            "Use the service in compliance with applicable laws",
            "Respect intellectual property rights",
            "Not engage in unauthorized access or misuse of the platform"
          ]
        },
        {
          subtitle: "Prohibited Activities",
          text: "You may not use our services to:",
          items: [
            "Violate any applicable laws or regulations",
            "Infringe on intellectual property rights",
            "Transmit malicious code or harmful content",
            "Attempt to gain unauthorized access to our systems",
            "Interfere with the proper functioning of our services"
          ]
        }
      ]
    },
    {
      title: "Payment and Billing",
      icon: Scale,
      content: [
        {
          subtitle: "Fees and Payment",
          text: "Our services are provided on a subscription basis. Fees are billed in advance and are non-refundable except as required by law. All fees are exclusive of applicable taxes."
        },
        {
          subtitle: "Billing Terms",
          text: "Payment terms include:",
          items: [
            "Monthly or annual billing cycles as selected",
            "Automatic renewal unless cancelled",
            "Price changes with 30 days notice",
            "Late payment fees for overdue accounts",
            "Suspension of services for non-payment"
          ]
        },
        {
          subtitle: "Cancellation",
          text: "You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing period. No refunds will be provided for unused portions of your subscription."
        }
      ]
    },
    {
      title: "Intellectual Property",
      icon: Shield,
      content: [
        {
          subtitle: "Our Content",
          text: "All content, features, and functionality of our platform, including but not limited to text, graphics, logos, and software, are owned by LicensorFlow and are protected by copyright, trademark, and other intellectual property laws."
        },
        {
          subtitle: "User Content",
          text: "You retain ownership of content you upload to our platform. By uploading content, you grant us a license to use, store, and process such content as necessary to provide our services."
        },
        {
          subtitle: "License Restrictions",
          text: "You may not:",
          items: [
            "Copy, modify, or distribute our proprietary content",
            "Reverse engineer or attempt to extract source code",
            "Use our trademarks without written permission",
            "Create derivative works based on our platform"
          ]
        }
      ]
    },
    {
      title: "Privacy and Data Protection",
      icon: Shield,
      content: [
        {
          subtitle: "Data Collection",
          text: "We collect and process personal information in accordance with our Privacy Policy. By using our services, you consent to such collection and processing."
        },
        {
          subtitle: "Data Security",
          text: "We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Compliance",
          text: "We maintain compliance with applicable data protection laws including HIPAA, GDPR, and other relevant regulations."
        }
      ]
    },
    {
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: [
        {
          subtitle: "Service Disclaimer",
          text: "Our services are provided 'as is' without warranties of any kind. We do not guarantee that our services will be uninterrupted, error-free, or meet your specific requirements."
        },
        {
          subtitle: "Liability Limits",
          text: "To the maximum extent permitted by law, LicensorFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities."
        },
        {
          subtitle: "Maximum Liability",
          text: "Our total liability to you for any claims arising from or related to our services shall not exceed the amount you paid us in the 12 months preceding the claim."
        }
      ]
    },
    {
      title: "Termination",
      icon: AlertTriangle,
      content: [
        {
          subtitle: "Termination by You",
          text: "You may terminate your account at any time by contacting our support team or using the account cancellation feature in your dashboard."
        },
        {
          subtitle: "Termination by Us",
          text: "We may terminate or suspend your account immediately if you breach these terms or engage in prohibited activities. We will provide reasonable notice when possible."
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination, your right to use our services ceases immediately. We may delete your account data after a reasonable period, subject to legal and regulatory requirements."
        }
      ]
    }
  ];

  const keyPoints = [
    {
      title: "Service Level Agreement",
      description: "99.9% uptime guarantee with 24/7 monitoring and support",
      icon: "⚡"
    },
    {
      title: "Data Retention",
      description: "Data retained for 7 years or as required by applicable regulations",
      icon: "📊"
    },
    {
      title: "Support Response",
      description: "24-hour response time for critical issues, 48 hours for general inquiries",
      icon: "🛠️"
    },
    {
      title: "Compliance Coverage",
      description: "HIPAA, SOC 2, GDPR, and industry-standard compliance frameworks",
      icon: "🔒"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Please read these terms carefully before using our healthcare compliance platform.
            </p>
            <div className="text-sm text-gray-400">
              Last updated: January 15, 2024
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-lg p-8 border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-300 mb-4">
              These Terms of Service ("Terms") govern your use of LicensorFlow's healthcare compliance and training platform ("Service") operated by LicensorFlow ("us", "we", or "our").
            </p>
            <p className="text-gray-300">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg p-8 border border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-600 rounded-lg mr-4">
                    <section.icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-xl font-semibold mb-3">{item.subtitle}</h3>
                      <p className="text-gray-300 mb-4">{item.text}</p>
                      {item.items && (
                        <ul className="space-y-2">
                          {item.items.map((listItem, listIndex) => (
                            <li key={listIndex} className="flex items-start">
                              <span className="text-blue-400 mr-3 mt-1">•</span>
                              <span className="text-gray-300">{listItem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Key Service Commitments</h2>
            <p className="text-xl text-gray-300">
              Our commitment to providing reliable, secure, and compliant services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {keyPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{point.icon}</span>
                  <h3 className="text-xl font-semibold">{point.title}</h3>
                </div>
                <p className="text-gray-300">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Questions About These Terms?</h2>
            <p className="text-gray-300 mb-6">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">legal@licensorflow.com</span>
              </div>
              <div className="flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">support@licensorflow.com</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              We will respond to your inquiry within 48 hours of receipt.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
