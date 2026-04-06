import { useState } from 'react';
import { dailyCashflowData, monthlyCashflowData, annualCashflowData } from '../../data/mockCharts';

function CashflowChart() {
  const [period, setPeriod] = useState('annual');
  
  const data = period === 'daily' ? dailyCashflowData :
               period === 'monthly' ? monthlyCashflowData :
               annualCashflowData;
  
  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest dark:bg-stone-900 rounded-xl p-6 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-stone-500 dark:text-stone-400 text-sm font-label uppercase tracking-wider">Cashflow Analysis</h3>
          <p className="text-2xl font-bold font-manrope text-on-surface dark:text-stone-200">
            {period === 'daily' ? 'This Week' : period === 'monthly' ? '2024 Performance' : '2023 Performance'}
          </p>
        </div>
        <div className="flex gap-2 p-1 bg-surface-container-low dark:bg-stone-800 rounded-lg">
          <button 
            onClick={() => setPeriod('daily')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              period === 'daily' 
                ? 'bg-white dark:bg-stone-700 shadow-sm text-on-surface dark:text-stone-200 font-bold' 
                : 'text-stone-500 dark:text-stone-400 hover:text-on-surface dark:hover:text-stone-200'
            }`}
          >
            Daily
          </button>
          <button 
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              period === 'monthly' 
                ? 'bg-white dark:bg-stone-700 shadow-sm text-on-surface dark:text-stone-200 font-bold' 
                : 'text-stone-500 dark:text-stone-400 hover:text-on-surface dark:hover:text-stone-200'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setPeriod('annual')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              period === 'annual' 
                ? 'bg-white dark:bg-stone-700 shadow-sm text-on-surface dark:text-stone-200 font-bold' 
                : 'text-stone-500 dark:text-stone-400 hover:text-on-surface dark:hover:text-stone-200'
            }`}
          >
            Annual
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary"></span>
          <span className="text-xs text-stone-500 dark:text-stone-400">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-stone-200 dark:bg-stone-700"></span>
          <span className="text-xs text-stone-500 dark:text-stone-400">Expenses</span>
        </div>
      </div>
      
      <div className="flex items-end justify-between h-48 gap-2 px-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1 group">
            <div className="w-full flex gap-0.5 items-end justify-center h-full">
              <div className="w-2 bg-primary rounded-t-sm" style={{ height: `${item.income}%` }}></div>
              <div className="w-2 bg-stone-200 dark:bg-stone-700 rounded-t-sm" style={{ height: `${item.expenses}%` }}></div>
            </div>
            <span className="text-[10px] text-stone-400">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CashflowChart;
