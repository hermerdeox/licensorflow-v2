'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Users,
  Headphones,
  Calendar
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const ContactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  organization: z.string().min(2, 'Organization name is required'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  inquiryType: z.enum(['sales', 'support', 'partnership', 'demo', 'other']),
});

type ContactFormData = z.infer<typeof ContactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact form submitted:', data);
      setIsSubmitted(true);
      reset();
      toast.success('Thank you for your message! We\'ll get back to you within 24 hours.');
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our healthcare compliance experts",
      contact: "+1 877 344 3423",
      availability: "Mon-Fri 8AM-6PM EST",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses to your compliance questions",
      contact: "support@licensorflow.com",
      availability: "24/7 response within 4 hours",
      color: "from-green-500 to-green-600"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant support for urgent compliance issues",
      contact: "Available on website",
      availability: "Mon-Fri 9AM-5PM EST",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Calendar,
      title: "Schedule Demo",
      description: "Book a personalized demo with our team",
      contact: "Book online",
      availability: "Flexible scheduling",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const offices = [
    {
      city: "Dover, DE",
      address: "611 South DuPont Highway Suite 102, Dover, DE 19901",
      phone: "+1 877 344 3423",
      email: "support@licensorflow.com",
      hours: "Mon-Fri 8AM-6PM EST"
    }
  ];

  const faqs = [
    {
      question: "How quickly can I get started with LicensorFlow?",
      answer: "Most organizations can be up and running within 24-48 hours. Our implementation team will work with you to ensure a smooth onboarding process."
    },
    {
      question: "Do you offer training for our staff?",
      answer: "Yes, we provide comprehensive training for administrators and end-users, including live sessions, documentation, and ongoing support."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 email support, phone support during business hours, live chat, and dedicated account management for enterprise customers."
    },
    {
      question: "Can LicensorFlow integrate with our existing systems?",
      answer: "Absolutely. We offer integrations with major EHR systems, HR platforms, and other healthcare software. Our API allows for custom integrations as well."
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-16 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-gray-800 rounded-lg p-8 text-center border border-gray-700"
        >
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Message Sent Successfully!</h2>
          <p className="text-gray-300 mb-6">
            Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Ready to transform your healthcare compliance? Our team of experts is here to help you get started.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How Can We Help?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the best way to reach our healthcare compliance experts.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center hover:border-gray-600 transition-colors"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${method.color} rounded-lg mb-4`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-300 mb-4">{method.description}</p>
                <div className="text-blue-400 font-medium mb-2">{method.contact}</div>
                <div className="text-gray-400 text-sm">{method.availability}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-xl text-gray-300">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-lg p-8 border border-gray-700"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    className="w-full rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    {...register('lastName')}
                    type="text"
                    className="w-full rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-2">
                  Organization *
                </label>
                <input
                  {...register('organization')}
                  type="text"
                  className="w-full rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  disabled={isSubmitting}
                />
                {errors.organization && (
                  <p className="mt-1 text-sm text-red-400">{errors.organization.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-300 mb-2">
                  Inquiry Type *
                </label>
                <select
                  {...register('inquiryType')}
                  className="w-full rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="">Select inquiry type</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="demo">Request Demo</option>
                  <option value="other">Other</option>
                </select>
                {errors.inquiryType && (
                  <p className="mt-1 text-sm text-red-400">{errors.inquiryType.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  className="w-full rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  className="w-full rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Office</h2>
            <p className="text-xl text-gray-300">
              Visit us at our headquarters in Dover, Delaware.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg p-8 border border-gray-700"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-blue-600 rounded-lg mr-6">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">{office.city}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-300">{office.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-300">{office.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-300">{office.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-300">{office.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">
              Quick answers to common questions about LicensorFlow.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
