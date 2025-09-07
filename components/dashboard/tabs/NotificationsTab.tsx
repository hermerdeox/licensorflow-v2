'use client';

import { useState } from 'react';

export default function NotificationsTab({ notifications }: { notifications: any[] }) {
  const [unreadNotifications, setUnreadNotifications] = useState(notifications);

  const markAsRead = async (id: string) => {
    // API call to mark as read would go here
    setUnreadNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (unreadNotifications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No new notifications</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {unreadNotifications.map((notification) => (
        <div key={notification.id} className="border rounded-lg p-4 flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium">{notification.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => markAsRead(notification.id)}
            className="ml-4 text-sm text-blue-600 hover:underline"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}
