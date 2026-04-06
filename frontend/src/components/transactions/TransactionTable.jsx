function TransactionTable({ transactions }) {
  return (
    <div className="bg-surface-container-lowest dark:bg-stone-900 rounded-md shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50 dark:bg-stone-800/50">
              <th className="text-left px-8 py-4 text-[10px] font-bold tracking-[0.05em] uppercase text-outline dark:text-stone-400">Date</th>
              <th className="text-left px-6 py-4 text-[10px] font-bold tracking-[0.05em] uppercase text-outline dark:text-stone-400">Description</th>
              <th className="text-left px-6 py-4 text-[10px] font-bold tracking-[0.05em] uppercase text-outline dark:text-stone-400">Category</th>
              <th className="text-left px-6 py-4 text-[10px] font-bold tracking-[0.05em] uppercase text-outline dark:text-stone-400">Type</th>
              <th className="text-right px-8 py-4 text-[10px] font-bold tracking-[0.05em] uppercase text-outline dark:text-stone-400">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low dark:divide-stone-800">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-surface-container-low/20 dark:hover:bg-stone-800/20 transition-colors group">
                <td className="px-8 py-5 text-sm font-medium text-on-surface-variant dark:text-stone-300">{transaction.date}</td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface dark:text-stone-200">{transaction.description}</span>
                    <span className="text-xs text-outline dark:text-stone-400">{transaction.merchant}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    transaction.type === 'income' 
                      ? 'bg-primary-container/10 text-primary' 
                      : 'bg-surface-container-high dark:bg-stone-800 text-on-surface-variant dark:text-stone-300'
                  }`}>
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1 text-xs font-medium text-on-surface-variant dark:text-stone-300">
                    <span className={`material-symbols-outlined text-sm ${
                      transaction.type === 'income' ? 'text-primary' : 'text-error'
                    }`}>
                      {transaction.type === 'income' ? 'trending_up' : 'trending_down'}
                    </span>
                    {transaction.type === 'income' ? 'Income' : 'Expense'}
                  </div>
                </td>
                <td className={`px-8 py-5 text-right font-bold ${
                  transaction.type === 'income' ? 'text-primary' : 'text-error'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-8 py-4 bg-surface-container-low/30 dark:bg-stone-800/30 flex justify-between items-center">
        <p className="text-xs text-outline dark:text-stone-400 font-medium">Showing {transactions.length} of 248 transactions</p>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg border border-outline-variant dark:border-stone-700 hover:bg-white dark:hover:bg-stone-800 transition-colors disabled:opacity-50 dark:text-stone-300" disabled>
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="p-2 rounded-lg border border-outline-variant dark:border-stone-700 hover:bg-white dark:hover:bg-stone-800 transition-colors dark:text-stone-300">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionTable;
