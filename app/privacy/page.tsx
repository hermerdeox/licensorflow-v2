'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Users, Mail } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect personal information that you provide directly to us, such as when you create an account, use our services, or contact us. This may include:",
          items: [
            "Name, email address, and contact information",
            "Professional information (job title, organization, department)",
            "Account credentials and preferences",
            "Payment and billing information"
          ]
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect certain information about your use of our services, including:",
          items: [
            "Training progress and completion data",
            "License management activities",
            "System usage patterns and preferences",
            "Device information and browser data"
          ]
        },
        {
          subtitle: "Health Information",
          text: "In the course of providing compliance training services, we may process health-related information as necessary for:",
          items: [
            "HIPAA compliance training and certification",
            "OSHA safety training records",
            "Professional licensing and credentialing",
            "Regulatory compliance reporting"
          ]
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve our services, including:",
          items: [
            "Delivering training courses and compliance programs",
            "Managing software licenses and renewals",
            "Generating compliance reports and analytics",
            "Providing customer support and technical assistance"
          ]
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to:",
          items: [
            "Send important service updates and notifications",
            "Provide training reminders and progress updates",
            "Respond to your inquiries and support requests",
            "Share relevant compliance and industry information"
          ]
        },
        {
          subtitle: "Legal and Compliance",
          text: "We may use your information to:",
          items: [
            "Comply with applicable laws and regulations",
            "Respond to legal requests and court orders",
            "Protect our rights and prevent fraud",
            "Maintain audit trails and compliance records"
          ]
        }
      ]
    },
    {
      title: "Information Sharing and Disclosure",
      icon: Shield,
      content: [
        {
          subtitle: "Service Providers",
          text: "We may share your information with trusted third-party service providers who assist us in:",
          items: [
            "Cloud hosting and data storage",
            "Payment processing and billing",
            "Email communications and notifications",
            "Analytics and performance monitoring"
          ]
        },
        {
          subtitle: "Organizational Sharing",
          text: "Within your organization, we may share information with:",
          items: [
            "Administrators and compliance officers",
            "Department managers and supervisors",
            "HR personnel for training records",
            "IT administrators for system management"
          ]
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information when required by law or to:",
          items: [
            "Comply with regulatory requirements",
            "Respond to subpoenas or court orders",
            "Protect against fraud or security threats",
            "Enforce our terms of service"
          ]
        }
      ]
    },
    {
      title: "Data Security and Protection",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement comprehensive security measures to protect your information:",
          items: [
            "End-to-end encryption for data transmission",
            "Encryption at rest for stored data",
            "Multi-factor authentication for account access",
            "Regular security audits and penetration testing"
          ]
        },
        {
          subtitle: "Access Controls",
          text: "We maintain strict access controls including:",
          items: [
            "Role-based access permissions",
            "Regular access reviews and audits",
            "Employee background checks and training",
            "Secure development and deployment practices"
          ]
        },
        {
          subtitle: "Incident Response",
          text: "In the event of a security incident, we will:",
          items: [
            "Immediately investigate and contain the incident",
            "Notify affected users and authorities as required",
            "Implement additional security measures",
            "Provide regular updates on remediation efforts"
          ]
        }
      ]
    },
    {
      title: "Your Rights and Choices",
      icon: Eye,
      content: [
        {
          subtitle: "Access and Correction",
          text: "You have the right to:",
          items: [
            "Access your personal information",
            "Correct inaccurate or incomplete data",
            "Update your account preferences",
            "Download your data in a portable format"
          ]
        },
        {
          subtitle: "Data Deletion",
          text: "You may request deletion of your information, subject to:",
          items: [
            "Legal and regulatory retention requirements",
            "Legitimate business interests",
            "Data anonymization where appropriate",
            "Technical limitations of data removal"
          ]
        },
        {
          subtitle: "Communication Preferences",
          text: "You can control your communication preferences:",
          items: [
            "Opt out of marketing communications",
            "Choose notification frequency",
            "Select preferred communication channels",
            "Manage training reminder settings"
          ]
        }
      ]
    }
  ];

  const complianceFrameworks = [
    {
      name: "HIPAA",
      description: "Health Insurance Portability and Accountability Act compliance for healthcare data protection",
      icon: "🏥"
    },
    {
      name: "SOC 2 Type II",
      description: "Service Organization Control 2 Type II certification for security, availability, and confidentiality",
      icon: "🔒"
    },
    {
      name: "GDPR",
      description: "General Data Protection Regulation compliance for EU data protection",
      icon: "🌍"
    },
    {
      name: "CCPA",
      description: "California Consumer Privacy Act compliance for California residents",
      icon: "☀️"
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
              LicensorFlow ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our healthcare compliance and training platform.
            </p>
            <p className="text-gray-300">
              By using our services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
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

                <div className="space-y-8">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-xl font-semibold mb-3">{item.subtitle}</h3>
                      <p className="text-gray-300 mb-4">{item.text}</p>
                      <ul className="space-y-2">
                        {item.items.map((listItem, listIndex) => (
                          <li key={listIndex} className="flex items-start">
                            <span className="text-blue-400 mr-3 mt-1">•</span>
                            <span className="text-gray-300">{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Frameworks */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Compliance & Certifications</h2>
            <p className="text-xl text-gray-300">
              We maintain compliance with industry-leading privacy and security standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {complianceFrameworks.map((framework, index) => (
              <motion.div
                key={framework.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{framework.icon}</span>
                  <h3 className="text-xl font-semibold">{framework.name}</h3>
                </div>
                <p className="text-gray-300">{framework.description}</p>
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
            <h2 className="text-2xl font-bold mb-6">Questions About This Policy?</h2>
            <p className="text-gray-300 mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">privacy@licensorflow.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">support@licensorflow.com</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              We will respond to your inquiry within 30 days of receipt.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
