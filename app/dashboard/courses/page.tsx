'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  CheckCircle,
  Play,
  Award,
  BarChart3,
  Filter,
  Search
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: "HIPAA Compliance Training",
      category: "Compliance",
      duration: "45 minutes",
      progress: 75,
      status: "In Progress",
      description: "Comprehensive HIPAA training covering privacy and security rules",
      instructor: "Dr. Sarah Johnson",
      lastAccessed: "2 days ago"
    },
    {
      id: 2,
      title: "OSHA Safety Fundamentals",
      category: "Safety",
      duration: "60 minutes",
      progress: 100,
      status: "Completed",
      description: "Essential workplace safety training for healthcare environments",
      instructor: "Mike Chen",
      lastAccessed: "1 week ago"
    },
    {
      id: 3,
      title: "Epic EHR Training",
      category: "Software",
      duration: "90 minutes",
      progress: 0,
      status: "Not Started",
      description: "Master Epic electronic health record system",
      instructor: "Jennifer Rodriguez",
      lastAccessed: "Never"
    },
    {
      id: 4,
      title: "Bloodborne Pathogens",
      category: "Safety",
      duration: "30 minutes",
      progress: 50,
      status: "In Progress",
      description: "Essential training for handling blood and body fluids",
      instructor: "Dr. Emily Watson",
      lastAccessed: "3 days ago"
    },
    {
      id: 5,
      title: "Microsoft 365 Healthcare",
      category: "Software",
      duration: "40 minutes",
      progress: 100,
      status: "Completed",
      description: "Microsoft 365 applications for healthcare environments",
      instructor: "Alex Thompson",
      lastAccessed: "2 weeks ago"
    },
    {
      id: 6,
      title: "Fire Safety and Emergency Response",
      category: "Safety",
      duration: "35 minutes",
      progress: 0,
      status: "Not Started",
      description: "Fire prevention and emergency evacuation procedures",
      instructor: "Captain David Lee",
      lastAccessed: "Never"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Courses' },
    { value: 'Compliance', label: 'Compliance' },
    { value: 'Safety', label: 'Safety' },
    { value: 'Software', label: 'Software' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-600';
      case 'In Progress': return 'bg-blue-600';
      case 'Not Started': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
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
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-gray-300">Track your training progress and access your courses</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-gray-400">Total Courses</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-400 mr-3" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-gray-400">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-400 mr-3" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-gray-400">In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-purple-400 mr-3" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-gray-400">Certificates</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                  {course.category}
                </span>
                <span className={`px-3 py-1 text-white text-sm rounded-full ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{course.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {course.instructor}
                </div>
                <div className="text-gray-400 text-sm">
                  Last accessed: {course.lastAccessed}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-gray-400">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                {course.status === 'Not Started' ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Course
                  </>
                ) : course.status === 'Completed' ? (
                  <>
                    <Award className="h-4 w-4 mr-2" />
                    View Certificate
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Continue Course
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
