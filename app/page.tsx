"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Shield, Award, Users, BookOpen, Lock, Clock, 
  CheckCircle, Star, ArrowRight, Play, Zap, 
  Building, GraduationCap, FileCheck, TrendingUp,
  LogIn, Calendar
} from 'lucide-react';
import Footer from '@/components/Footer';

// Modern gradient mesh background - lightweight and sophisticated
const ModernBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Static gradient mesh - no animations for better performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-teal-900/10" />
      
      {/* Subtle geometric patterns using CSS */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(251, 146, 60, 0.2) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Minimal floating elements - only 3 instead of 60 */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-teal-500/10 rounded-full blur-xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-20 h-20 bg-orange-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
};

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const statistics = [
    { value: "10,000+", label: "Healthcare Professionals Trained", icon: Users },
    { value: "500+", label: "Healthcare Facilities", icon: Building },
    { value: "98%", label: "Certification Pass Rate", icon: GraduationCap },
    { value: "24/7", label: "Platform Availability", icon: Clock }
  ];

  const services = [
    {
      title: "HIPAA Compliance Training",
      description: "Comprehensive HIPAA Privacy and Security Rule training with certification upon completion.",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
      features: ["Privacy Rule Training", "Security Rule Mastery", "Annual Recertification", "Breach Response"],
      link: "/courses?category=hipaa"
    },
    {
      title: "OSHA Safety Courses",
      description: "Meet OSHA requirements with our healthcare-specific safety training programs.",
      icon: FileCheck,
      color: "from-teal-500 to-teal-600",
      features: ["Bloodborne Pathogens", "Hazard Communication", "Emergency Planning", "Ergonomics"],
      link: "/courses?category=osha"
    },
    {
      title: "Software Certifications",
      description: "Master leading healthcare software platforms with hands-on training.",
      icon: Award,
      color: "from-green-500 to-green-600",
      features: ["Epic EHR Training", "Cerner PowerChart", "Dentrix Mastery", "Microsoft 365"],
      link: "/courses?category=software"
    },
    {
      title: "License Vault",
      description: "Securely store and manage all your software licenses in one encrypted location.",
      icon: Lock,
      color: "from-orange-500 to-orange-600",
      features: ["Encrypted Storage", "Expiry Alerts", "Team Sharing", "Cost Tracking"],
      link: "/license-vault"
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
      name: "James Rodriguez",
      role: "IT Director",
      company: "Dental Associates Group",
      content: "The License Vault feature alone has saved us thousands of dollars by preventing duplicate purchases and missed renewals. Absolutely essential for any healthcare organization.",
      rating: 5,
      avatar: "JR"
    },
    {
      name: "Emily Chen",
      role: "Compliance Manager",
      company: "Unity Health Systems",
      content: "Finally, a training platform that understands healthcare. The courses are relevant, up-to-date, and the certification process is seamless. Highly recommended!",
      rating: 5,
      avatar: "EC"
    }
  ];

  const benefits = [
    {
      title: "Save Time & Resources",
      description: "Automated training assignments, progress tracking, and certification management eliminate administrative burden.",
      icon: Clock
    },
    {
      title: "Ensure Compliance",
      description: "Stay current with ever-changing healthcare regulations with our regularly updated course content.",
      icon: Shield
    },
    {
      title: "Improve Outcomes",
      description: "Better trained staff leads to improved patient care, safety, and organizational efficiency.",
      icon: TrendingUp
    },
    {
      title: "Reduce Risk",
      description: "Minimize compliance violations and potential penalties with comprehensive training documentation.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black/98 to-gray-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced gradient background - much darker */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-gray-950/90" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-teal-900/8 to-orange-900/5" />
        </div>

        {/* Modern lightweight background */}
        <ModernBackground />


        <motion.div 
          className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-32"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.1, 0.25, 1],
            opacity: { duration: 0.8 },
            scale: { duration: 1, ease: "easeOut" },
            y: { duration: 1, ease: "easeOut" }
          }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-gray-200">
              Trusted by 500+ Healthcare Organizations
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-teal-400 to-orange-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Healthcare Compliance
            <br />
            Made Simple
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Complete License Management Platform With HIPAA & OSHA Training, Software Certifications 
            For Healthcare And Dental Professionals.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/register">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl transform transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link href="/demo">
              <motion.button
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transform transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="inline-block mr-2 w-5 h-5" />
                Watch Demo
              </motion.button>
            </Link>
          </motion.div>

          <motion.p 
            className="text-sm text-gray-400 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            No Credit Card Required • 30-Day Free Trial • Cancel Anytime
          </motion.p>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-teal-400" />
                </div>
                <motion.div 
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Comprehensive Training & Management
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything your healthcare organization needs for compliance, certification, and license management in one platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${service.color} rounded-xl mb-6`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-teal-400 mr-2 flex-shrink-0" />
                        {feature}
          </li>
                    ))}
                  </ul>
                  
                  <Link href={service.link}>
                    <motion.button
                      className="text-white font-semibold flex items-center group"
                      whileHover={{ x: 5 }}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-950">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the perfect plan for your healthcare organization. Upgrade or downgrade anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <motion.div
              className="relative bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-bold text-white">$0</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-400">Perfect for getting started</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Access to most standard services and products</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Discounted prices on software licenses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Basic compliance resources</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Community support</span>
                </li>
                <li className="flex items-start text-gray-500">
                  <span className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-gray-600">✕</span>
                  <span className="line-through">Installation support</span>
                </li>
              </ul>

              <Link href="/register">
                <motion.button
                  className="w-full px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started Free
                </motion.button>
              </Link>
            </motion.div>

            {/* Professional Plan - Most Popular */}
            <motion.div
              className="relative bg-gradient-to-b from-blue-900/20 to-gray-800/30 backdrop-blur-sm border-2 border-blue-500 rounded-2xl p-8 hover:border-blue-400 transition-all duration-300 transform scale-105"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.07 }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-bold text-white">$15</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-400">Essential tools for healthcare teams</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Full access to License Vault</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Discounted prices on all products</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">50% off hourly consulting rates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Priority email & chat support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Discounted course pricing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Monthly compliance updates</span>
                </li>
              </ul>

              <Link href="/register">
                <motion.button
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-teal-400 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Free Trial
                </motion.button>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              className="relative bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-bold text-white">$25</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-400">Complete solution for organizations</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-semibold">Everything in Professional, plus:</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">50% off HIPAA consulting services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">50% off new staff HIPAA onboarding</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Major discounts on software licenses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Installation support included</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Full access to educational materials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Dedicated account manager</span>
                </li>
              </ul>

              <Link href="/register">
                <motion.button
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Sales
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Additional Features */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-400 mb-8">All plans include:</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center text-gray-300">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                <span>HIPAA Compliant Platform</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Lock className="w-5 h-5 mr-2 text-green-400" />
                <span>Secure Data Encryption</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Award className="w-5 h-5 mr-2 text-green-400" />
                <span>Compliance Certificates</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="w-5 h-5 mr-2 text-green-400" />
                <span>24/7 Platform Access</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-950 to-black">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose LicensorFlow?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of healthcare organizations that trust us for their compliance and training needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-lg mb-4">
                  <benefit.icon className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Healthcare Leaders
            </h2>
            <p className="text-xl text-gray-400">
              See what healthcare professionals say about LicensorFlow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    <div className="text-gray-500 text-xs">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Streamline Your Compliance Training?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join over 10,000 healthcare professionals already using LicensorFlow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <motion.button
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-xl hover:shadow-2xl transform transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Free Trial
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transform transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Demo
                </motion.button>
              </Link>
            </div>
            <p className="text-white/80 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
