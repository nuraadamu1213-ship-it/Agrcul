
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard: React.FC = () => {
  const yieldData = [
    { month: 'Jan', yield: 400 },
    { month: 'Feb', yield: 300 },
    { month: 'Mar', yield: 600 },
    { month: 'Apr', yield: 800 },
    { month: 'May', yield: 1200 },
    { month: 'Jun', yield: 900 },
  ];

  const soilMetrics = [
    { name: 'Moisture', value: 65, unit: '%' },
    { name: 'Nitrogen', value: 42, unit: 'mg/kg' },
    { name: 'Phosphorus', value: 18, unit: 'mg/kg' },
    { name: 'pH Level', value: 6.8, unit: 'pH' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {soilMetrics.map((metric) => (
          <div key={metric.name} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{metric.name}</p>
            <h4 className="text-2xl font-bold text-gray-900 mt-1">
              {metric.value}<span className="text-sm font-normal text-gray-400 ml-1">{metric.unit}</span>
            </h4>
            <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${metric.value > 60 ? 'bg-green-500' : 'bg-amber-500'}`} 
                style={{ width: `${Math.min(100, (metric.value / 100) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Yield Trend (kg)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="yield" fill="#16a34a" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Market Price Index</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="yield" stroke="#16a34a" strokeWidth={3} dot={{r: 6, fill: '#16a34a', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
