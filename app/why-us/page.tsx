'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Award, 
  Users, 
  Clock, 
  BarChart3, 
  Heart,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Quote,
  TrendingUp,
  Zap,
  Lock,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function WhyUsPage() {
  const stats = [
    { number: "10,000+", label: "Healthcare Professionals Trained" },
    { number: "500+", label: "Healthcare Organizations" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Support Available" }
  ];

  const differentiators = [
    {
      icon: Heart,
      title: "Healthcare-First Design",
      description: "Built specifically for healthcare organizations with deep understanding of compliance requirements, workflows, and challenges unique to the industry.",
      features: [
        "HIPAA-compliant by design",
        "Healthcare-specific workflows",
        "Industry terminology and standards",
        "Regulatory compliance focus"
      ]
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Your data security is our top priority. We maintain the highest standards of security and compliance to protect your sensitive information.",
      features: [
        "SOC 2 Type II certified",
        "End-to-end encryption",
        "Regular security audits",
        "GDPR and HIPAA compliant"
      ]
    },
    {
      icon: Zap,
      title: "Lightning-Fast Implementation",
      description: "Get up and running in days, not months. Our streamlined onboarding process gets your team trained and compliant quickly.",
      features: [
        "Quick setup and configuration",
        "Pre-built compliance templates",
        "Automated user provisioning",
        "Dedicated implementation support"
      ]
    },
    {
      icon: BarChart3,
      title: "Proven ROI",
      description: "Our customers see measurable improvements in compliance efficiency, reduced administrative overhead, and better audit outcomes.",
      features: [
        "70% reduction in admin time",
        "40% faster compliance completion",
        "95% audit pass rate",
        "Measurable cost savings"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Medical Officer",
      company: "Riverside Medical Center",
      content: "LicensorFlow has transformed how we handle compliance training. The platform is intuitive, comprehensive, and our staff completion rates have increased by 40%.",
      rating: 5,
      avatar: "SM"
    },
    {
      name: "Michael Chen",
      role: "IT Director",
      company: "Metro Health Systems",
      content: "The license management features alone have saved us thousands of dollars in unnecessary renewals and helped us stay compliant across all our software.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Jennifer Rodriguez",
      role: "Compliance Officer",
      company: "Valley Healthcare Group",
      content: "Finally, a platform that understands healthcare compliance. The automated reporting and tracking features have made our audits so much smoother.",
      rating: 5,
      avatar: "JR"
    }
  ];

  const awards = [
    { name: "Best Healthcare Compliance Platform 2024", organization: "Healthcare Innovation Awards" },
    { name: "Top Training Solution", organization: "Healthcare IT News" },
    { name: "Security Excellence Award", organization: "Healthcare Security Alliance" },
    { name: "Customer Choice Award", organization: "Healthcare Technology Review" }
  ];

  const team = [
    {
      name: "Dr. Emily Watson",
      role: "Chief Medical Officer",
      background: "Former Chief Compliance Officer at Mayo Clinic with 15+ years in healthcare compliance",
      expertise: "HIPAA, Healthcare Regulations, Risk Management"
    },
    {
      name: "James Rodriguez",
      role: "Head of Product",
      background: "Former Epic Systems engineer with deep expertise in healthcare software integration",
      expertise: "Healthcare Software, Integration, User Experience"
    },
    {
      name: "Dr. Michael Park",
      role: "Chief Technology Officer",
      background: "Former Google engineer specializing in enterprise security and compliance systems",
      expertise: "Security, Compliance, Enterprise Architecture"
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
              Why Choose LicensorFlow?
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We're not just another compliance platform. We're healthcare professionals who understand your challenges and built a solution that actually works.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                See Our Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center px-8 py-4 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We've built LicensorFlow from the ground up with healthcare organizations in mind, not as an afterthought.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg p-8 border border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-600 rounded-lg mr-4">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-6">{item.description}</p>
                
                <ul className="space-y-3">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what healthcare professionals are saying about LicensorFlow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-blue-400 mb-4" />
                
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
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

      {/* Awards Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Recognized Excellence</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry recognition for our commitment to healthcare compliance excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700"
              >
                <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{award.name}</h3>
                <p className="text-gray-400 text-sm">{award.organization}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Built by Healthcare Experts</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our team combines deep healthcare experience with cutting-edge technology expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700 text-center"
              >
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <div className="text-blue-400 font-medium mb-3">{member.role}</div>
                <p className="text-gray-300 text-sm mb-4">{member.background}</p>
                <div className="text-gray-400 text-sm">
                  <strong>Expertise:</strong> {member.expertise}
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
            <h2 className="text-4xl font-bold mb-4">Ready to Experience the Difference?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of healthcare organizations who trust LicensorFlow for their compliance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
              >
                Schedule a Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
