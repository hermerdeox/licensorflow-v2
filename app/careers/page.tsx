'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Heart,
  Zap,
  Shield,
  Globe,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote / Dover, DE",
      type: "Full-time",
      description: "Lead development of our healthcare compliance platform using modern technologies.",
      requirements: [
        "5+ years of software development experience",
        "Proficiency in React, Node.js, and TypeScript",
        "Experience with healthcare or compliance software",
        "Strong problem-solving and communication skills"
      ]
    },
    {
      title: "Healthcare Compliance Specialist",
      department: "Product",
      location: "Remote / Dover, DE",
      type: "Full-time",
      description: "Ensure our platform meets healthcare compliance requirements and industry standards.",
      requirements: [
        "3+ years in healthcare compliance or regulatory affairs",
        "Knowledge of HIPAA, OSHA, and other healthcare regulations",
        "Experience with compliance training and documentation",
        "Strong attention to detail and analytical skills"
      ]
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / Dover, DE",
      type: "Full-time",
      description: "Help healthcare organizations maximize the value of our compliance platform.",
      requirements: [
        "3+ years in customer success or account management",
        "Experience with healthcare or SaaS platforms",
        "Excellent communication and relationship-building skills",
        "Ability to understand complex compliance requirements"
      ]
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote / Dover, DE",
      type: "Full-time",
      description: "Build and maintain our cloud infrastructure and deployment pipelines.",
      requirements: [
        "4+ years of DevOps or infrastructure experience",
        "Proficiency with AWS, Docker, and Kubernetes",
        "Experience with CI/CD pipelines and monitoring",
        "Knowledge of security best practices"
      ]
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "Remote / Dover, DE",
      type: "Full-time",
      description: "Identify and qualify potential healthcare organization customers.",
      requirements: [
        "1-2 years of sales or business development experience",
        "Interest in healthcare technology and compliance",
        "Strong communication and prospecting skills",
        "Self-motivated and results-oriented"
      ]
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote / Dover, DE",
      type: "Full-time",
      description: "Design intuitive and accessible user experiences for healthcare professionals.",
      requirements: [
        "3+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or similar tools",
        "Experience with healthcare or enterprise software",
        "Understanding of accessibility standards"
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance for you and your family"
    },
    {
      icon: Zap,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and unlimited PTO"
    },
    {
      icon: Shield,
      title: "Professional Development",
      description: "Learning budget, conference attendance, and career growth opportunities"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Help healthcare organizations worldwide improve compliance and patient safety"
    }
  ];

  const values = [
    {
      title: "Healthcare First",
      description: "Everything we do is designed to improve healthcare outcomes and patient safety",
      icon: "🏥"
    },
    {
      title: "Innovation",
      description: "We embrace new technologies and creative solutions to complex problems",
      icon: "💡"
    },
    {
      title: "Collaboration",
      description: "We work together as one team, supporting each other's growth and success",
      icon: "🤝"
    },
    {
      title: "Integrity",
      description: "We maintain the highest ethical standards in all our interactions",
      icon: "⚖️"
    }
  ];

  const culture = [
    {
      title: "Remote-First",
      description: "Work from anywhere with occasional team gatherings and collaboration sessions"
    },
    {
      title: "Diverse & Inclusive",
      description: "We celebrate diversity and create an inclusive environment for all team members"
    },
    {
      title: "Growth Mindset",
      description: "Continuous learning and improvement are core to our company culture"
    },
    {
      title: "Work-Life Balance",
      description: "We believe in sustainable work practices that support both personal and professional growth"
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
              Join Our Team
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Help us transform healthcare compliance and make a real impact on patient safety. Join a team of passionate professionals building the future of healthcare technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#open-positions"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do at LicensorFlow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We invest in our team's well-being and professional growth.
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

      {/* Culture Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Culture</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              What it's like to work at LicensorFlow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {culture.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our growing team and help shape the future of healthcare compliance.
            </p>
          </motion.div>

          <div className="space-y-8">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg p-8 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-gray-400">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {position.department}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {position.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {position.type}
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>

                <p className="text-gray-300 mb-6">{position.description}</p>

                <div>
                  <h4 className="font-semibold mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {position.requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{requirement}</span>
                      </li>
                    ))}
                  </ul>
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
            <h2 className="text-4xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for talented individuals who share our passion for healthcare technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Send Us Your Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
