function SpendingCategory() {
  return (
    <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest dark:bg-stone-900 rounded-xl p-6 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)] flex flex-col justify-between">
      <div>
        <h3 className="text-stone-500 dark:text-stone-400 text-sm font-label uppercase tracking-wider mb-4">Highest Spending</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-tertiary/10 dark:bg-tertiary/20 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              restaurant
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold font-manrope dark:text-stone-200">Dining & Drinks</p>
            <p className="text-tertiary font-semibold">
              $1,240.50 <span className="text-stone-400 font-normal text-sm">this month</span>
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-xs font-medium text-stone-600 dark:text-stone-400">
          <span>Category Progress</span>
          <span>82% of Budget</span>
        </div>
        <div className="w-full h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-tertiary to-tertiary-container rounded-full" style={{ width: '82%' }}></div>
        </div>
        <p className="text-[10px] text-stone-400 leading-relaxed italic">
          You've spent 12% more on dining than your 3-month average. Consider home cooking more often.
        </p>
      </div>
    </div>
  );
}

export default SpendingCategory;
