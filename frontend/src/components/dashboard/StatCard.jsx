import { useApp } from '../../context/AppContext';

function StatCard({ type, amount, previousAmount, label }) {
  const { getCurrencySymbol } = useApp();
  const isIncome = type === 'income';
  const borderColor = isIncome ? 'border-primary dark:border-green-600' : 'border-tertiary dark:border-red-600';
  const barColor = isIncome ? 'bg-primary dark:bg-green-600' : 'bg-tertiary dark:bg-red-600';
  const percentage = ((amount / previousAmount) * 100).toFixed(0);
  
  return (
    <div className={`bg-surface-container-lowest dark:bg-stone-900 p-6 rounded-xl editorial-shadow border-l-4 ${borderColor}`}>
      <span className="text-sm font-medium text-stone-500 dark:text-stone-400 block mb-2">{label}</span>
      <h3 className="text-2xl font-headline font-bold text-on-surface dark:text-stone-200">
        {getCurrencySymbol()}{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </h3>
      <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">
        v.s. last month {getCurrencySymbol()}{previousAmount.toLocaleString('en-IN')}
      </p>
      <div className="mt-4 h-1 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
        <div className={`h-full ${barColor}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
      </div>
    </div>
  );
}

export default StatCard;
