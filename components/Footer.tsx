"use client";

import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube,
  Shield, Award, FileText, Lock, ChevronRight, ExternalLink
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Course Catalog', href: '/courses' },
      { name: 'License Vault', href: '/license-vault' },
      { name: 'Integrations', href: '/integrations' },
      { name: 'API Documentation', href: '/api-docs' },
    ],
    compliance: [
      { name: 'HIPAA Training', href: '/hipaa' },
      { name: 'OSHA Courses', href: '/osha' },
      { name: 'Software Certifications', href: '/certifications' },
      { name: 'Compliance Calendar', href: '/calendar' },
      { name: 'Regulatory Updates', href: '/updates' },
      { name: 'Resource Library', href: '/resources' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Partners', href: '/partners' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'HIPAA Compliance', href: '/hipaa-compliance' },
      { name: 'Data Security', href: '/security' },
      { name: 'SLA', href: '/sla' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/licensorflow', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/licensorflow', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/licensorflow', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/licensorflow', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Company Info Section */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-6">
              <Image 
                src="/licensor-flow-logo.png" 
                alt="LicensorFlow" 
                width={220}
                height={70}
                className="opacity-90"
              />
            </div>
            
            {/* Description */}
            <p className="text-gray-400 mb-6 max-w-md">
              The Complete License Management and Compliance Training Platform for Healthcare 
              and Dental Professionals. Streamline HIPAA & OSHA Training, Manage Software 
              Certifications, and Maintain Regulatory Compliance with Confidence.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3 text-blue-500" />
                <a href="mailto:support@licensorflow.com" className="hover:text-white transition-colors">
                  support@licensorflow.com
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3 text-blue-500" />
                <a href="tel:1-888-555-0123" className="hover:text-white transition-colors">
                  1-888-555-0123
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3 text-blue-500" />
                <span>611 South DuPont Highway Suite 102<br />Dover, DE 19901</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-600 border border-gray-700 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 hover:text-blue-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Product Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm inline-flex items-start group"
                    >
                      <ChevronRight className="w-3 h-3 mt-0.5 mr-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      <span className="leading-tight">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compliance Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Compliance</h3>
              <ul className="space-y-2">
                {footerLinks.compliance.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm inline-flex items-start group"
                    >
                      <ChevronRight className="w-3 h-3 mt-0.5 mr-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      <span className="leading-tight">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm inline-flex items-start group"
                    >
                      <ChevronRight className="w-3 h-3 mt-0.5 mr-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      <span className="leading-tight">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm inline-flex items-start group"
                    >
                      <ChevronRight className="w-3 h-3 mt-0.5 mr-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      <span className="leading-tight">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="flex items-center text-gray-400">
              <Shield className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-sm">HIPAA Compliant</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Lock className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-sm">256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Award className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-sm">SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center text-gray-400">
              <FileText className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-sm">21 CFR Part 11 Compliant</span>
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="text-center space-y-4">
            <p className="text-xs text-gray-500 max-w-4xl mx-auto">
              <strong>Healthcare Compliance Disclaimer:</strong> LicensorFlow provides educational content and training materials 
              designed to assist healthcare professionals in understanding compliance requirements. This platform does not constitute 
              legal advice. Organizations should consult with qualified legal counsel to ensure full compliance with HIPAA, OSHA, 
              and other applicable regulations.
            </p>
            
            <p className="text-xs text-gray-500 max-w-4xl mx-auto">
              <strong>Certification Notice:</strong> Certificates issued through LicensorFlow are based on successful completion 
              of our training courses. While our courses are designed to meet industry standards, acceptance of certificates 
              may vary by organization. Please verify with your employer or regulatory body regarding specific certification 
              requirements.
            </p>

            <p className="text-xs text-gray-500 max-w-4xl mx-auto">
              <strong>Data Protection:</strong> We are committed to protecting your personal and organizational data. 
              All information is encrypted and stored in accordance with HIPAA security requirements. We never sell or 
              share your data with third parties without explicit consent.
            </p>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2025 EOXLabs LLC | Bleeding Edge Development | Brutally Fast.</p>
            <div className="flex items-center mt-4 md:mt-0 space-x-6">
              <Link href="/sitemap" className="hover:text-gray-300 transition-colors">
                Sitemap
              </Link>
              <Link href="/accessibility" className="hover:text-gray-300 transition-colors">
                Accessibility
              </Link>
              <Link href="/compliance-center" className="hover:text-gray-300 transition-colors">
                Compliance Center
              </Link>
              <a 
                href="https://status.licensorflow.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors flex items-center"
              >
                System Status
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
