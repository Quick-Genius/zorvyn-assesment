function BalanceCard({ balance, cardNumber, changePercent }) {
  return (
    <div className="md:col-span-2 lg:col-span-1 bg-surface-container-lowest p-6 rounded-xl editorial-shadow relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm font-medium text-stone-500">My Balance</span>
          <div className="flex items-center gap-1 text-primary bg-primary-container/10 px-2 py-0.5 rounded-full text-xs font-bold">
            <span className="material-symbols-outlined text-sm">arrow_upward</span>
            {changePercent}%
          </div>
        </div>
        <h2 className="text-3xl font-headline font-bold text-on-surface mb-1">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h2>
        <p className="text-stone-400 font-mono text-xs tracking-widest mb-6">{cardNumber}</p>
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-br from-primary to-primary-container text-white text-xs font-bold py-3 rounded-lg shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
            Send Money
          </button>
          <button className="flex-1 border border-outline-variant/30 text-on-surface text-xs font-bold py-3 rounded-lg hover:bg-stone-50 transition-colors">
            Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
