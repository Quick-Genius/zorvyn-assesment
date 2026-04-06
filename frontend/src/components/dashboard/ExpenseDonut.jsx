import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dailyExpenseData, weeklyExpenseData, monthlyExpenseData } from '../../data/mockCharts';

function ExpenseDonut() {
  const [period, setPeriod] = useState('weekly');
  const { getCurrencySymbol } = useApp();
  
  const categories = period === 'daily' ? dailyExpenseData : 
                     period === 'weekly' ? weeklyExpenseData : 
                     monthlyExpenseData;
  
  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);
  
  return (
    <div className="bg-surface-container-lowest dark:bg-stone-900 p-8 rounded-xl editorial-shadow">
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-lg font-headline font-bold text-on-surface dark:text-stone-200">All expenses</h4>
        <span className="material-symbols-outlined text-stone-400 dark:text-stone-500 cursor-pointer">more_horiz</span>
      </div>
      
      <div className="flex justify-center mb-10 relative">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#f2f4f2" className="dark:stroke-stone-800" strokeWidth="6"></circle>
          <circle cx="50" cy="50" r="32" fill="none" stroke="#f2f4f2" className="dark:stroke-stone-800" strokeWidth="6"></circle>
          <circle cx="50" cy="50" r="24" fill="none" stroke="#f2f4f2" className="dark:stroke-stone-800" strokeWidth="6"></circle>
          <circle cx="50" cy="50" r="16" fill="none" stroke="#f2f4f2" className="dark:stroke-stone-800" strokeWidth="6"></circle>
          
          <circle cx="50" cy="50" r="40" fill="none" stroke="#2e7d32" strokeDasharray="158 251" strokeWidth="6"></circle>
          <circle cx="50" cy="50" r="32" fill="none" stroke="#0284c7" strokeDasharray="112 201" strokeWidth="6"></circle>
          <circle cx="50" cy="50" r="24" fill="none" stroke="#f97316" strokeDasharray="72 150" strokeWidth="6"></circle>
          <circle cx="50" cy="50" r="16" fill="none" stroke="#ef4444" strokeDasharray="46 100" strokeWidth="6"></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="block text-2xl font-headline font-bold dark:text-stone-200">
              {getCurrencySymbol()}{(total / 1000).toFixed(1)}k
            </span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest">Total</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 p-1 bg-surface-container-low dark:bg-stone-800 rounded-lg mb-8">
        <button 
          onClick={() => setPeriod('daily')}
          className={`flex-1 py-1.5 text-xs font-medium ${period === 'daily' ? 'font-bold bg-white dark:bg-stone-700 rounded-md shadow-sm dark:text-stone-200' : 'text-stone-500 dark:text-stone-400'}`}
        >
          Daily
        </button>
        <button 
          onClick={() => setPeriod('weekly')}
          className={`flex-1 py-1.5 text-xs font-medium ${period === 'weekly' ? 'font-bold bg-white dark:bg-stone-700 rounded-md shadow-sm dark:text-stone-200' : 'text-stone-500 dark:text-stone-400'}`}
        >
          Weekly
        </button>
        <button 
          onClick={() => setPeriod('monthly')}
          className={`flex-1 py-1.5 text-xs font-medium ${period === 'monthly' ? 'font-bold bg-white dark:bg-stone-700 rounded-md shadow-sm dark:text-stone-200' : 'text-stone-500 dark:text-stone-400'}`}
        >
          Monthly
        </button>
      </div>
      
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${category.color}`}></div>
              <span className="text-sm font-medium text-stone-600 dark:text-stone-300">{category.name}</span>
            </div>
            <span className="text-sm font-bold text-on-surface dark:text-stone-200">{category.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseDonut;
