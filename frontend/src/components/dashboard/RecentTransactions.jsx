import { useApp } from '../../context/AppContext';

function RecentTransactions({ transactions }) {
  const { getCurrencySymbol } = useApp();
  
  return (
    <div className="bg-surface-container-lowest dark:bg-stone-900 p-8 rounded-xl editorial-shadow">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-sm font-headline font-bold text-on-surface dark:text-stone-200">Recent Transaction</h4>
        <a className="text-[10px] uppercase font-bold text-primary tracking-widest" href="#">See all</a>
      </div>
      <div className="space-y-6">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover" src={transaction.avatar} alt={transaction.description} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-on-surface dark:text-stone-200">{transaction.description}</p>
              <p className="text-[10px] text-stone-400">{transaction.category} • {transaction.time}</p>
            </div>
            <span className={`text-sm font-bold ${transaction.amount > 0 ? 'text-primary' : 'text-tertiary'}`}>
              {transaction.amount > 0 ? '+' : ''}{getCurrencySymbol()}{Math.abs(transaction.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;
