'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  FileText, 
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  BarChart3,
  ArrowRight,
  Play,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function HIPAAPage() {
  const modules = [
    {
      title: "HIPAA Fundamentals",
      duration: "45 minutes",
      description: "Core principles of HIPAA compliance and patient privacy protection",
      topics: [
        "HIPAA Privacy Rule overview",
        "Protected Health Information (PHI)",
        "Minimum necessary standard",
        "Patient rights and access"
      ],
      level: "Beginner"
    },
    {
      title: "Administrative Safeguards",
      duration: "60 minutes",
      description: "Administrative policies and procedures for HIPAA compliance",
      topics: [
        "Security officer responsibilities",
        "Workforce training requirements",
        "Access management procedures",
        "Incident response protocols"
      ],
      level: "Intermediate"
    },
    {
      title: "Physical Safeguards",
      duration: "40 minutes",
      description: "Physical security measures for protecting patient information",
      topics: [
        "Facility access controls",
        "Workstation security",
        "Device and media controls",
        "Disposal of PHI"
      ],
      level: "Intermediate"
    },
    {
      title: "Technical Safeguards",
      duration: "55 minutes",
      description: "Technology-based security measures and controls",
      topics: [
        "Access control systems",
        "Audit controls and logging",
        "Data encryption requirements",
        "Transmission security"
      ],
      level: "Advanced"
    },
    {
      title: "Breach Notification",
      duration: "35 minutes",
      description: "Procedures for handling and reporting security breaches",
      topics: [
        "Breach definition and assessment",
        "Notification timelines",
        "Required documentation",
        "Regulatory reporting"
      ],
      level: "Intermediate"
    },
    {
      title: "Business Associate Agreements",
      duration: "50 minutes",
      description: "Managing third-party relationships and data sharing",
      topics: [
        "BAA requirements and components",
        "Vendor risk assessment",
        "Ongoing monitoring",
        "Contract termination procedures"
      ],
      level: "Advanced"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Comprehensive Coverage",
      description: "Complete HIPAA training covering all aspects of the Privacy and Security Rules"
    },
    {
      icon: Users,
      title: "Role-Based Training",
      description: "Customized content based on job functions and access levels"
    },
    {
      icon: Award,
      title: "Certification",
      description: "Industry-recognized certificates upon successful completion"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Detailed reporting and analytics for compliance monitoring"
    }
  ];

  const features = [
    {
      title: "Interactive Scenarios",
      description: "Real-world case studies and decision-making exercises",
      icon: "🎯"
    },
    {
      title: "Mobile Learning",
      description: "Access training on any device, anywhere, anytime",
      icon: "📱"
    },
    {
      title: "Multilingual Support",
      description: "Available in English, Spanish, and other languages",
      icon: "🌍"
    },
    {
      title: "Regular Updates",
      description: "Content updated to reflect latest regulatory changes",
      icon: "🔄"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Maria Rodriguez",
      role: "Chief Compliance Officer",
      company: "Metro Health Systems",
      content: "The HIPAA training modules are comprehensive and engaging. Our staff completion rates increased by 60% after implementing LicensorFlow.",
      rating: 5
    },
    {
      name: "James Thompson",
      role: "IT Security Manager",
      company: "Regional Medical Center",
      content: "The technical safeguards module was particularly valuable for our IT team. Clear, practical guidance on implementation.",
      rating: 5
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
              HIPAA Training & Compliance
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive HIPAA training designed specifically for healthcare professionals. Ensure your team understands and implements proper patient privacy protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Training
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
            <h2 className="text-4xl font-bold mb-4">Why Choose Our HIPAA Training?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry-leading HIPAA training that goes beyond basic compliance to build a culture of privacy protection.
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

      {/* Training Modules */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Comprehensive Training Modules</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Six comprehensive modules covering all aspects of HIPAA compliance and patient privacy protection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    module.level === 'Beginner' ? 'bg-green-600' :
                    module.level === 'Intermediate' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {module.level}
                  </span>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">{module.title}</h3>
                <p className="text-gray-300 mb-4">{module.description}</p>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-200">Key Topics:</h4>
                  <ul className="space-y-1">
                    {module.topics.map((topic, topicIndex) => (
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

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Advanced Learning Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Modern learning tools designed to maximize engagement and retention.
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

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Healthcare Professionals Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by healthcare organizations nationwide for HIPAA compliance training.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm">{testimonial.company}</div>
                  </div>
                </div>
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
            <h2 className="text-4xl font-bold mb-4">Ready to Ensure HIPAA Compliance?</h2>
            <p className="text-xl mb-8 opacity-90">
              Protect your patients and your organization with comprehensive HIPAA training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Get Started Today
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
