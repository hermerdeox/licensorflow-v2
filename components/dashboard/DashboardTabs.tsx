'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoursesTab from './tabs/CoursesTab';
import ProgressTab from './tabs/ProgressTab';
import CertificatesTab from './tabs/CertificatesTab';
import BillingTab from './tabs/BillingTab';
import NotificationsTab from './tabs/NotificationsTab';
import SettingsTab from './tabs/SettingsTab';

const tabs = [
  { id: 'courses', label: 'My Courses', icon: 'ðŸ“š' },
  { id: 'progress', label: 'Progress', icon: 'ðŸ“Š' },
  { id: 'certificates', label: 'Certificates', icon: 'ðŸ†' },
  { id: 'billing', label: 'Billing', icon: 'ðŸ’³' },
  { id: 'notifications', label: 'Notifications', icon: 'ðŸ””' },
  { id: 'settings', label: 'Settings', icon: 'âš™ï¸' },
];

export default function DashboardTabs({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState('courses');
  
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
              {tab.id === 'notifications' && data.notifications.length > 0 && (
                <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                  {data.notifications.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'courses' && <CoursesTab enrollments={data.enrollments} />}
            {activeTab === 'progress' && <ProgressTab progress={data.progress} />}
            {activeTab === 'certificates' && <CertificatesTab certificates={data.certificates} />}
            {activeTab === 'billing' && <BillingTab subscription={data.user?.subscriptions[0]} payments={data.recentPayments} />}
            {activeTab === 'notifications' && <NotificationsTab notifications={data.notifications} />}
            {activeTab === 'settings' && <SettingsTab user={data.user} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
