'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Key, 
  Database, 
  Shield,
  Zap,
  Book,
  Copy,
  CheckCircle,
  ExternalLink,
  Terminal,
  Globe,
  Lock
} from 'lucide-react';
import { useState } from 'react';

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'authentication', label: 'Authentication', icon: Key },
    { id: 'endpoints', label: 'Endpoints', icon: Database },
    { id: 'examples', label: 'Examples', icon: Code },
    { id: 'sdks', label: 'SDKs', icon: Terminal }
  ];

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/users',
      description: 'Retrieve all users in your organization',
      parameters: [
        { name: 'page', type: 'integer', required: false, description: 'Page number for pagination' },
        { name: 'limit', type: 'integer', required: false, description: 'Number of users per page' },
        { name: 'role', type: 'string', required: false, description: 'Filter by user role' }
      ],
      response: {
        status: 200,
        data: {
          users: [
            {
              id: "user_123",
              email: "john.doe@example.com",
              firstName: "John",
              lastName: "Doe",
              role: "admin",
              lastLogin: "2024-01-15T10:30:00Z"
            }
          ],
          pagination: {
            page: 1,
            limit: 50,
            total: 150
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/api/v1/courses',
      description: 'Create a new training course',
      parameters: [
        { name: 'title', type: 'string', required: true, description: 'Course title' },
        { name: 'description', type: 'string', required: true, description: 'Course description' },
        { name: 'category', type: 'string', required: true, description: 'Course category' },
        { name: 'duration', type: 'integer', required: true, description: 'Course duration in minutes' }
      ],
      response: {
        status: 201,
        data: {
          id: "course_456",
          title: "HIPAA Compliance Training",
          description: "Comprehensive HIPAA training course",
          category: "compliance",
          duration: 120,
          createdAt: "2024-01-15T10:30:00Z"
        }
      }
    },
    {
      method: 'GET',
      path: '/api/v1/compliance/status',
      description: 'Get compliance status for your organization',
      parameters: [],
      response: {
        status: 200,
        data: {
          overallStatus: "compliant",
          lastAudit: "2024-01-01T00:00:00Z",
          nextAudit: "2024-07-01T00:00:00Z",
          complianceScore: 95,
          areas: [
            {
              name: "HIPAA",
              status: "compliant",
              score: 98,
              lastUpdated: "2024-01-10T00:00:00Z"
            }
          ]
        }
      }
    }
  ];

  const codeExamples = [
    {
      language: 'JavaScript',
      title: 'Fetch Users with JavaScript',
      code: `// Fetch users with authentication
const response = await fetch('https://api.licensorflow.com/v1/users', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data.users);`
    },
    {
      language: 'Python',
      title: 'Create Course with Python',
      code: `import requests

# Create a new course
url = 'https://api.licensorflow.com/v1/courses'
headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}
data = {
    'title': 'HIPAA Compliance Training',
    'description': 'Comprehensive HIPAA training course',
    'category': 'compliance',
    'duration': 120
}

response = requests.post(url, json=data, headers=headers)
course = response.json()
print(f"Created course: {course['id']}")`
    },
    {
      language: 'cURL',
      title: 'Get Compliance Status with cURL',
      code: `curl -X GET "https://api.licensorflow.com/v1/compliance/status" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
    }
  ];

  const sdks = [
    {
      name: 'JavaScript/Node.js',
      description: 'Official SDK for JavaScript and Node.js applications',
      version: 'v2.1.0',
      install: 'npm install @licensorflow/sdk',
      documentation: 'https://docs.licensorflow.com/sdk/javascript'
    },
    {
      name: 'Python',
      description: 'Official SDK for Python applications',
      version: 'v1.8.0',
      install: 'pip install licensorflow-sdk',
      documentation: 'https://docs.licensorflow.com/sdk/python'
    },
    {
      name: 'PHP',
      description: 'Official SDK for PHP applications',
      version: 'v1.5.0',
      install: 'composer require licensorflow/sdk',
      documentation: 'https://docs.licensorflow.com/sdk/php'
    },
    {
      name: 'Go',
      description: 'Official SDK for Go applications',
      version: 'v1.2.0',
      install: 'go get github.com/licensorflow/sdk-go',
      documentation: 'https://docs.licensorflow.com/sdk/go'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "OAuth 2.0 and API key authentication with enterprise-grade security"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Webhook support for real-time notifications and data synchronization"
    },
    {
      icon: Database,
      title: "Comprehensive Data Access",
      description: "Full access to all LicensorFlow data through RESTful API endpoints"
    },
    {
      icon: Globe,
      title: "Global Availability",
      description: "API available worldwide with 99.9% uptime guarantee"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

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
              API Documentation
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Integrate LicensorFlow with your applications using our comprehensive REST API. Build powerful healthcare compliance solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Key className="mr-2 h-5 w-5" />
                Get API Key
              </button>
              <a
                href="https://docs.licensorflow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Full Documentation
              </a>
            </div>
          </motion.div>
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
            <h2 className="text-4xl font-bold mb-4">API Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful features designed for healthcare compliance applications.
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Documentation Tabs */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">API Reference</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete reference for all API endpoints, authentication, and examples.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-6">API Overview</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Base URL</h4>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-blue-400">
                      https://api.licensorflow.com/v1
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Rate Limits</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• 1000 requests per hour for authenticated requests</li>
                      <li>• 100 requests per hour for unauthenticated requests</li>
                      <li>• Rate limit headers included in all responses</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Response Format</h4>
                    <p className="text-gray-300 mb-3">All API responses are returned in JSON format with the following structure:</p>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      {`{
  "data": { ... },
  "pagination": { ... },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "v1"
  }
}`}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'authentication' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-6">Authentication</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">API Key Authentication</h4>
                    <p className="text-gray-300 mb-3">Include your API key in the Authorization header:</p>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      Authorization: Bearer YOUR_API_KEY
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3">OAuth 2.0</h4>
                    <p className="text-gray-300 mb-3">For more secure applications, use OAuth 2.0:</p>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      Authorization: Bearer ACCESS_TOKEN
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'endpoints' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-6">API Endpoints</h3>
                <div className="space-y-8">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <span className={`px-3 py-1 rounded text-sm font-medium mr-4 ${
                          endpoint.method === 'GET' ? 'bg-green-600' : 'bg-blue-600'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-blue-400 font-mono">{endpoint.path}</code>
                      </div>
                      <p className="text-gray-300 mb-4">{endpoint.description}</p>
                      
                      {endpoint.parameters.length > 0 && (
                        <div className="mb-4">
                          <h5 className="font-semibold mb-2">Parameters:</h5>
                          <div className="space-y-2">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <div key={paramIndex} className="flex items-center text-sm">
                                <code className="text-blue-400 mr-2">{param.name}</code>
                                <span className="text-gray-400 mr-2">({param.type})</span>
                                <span className={`px-2 py-1 rounded text-xs mr-2 ${
                                  param.required ? 'bg-red-600' : 'bg-gray-600'
                                }`}>
                                  {param.required ? 'required' : 'optional'}
                                </span>
                                <span className="text-gray-300">{param.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h5 className="font-semibold mb-2">Response:</h5>
                        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                          <pre>{JSON.stringify(endpoint.response, null, 2)}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'examples' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-6">Code Examples</h3>
                <div className="space-y-8">
                  {codeExamples.map((example, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">{example.title}</h4>
                        <button
                          onClick={() => copyToClipboard(example.code)}
                          className="flex items-center px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-gray-300">{example.code}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'sdks' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-6">Official SDKs</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {sdks.map((sdk, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">{sdk.name}</h4>
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                          {sdk.version}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{sdk.description}</p>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-400">Install:</span>
                          <div className="bg-gray-900 rounded p-2 font-mono text-sm text-blue-400">
                            {sdk.install}
                          </div>
                        </div>
                        <div>
                          <a
                            href={sdk.documentation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Documentation
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
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
            <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start building powerful healthcare compliance applications with our API.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                <Key className="mr-2 h-5 w-5" />
                Get API Key
              </button>
              <a
                href="https://docs.licensorflow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
              >
                <Book className="mr-2 h-5 w-5" />
                Full Documentation
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
