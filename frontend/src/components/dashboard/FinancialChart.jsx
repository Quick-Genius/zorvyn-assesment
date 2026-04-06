import { useState } from 'react';

function FinancialChart({ data }) {
  const [period, setPeriod] = useState('monthly');
  
  const avgIncome = data.reduce((sum, item) => sum + item.income, 0) / data.length;
  const avgExpenses = data.reduce((sum, item) => sum + item.expenses, 0) / data.length;
  
  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h4 className="text-lg font-headline font-bold text-on-surface">Financial Statistics</h4>
          <p className="text-xs text-stone-400">Analysis of your cashflow</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-surface-container-low rounded-lg">
          <button 
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${
              period === 'monthly' 
                ? 'bg-white shadow-sm text-on-surface' 
                : 'text-stone-500 hover:text-on-surface'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setPeriod('weekly')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${
              period === 'weekly' 
                ? 'bg-white shadow-sm text-on-surface' 
                : 'text-stone-500 hover:text-on-surface'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>
      
      <div className="relative h-64 w-full flex items-end gap-2 mb-8">
        <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
          <div className="border-t border-stone-900 w-full"></div>
          <div className="border-t border-stone-900 w-full"></div>
          <div className="border-t border-stone-900 w-full"></div>
          <div className="border-t border-stone-900 w-full"></div>
        </div>
        
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col justify-end items-center group">
            <div className="w-full flex gap-1 items-end">
              <div 
                className="flex-1 bg-primary/40 rounded-t-sm" 
                style={{ height: `${item.income}%` }}
              ></div>
              <div 
                className="flex-1 bg-tertiary/40 rounded-t-sm" 
                style={{ height: `${item.expenses}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-stone-400 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/15">
        <div>
          <p className="text-xs font-label uppercase tracking-widest text-stone-400 mb-1">Average Income</p>
          <p className="text-2xl font-headline font-extrabold text-primary">
            ${(avgIncome * 100).toFixed(0)}
          </p>
        </div>
        <div>
          <p className="text-xs font-label uppercase tracking-widest text-stone-400 mb-1">Average Expenses</p>
          <p className="text-2xl font-headline font-extrabold text-tertiary">
            ${(avgExpenses * 100).toFixed(0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FinancialChart;
