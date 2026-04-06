function StatCard({ type, amount, previousAmount, label }) {
  const isIncome = type === 'income';
  const borderColor = isIncome ? 'border-primary' : 'border-tertiary';
  const barColor = isIncome ? 'bg-primary' : 'bg-tertiary';
  const percentage = ((amount / previousAmount) * 100).toFixed(0);
  
  return (
    <div className={`bg-surface-container-lowest p-6 rounded-xl editorial-shadow border-l-4 ${borderColor}`}>
      <span className="text-sm font-medium text-stone-500 block mb-2">{label}</span>
      <h3 className="text-2xl font-headline font-bold text-on-surface">
        ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </h3>
      <p className="text-xs text-stone-400 mt-2">
        v.s. last month ${previousAmount.toLocaleString('en-US')}
      </p>
      <div className="mt-4 h-1 w-full bg-stone-100 rounded-full overflow-hidden">
        <div className={`h-full ${barColor}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
      </div>
    </div>
  );
}

export default StatCard;
