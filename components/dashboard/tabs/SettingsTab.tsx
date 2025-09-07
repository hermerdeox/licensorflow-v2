'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function SettingsTab({ user }: { user: any }) {
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Profile Information</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-sm text-gray-900">{user?.name || `${user?.firstName} ${user?.lastName}`}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Organization</label>
            <p className="mt-1 text-sm text-gray-900">{user?.organizationName || 'Not specified'}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Security</h3>
        <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Change Password
        </button>
      </div>
    </div>
  );
}
