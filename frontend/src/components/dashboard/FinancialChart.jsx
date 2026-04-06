import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';

function FinancialChart({ monthlyData, weeklyData }) {
  const [period, setPeriod] = useState('monthly');
  const { darkMode } = useApp();
  
  const data = period === 'monthly' ? monthlyData : weeklyData;
  
  const avgIncome = data.reduce((sum, item) => sum + item.income, 0) / data.length;
  const avgExpenses = data.reduce((sum, item) => sum + item.expenses, 0) / data.length;
  
  // Transform data for Recharts
  const chartData = data.map(item => ({
    month: item.month,
    Income: item.income * 100,
    Expenses: item.expenses * 100,
  }));
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-stone-800 p-3 rounded-lg shadow-lg border border-stone-200 dark:border-stone-700">
          <p className="text-sm font-bold text-on-surface dark:text-stone-200 mb-2">{payload[0].payload.month}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toFixed(0)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-surface-container-lowest dark:bg-stone-900 p-8 rounded-xl editorial-shadow">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h4 className="text-lg font-headline font-bold text-on-surface dark:text-stone-200">Financial Statistics</h4>
          <p className="text-xs text-stone-400 dark:text-stone-500">Analysis of your cashflow</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-surface-container-low dark:bg-stone-800 rounded-lg">
          <button 
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${
              period === 'monthly' 
                ? 'bg-white dark:bg-stone-700 shadow-sm text-on-surface dark:text-stone-200' 
                : 'text-stone-500 dark:text-stone-400 hover:text-on-surface dark:hover:text-stone-200'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setPeriod('weekly')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${
              period === 'weekly' 
                ? 'bg-white dark:bg-stone-700 shadow-sm text-on-surface dark:text-stone-200' 
                : 'text-stone-500 dark:text-stone-400 hover:text-on-surface dark:hover:text-stone-200'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>
      
      <div className="h-64 w-full mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="month" 
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar dataKey="Income" fill="#0d631b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expenses" fill="#923357" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/15 dark:border-stone-800">
        <div>
          <p className="text-xs font-label uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">Average Income</p>
          <p className="text-2xl font-headline font-extrabold text-primary dark:text-green-400">
            ₹{(avgIncome * 100).toFixed(0)}
          </p>
        </div>
        <div>
          <p className="text-xs font-label uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">Average Expenses</p>
          <p className="text-2xl font-headline font-extrabold text-tertiary dark:text-red-400">
            ₹{(avgExpenses * 100).toFixed(0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FinancialChart;
