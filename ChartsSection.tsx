import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { SALES_TREND_DATA, CATEGORY_SHARE_DATA } from '../constants';

export const ChartsSection: React.FC = () => {
  // New Palette
  const COLORS = ['#2F3E28', '#8F9F83', '#C5A66F', '#BC6C6C', '#A3B19A'];
  // Dark mode specific colors for axis/grid could be handled by context or standard conditional logic, 
  // but CSS vars are tricky in recharts. We'll use a generic color that works for both or subtle logic.
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pb-10">
      {/* Main Trend Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-olive-800 p-6 rounded-2xl border border-[#E5E0D8] dark:border-olive-700 shadow-sm transition-colors duration-300">
        <h3 className="text-[#2C2C2C] dark:text-[#E0E0E0] font-bold text-lg mb-6">Динамика продаж (Ноябрь)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SALES_TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2F3E28" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2F3E28" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPlan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C5A66F" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#C5A66F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" strokeOpacity={0.5} vertical={false} />
              <XAxis dataKey="name" stroke="#8F9F83" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#8F9F83" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}м`} />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'var(--tooltip-bg, #FFFFFF)', 
                    border: '1px solid #E5E0D8', 
                    borderRadius: '12px', 
                    color: '#2C2C2C', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' 
                }}
                itemStyle={{ color: '#2C2C2C' }}
              />
              <Area type="monotone" dataKey="plan" stroke="#C5A66F" strokeDasharray="5 5" strokeWidth={2} fillOpacity={1} fill="url(#colorPlan)" name="План" />
              <Area type="monotone" dataKey="value" stroke="#2F3E28" className="dark:stroke-white" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" name="Факт" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white dark:bg-olive-800 p-6 rounded-2xl border border-[#E5E0D8] dark:border-olive-700 shadow-sm transition-colors duration-300">
        <h3 className="text-[#2C2C2C] dark:text-[#E0E0E0] font-bold text-lg mb-4">Доля категорий</h3>
        <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_SHARE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={6}
                >
                  {CATEGORY_SHARE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E0D8', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                   itemStyle={{ color: '#2C2C2C' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-[#5D5D5D] dark:text-[#A3B19A] ml-2 text-sm font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 text-center pointer-events-none">
                <div className="text-2xl font-bold text-[#2F3E28] dark:text-white">100%</div>
                <div className="text-xs text-[#8F9F83] font-semibold uppercase tracking-wide">Total</div>
            </div>
        </div>
      </div>
    </div>
  );
};