import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  timeframe: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, timeframe }) => {
  const isPositive = change > 0;
  
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 flex flex-col items-center text-center">
      <h3 className="text-xs sm:text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-center space-x-2">
        <p className="text-xl sm:text-2xl font-semibold text-gray-900">{value}</p>
        <span className={`flex items-center text-xs sm:text-sm font-semibold ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <ArrowUpIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="mt-1 text-xs sm:text-sm text-gray-500">from {timeframe}</p>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  const stats = [
    { title: 'Total Users', value: '2,651', change: 12, timeframe: 'last month' },
    { title: 'Active Events', value: '24', change: 2.5, timeframe: 'last week' },
    { title: 'Total Bookings', value: '456', change: -3.2, timeframe: 'last week' },
    { title: 'Total Donations', value: '$12,426', change: 8.1, timeframe: 'last month' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
