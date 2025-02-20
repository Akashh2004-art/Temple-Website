import React from 'react';
import DashboardStats from '../components/DashboardStats';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const allMonths = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const rawData = [
  { month: 'Jan', donations: 4000, events: 24 },
  { month: 'Feb', donations: 3000, events: 13 },
  { month: 'Mar', donations: 2000, events: 18 },
  { month: 'Apr', donations: 2780, events: 29 },
  { month: 'May', donations: 1890, events: 15 },
  { month: 'Jun', donations: 2390, events: 21 },
];

const data = allMonths.map(month => {
  const existingData = rawData.find(d => d.month === month);
  return existingData ? existingData : { month, donations: 0, events: 0 };
});

const Dashboard: React.FC = () => {
  return (
    <div className="mt-10 space-y-6 p-4 md:p-6"> {/* Added mt-16 to prevent overlap with navbar */}
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <DashboardStats />
      
      <div className="bg-white p-4 md:p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="donations" fill="#8884d8" name="Donations ($)" />
              <Bar yAxisId="right" dataKey="events" fill="#82ca9d" name="Events" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">New event created: Summer Festival</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="border-l-4 border-indigo-400 pl-4">
                <h3 className="text-sm font-medium text-gray-900">Diwali Celebration</h3>
                <p className="text-sm text-gray-500">October 24, 2023</p>
                <p className="text-sm text-gray-500">Expected Attendees: 150</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
