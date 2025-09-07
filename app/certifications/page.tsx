'use client';

import { motion } from 'framer-motion';
import { 
  Award, 
  Laptop, 
  Database, 
  CheckCircle,
  Clock,
  Star,
  BookOpen,
  BarChart3,
  ArrowRight,
  Play,
  Users,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function CertificationsPage() {
  const certifications = [
    {
      title: "Epic EHR Certification",
      duration: "40 hours",
      description: "Comprehensive training for Epic electronic health record system",
      topics: [
        "Epic MyChart patient portal",
        "Clinical documentation",
        "Order management",
        "Billing and coding",
        "Reporting and analytics"
      ],
      level: "Advanced",
      vendor: "Epic Systems",
      exam: "Epic Certification Exam"
    },
    {
      title: "Cerner PowerChart Training",
      duration: "35 hours",
      description: "Master Cerner's PowerChart clinical information system",
      topics: [
        "PowerChart navigation",
        "Clinical documentation",
        "Medication management",
        "Care plans and protocols",
        "Integration capabilities"
      ],
      level: "Advanced",
      vendor: "Cerner",
      exam: "Cerner PowerChart Certification"
    },
    {
      title: "Dentrix Practice Management",
      duration: "25 hours",
      description: "Complete training for Dentrix dental practice management software",
      topics: [
        "Patient management",
        "Appointment scheduling",
        "Treatment planning",
        "Insurance processing",
        "Financial reporting"
      ],
      level: "Intermediate",
      vendor: "Henry Schein",
      exam: "Dentrix Certification"
    },
    {
      title: "Microsoft 365 Healthcare",
      duration: "20 hours",
      description: "Microsoft 365 applications for healthcare environments",
      topics: [
        "Teams for healthcare",
        "SharePoint collaboration",
        "Power BI analytics",
        "Security and compliance",
        "Integration with EHR systems"
      ],
      level: "Intermediate",
      vendor: "Microsoft",
      exam: "Microsoft 365 Healthcare Specialist"
    },
    {
      title: "Salesforce Health Cloud",
      duration: "30 hours",
      description: "Customer relationship management for healthcare organizations",
      topics: [
        "Patient relationship management",
        "Care coordination",
        "Health data integration",
        "Analytics and reporting",
        "Mobile applications"
      ],
      level: "Advanced",
      vendor: "Salesforce",
      exam: "Salesforce Health Cloud Specialist"
    },
    {
      title: "Tableau Healthcare Analytics",
      duration: "28 hours",
      description: "Data visualization and analytics for healthcare data",
      topics: [
        "Healthcare data visualization",
        "Performance dashboards",
        "Clinical analytics",
        "Financial reporting",
        "Population health metrics"
      ],
      level: "Advanced",
      vendor: "Tableau",
      exam: "Tableau Healthcare Analytics Specialist"
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Certifications recognized by leading healthcare software vendors"
    },
    {
      icon: Users,
      title: "Career Advancement",
      description: "Boost your career with in-demand software certifications"
    },
    {
      icon: Shield,
      title: "Compliance Ready",
      description: "Ensure your team meets software proficiency requirements"
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Monitor certification progress and completion rates"
    }
  ];

  const features = [
    {
      title: "Hands-On Labs",
      description: "Practical exercises using real software environments",
      icon: "🖥️"
    },
    {
      title: "Expert Instructors",
      description: "Certified professionals with real-world experience",
      icon: "👨‍🏫"
    },
    {
      title: "Flexible Scheduling",
      description: "Self-paced and instructor-led training options",
      icon: "⏰"
    },
    {
      title: "Exam Preparation",
      description: "Comprehensive exam prep with practice tests",
      icon: "📚"
    }
  ];

  const vendors = [
    {
      name: "Epic Systems",
      description: "Leading EHR provider serving major health systems",
      logo: "🏥"
    },
    {
      name: "Cerner",
      description: "Comprehensive health information technology solutions",
      logo: "💻"
    },
    {
      name: "Microsoft",
      description: "Cloud and productivity solutions for healthcare",
      logo: "☁️"
    },
    {
      name: "Salesforce",
      description: "Customer relationship management for healthcare",
      logo: "📊"
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
              Software Certifications
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Master leading healthcare software platforms with comprehensive certification programs. From Epic EHR to Microsoft 365, we provide expert training for all major healthcare technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Certification
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
            <h2 className="text-4xl font-bold mb-4">Why Get Certified?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Software certifications demonstrate your expertise and commitment to excellence in healthcare technology.
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

      {/* Certification Programs */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Certification Programs</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive certification programs for leading healthcare software platforms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    cert.level === 'Beginner' ? 'bg-green-600' :
                    cert.level === 'Intermediate' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {cert.level}
                  </span>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {cert.duration}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">{cert.title}</h3>
                <p className="text-gray-300 mb-4">{cert.description}</p>

                <div className="mb-4">
                  <div className="flex items-center text-blue-400 text-sm font-medium mb-2">
                    <Award className="h-4 w-4 mr-2" />
                    {cert.vendor}
                  </div>
                  <div className="text-gray-400 text-sm">
                    Exam: {cert.exam}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-200">Key Topics:</h4>
                  <ul className="space-y-1">
                    {cert.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center text-sm text-gray-400">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Partners */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Certified Training Partners</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Official training partnerships with leading healthcare software vendors.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vendors.map((vendor, index) => (
              <motion.div
                key={vendor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{vendor.logo}</div>
                <h3 className="text-xl font-semibold mb-2">{vendor.name}</h3>
                <p className="text-gray-300">{vendor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Training Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced training methodologies designed for maximum learning effectiveness.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
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
            <h2 className="text-4xl font-bold mb-4">Ready to Get Certified?</h2>
            <p className="text-xl mb-8 opacity-90">
              Advance your career with industry-recognized software certifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Start Your Certification
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
