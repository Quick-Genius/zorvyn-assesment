function CashflowChart({ data }) {
  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-stone-500 text-sm font-label uppercase tracking-wider">Annual Cashflow</h3>
          <p className="text-2xl font-bold font-manrope text-on-surface">2023 Performance</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span className="text-xs text-stone-500">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-stone-200"></span>
            <span className="text-xs text-stone-500">Expenses</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-end justify-between h-48 gap-2 px-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1 group">
            <div className="w-full flex gap-0.5 items-end justify-center h-full">
              <div className="w-2 bg-primary rounded-t-sm" style={{ height: `${item.income}%` }}></div>
              <div className="w-2 bg-stone-200 rounded-t-sm" style={{ height: `${item.expenses}%` }}></div>
            </div>
            <span className="text-[10px] text-stone-400">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CashflowChart;
