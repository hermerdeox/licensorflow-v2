'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function BillingTab({ subscription, payments }: { subscription: any; payments: any[] }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error('Failed to open billing portal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Current Subscription</h3>
        {subscription ? (
          <div className="border rounded-lg p-4">
            <p className="font-medium">Status: {subscription.status}</p>
            <p className="text-sm text-gray-600">
              Next billing: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
            <button
              onClick={handleManageBilling}
              disabled={isLoading}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Manage Billing'}
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No active subscription</p>
        )}
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Recent Payments</h3>
        {payments && payments.length > 0 ? (
          <div className="space-y-2">
            {payments.map((payment) => (
              <div key={payment.id} className="border rounded p-3 flex justify-between">
                <span className="text-sm">
                  ${Number(payment.amount).toFixed(2)} {payment.currency.toUpperCase()}
                </span>
                <span className="text-sm text-gray-600">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No payments yet</p>
        )}
      </div>
    </div>
  );
}
