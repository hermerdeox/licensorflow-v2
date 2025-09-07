'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  HardHat, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  BarChart3,
  ArrowRight,
  Play,
  Star,
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function OSHAPage() {
  const courses = [
    {
      title: "OSHA 10-Hour General Industry",
      duration: "10 hours",
      description: "Comprehensive safety training for general industry workers",
      topics: [
        "Introduction to OSHA",
        "Walking and working surfaces",
        "Exit routes and emergency action plans",
        "Electrical safety",
        "Personal protective equipment"
      ],
      level: "Beginner",
      certification: "OSHA 10-Hour Card"
    },
    {
      title: "OSHA 30-Hour Construction",
      duration: "30 hours",
      description: "Advanced safety training for construction supervisors and workers",
      topics: [
        "OSHA construction standards",
        "Fall protection systems",
        "Scaffolding safety",
        "Excavation and trenching",
        "Crane and rigging safety"
      ],
      level: "Advanced",
      certification: "OSHA 30-Hour Card"
    },
    {
      title: "Bloodborne Pathogens",
      duration: "2 hours",
      description: "Essential training for healthcare workers handling blood and body fluids",
      topics: [
        "Bloodborne pathogen exposure",
        "Universal precautions",
        "Engineering controls",
        "Personal protective equipment",
        "Exposure incident procedures"
      ],
      level: "Beginner",
      certification: "Bloodborne Pathogens Certificate"
    },
    {
      title: "Hazard Communication (HazCom)",
      duration: "3 hours",
      description: "Understanding chemical hazards and safety data sheets",
      topics: [
        "Hazard communication standard",
        "Safety data sheets (SDS)",
        "Chemical labeling requirements",
        "Employee training requirements",
        "Emergency procedures"
      ],
      level: "Beginner",
      certification: "HazCom Certificate"
    },
    {
      title: "Fire Safety and Emergency Response",
      duration: "4 hours",
      description: "Fire prevention, evacuation procedures, and emergency response",
      topics: [
        "Fire prevention strategies",
        "Emergency evacuation plans",
        "Fire extinguisher use",
        "Emergency communication",
        "Post-emergency procedures"
      ],
      level: "Intermediate",
      certification: "Fire Safety Certificate"
    },
    {
      title: "Workplace Violence Prevention",
      duration: "2 hours",
      description: "Preventing and responding to workplace violence incidents",
      topics: [
        "Recognizing warning signs",
        "De-escalation techniques",
        "Reporting procedures",
        "Emergency response",
        "Recovery and support"
      ],
      level: "Intermediate",
      certification: "Workplace Violence Prevention Certificate"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "OSHA Compliant",
      description: "All courses meet or exceed OSHA training requirements and standards"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Certificates recognized by employers and regulatory agencies"
    },
    {
      icon: Users,
      title: "Team Training",
      description: "Bulk training options for organizations and departments"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Comprehensive reporting and compliance monitoring"
    }
  ];

  const features = [
    {
      title: "Interactive Learning",
      description: "Engaging multimedia content with real-world scenarios",
      icon: "🎯"
    },
    {
      title: "Mobile Access",
      description: "Complete training on any device, anywhere",
      icon: "📱"
    },
    {
      title: "Expert Instructors",
      description: "Courses developed by certified safety professionals",
      icon: "👨‍🏫"
    },
    {
      title: "Regular Updates",
      description: "Content updated to reflect latest OSHA standards",
      icon: "🔄"
    }
  ];

  const industries = [
    {
      name: "Healthcare",
      description: "Hospitals, clinics, and medical facilities",
      icon: "🏥"
    },
    {
      name: "Construction",
      description: "Building and infrastructure projects",
      icon: "🏗️"
    },
    {
      name: "Manufacturing",
      description: "Production facilities and industrial sites",
      icon: "🏭"
    },
    {
      name: "Retail",
      description: "Stores, warehouses, and distribution centers",
      icon: "🛒"
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
              OSHA Safety Training
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive OSHA training courses designed to keep your workforce safe and compliant. From basic safety awareness to advanced construction safety.
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
            <h2 className="text-4xl font-bold mb-4">Why Choose Our OSHA Training?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry-leading safety training that meets OSHA requirements and keeps your workforce protected.
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

      {/* Training Courses */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">OSHA Training Courses</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive safety training courses covering all major OSHA standards and requirements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.level === 'Beginner' ? 'bg-green-600' :
                    course.level === 'Intermediate' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {course.level}
                  </span>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                <p className="text-gray-300 mb-4">{course.description}</p>

                <div className="mb-4">
                  <div className="flex items-center text-blue-400 text-sm font-medium">
                    <Award className="h-4 w-4 mr-2" />
                    {course.certification}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-200">Key Topics:</h4>
                  <ul className="space-y-1">
                    {course.topics.map((topic, topicIndex) => (
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

      {/* Industries Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Industry-Specific Training</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tailored OSHA training programs for different industries and workplace environments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                <p className="text-gray-300">{industry.description}</p>
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
            <h2 className="text-4xl font-bold mb-4">Advanced Learning Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Modern training tools designed to maximize safety knowledge and retention.
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
            <h2 className="text-4xl font-bold mb-4">Ready to Improve Workplace Safety?</h2>
            <p className="text-xl mb-8 opacity-90">
              Protect your workforce and ensure OSHA compliance with our comprehensive training programs.
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
