'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

export default function DashboardCompliancePage() {
  const complianceAreas = [
    {
      name: "HIPAA",
      status: "Compliant",
      score: 95,
      lastAudit: "2024-01-15",
      nextAudit: "2024-07-15",
      trend: "up",
      requirements: [
        { name: "Privacy Rule Training", status: "completed", due: null },
        { name: "Security Rule Assessment", status: "completed", due: null },
        { name: "Breach Notification Procedures", status: "completed", due: null },
        { name: "Business Associate Agreements", status: "in-progress", due: "2024-02-15" }
      ]
    },
    {
      name: "OSHA",
      status: "Compliant",
      score: 88,
      lastAudit: "2024-01-10",
      nextAudit: "2024-04-10",
      trend: "up",
      requirements: [
        { name: "Safety Training Program", status: "completed", due: null },
        { name: "Hazard Communication", status: "completed", due: null },
        { name: "Emergency Action Plan", status: "completed", due: null },
        { name: "Incident Reporting", status: "pending", due: "2024-02-28" }
      ]
    },
    {
      name: "Software Licenses",
      status: "At Risk",
      score: 72,
      lastAudit: "2024-01-05",
      nextAudit: "2024-03-05",
      trend: "down",
      requirements: [
        { name: "Epic EHR License", status: "completed", due: null },
        { name: "Microsoft 365 Renewal", status: "pending", due: "2024-02-20" },
        { name: "Adobe Creative Suite", status: "overdue", due: "2024-01-30" },
        { name: "Antivirus Software", status: "completed", due: null }
      ]
    },
    {
      name: "Professional Certifications",
      status: "Compliant",
      score: 90,
      lastAudit: "2024-01-20",
      nextAudit: "2024-07-20",
      trend: "stable",
      requirements: [
        { name: "Nursing Licenses", status: "completed", due: null },
        { name: "Physician Credentials", status: "completed", due: null },
        { name: "IT Certifications", status: "in-progress", due: "2024-03-15" },
        { name: "CPR Certifications", status: "completed", due: null }
      ]
    }
  ];

  const upcomingDeadlines = [
    {
      title: "Microsoft 365 License Renewal",
      dueDate: "2024-02-20",
      daysLeft: 13,
      priority: "high",
      type: "License"
    },
    {
      title: "Business Associate Agreement Review",
      dueDate: "2024-02-15",
      daysLeft: 8,
      priority: "medium",
      type: "HIPAA"
    },
    {
      title: "OSHA Incident Reporting Training",
      dueDate: "2024-02-28",
      daysLeft: 21,
      priority: "medium",
      type: "OSHA"
    },
    {
      title: "Adobe Creative Suite Renewal",
      dueDate: "2024-01-30",
      daysLeft: -6,
      priority: "high",
      type: "License"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'text-green-400 bg-green-600';
      case 'At Risk': return 'text-yellow-400 bg-yellow-600';
      case 'Non-Compliant': return 'text-red-400 bg-red-600';
      default: return 'text-gray-400 bg-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-400" />;
      default: return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-600';
      case 'medium': return 'text-yellow-400 bg-yellow-600';
      case 'low': return 'text-green-400 bg-green-600';
      default: return 'text-gray-400 bg-gray-600';
    }
  };

  const getRequirementStatus = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default: return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Compliance Dashboard</h1>
          <p className="text-gray-300">Monitor your organization's compliance status and upcoming requirements</p>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-400 mr-3" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-gray-400">Compliant Areas</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-400 mr-3" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-gray-400">At Risk</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-gray-400">Upcoming Deadlines</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-400 mr-3" />
              <div>
                <p className="text-2xl font-bold">86%</p>
                <p className="text-gray-400">Overall Score</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Upcoming Deadlines
          </h2>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4">
                    {getRequirementStatus(deadline.priority === 'high' ? 'overdue' : 'pending')}
                  </div>
                  <div>
                    <h3 className="font-medium">{deadline.title}</h3>
                    <p className="text-gray-400 text-sm">Type: {deadline.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(deadline.priority)}`}>
                    {deadline.priority}
                  </span>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Due: {deadline.dueDate}</p>
                    <p className={`text-sm font-medium ${deadline.daysLeft < 0 ? 'text-red-400' : deadline.daysLeft < 7 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {deadline.daysLeft < 0 ? `${Math.abs(deadline.daysLeft)} days overdue` : 
                       deadline.daysLeft === 0 ? 'Due today' : 
                       `${deadline.daysLeft} days left`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {complianceAreas.map((area, index) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{area.name}</h3>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(area.trend)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(area.status)}`}>
                    {area.status}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Compliance Score</span>
                  <span className="text-sm font-medium">{area.score}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      area.score >= 90 ? 'bg-green-500' :
                      area.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${area.score}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-gray-400">Last Audit</p>
                  <p className="font-medium">{area.lastAudit}</p>
                </div>
                <div>
                  <p className="text-gray-400">Next Audit</p>
                  <p className="font-medium">{area.nextAudit}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Requirements</h4>
                <div className="space-y-2">
                  {area.requirements.map((requirement, reqIndex) => (
                    <div key={reqIndex} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getRequirementStatus(requirement.status)}
                        <span className="ml-2 text-sm">{requirement.name}</span>
                      </div>
                      {requirement.due && (
                        <span className="text-xs text-gray-400">
                          Due: {requirement.due}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
