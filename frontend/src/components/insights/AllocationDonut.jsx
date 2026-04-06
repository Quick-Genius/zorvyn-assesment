function AllocationDonut() {
  const allocations = [
    { name: 'Housing', percentage: 40, color: 'bg-primary' },
    { name: 'Entertainment', percentage: 25, color: 'bg-secondary' },
    { name: 'Miscellaneous', percentage: 15, color: 'bg-tertiary' },
    { name: 'Savings', percentage: 20, color: 'bg-stone-200 dark:bg-stone-700' },
  ];
  
  return (
    <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest dark:bg-stone-900 rounded-xl p-6 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)] flex flex-col">
      <h3 className="text-stone-500 dark:text-stone-400 text-sm font-label uppercase tracking-wider mb-6">Allocation Breakdown</h3>
      <div className="relative flex items-center justify-center mb-8">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle className="text-stone-100 dark:text-stone-800" cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeWidth="20"></circle>
          <circle className="text-primary" cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeDasharray="502.4" strokeDashoffset="301.44" strokeWidth="20"></circle>
          <circle className="text-secondary" cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeDasharray="502.4" strokeDashoffset="376.8" strokeWidth="20" style={{ transform: 'rotate(144deg)', transformOrigin: 'center' }}></circle>
          <circle className="text-tertiary" cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeDasharray="502.4" strokeDashoffset="427.04" strokeWidth="20" style={{ transform: 'rotate(234deg)', transformOrigin: 'center' }}></circle>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold font-manrope dark:text-stone-200">₹4,820</span>
          <span className="text-xs text-stone-400 uppercase tracking-widest">Total Exp.</span>
        </div>
      </div>
      <div className="space-y-3 mt-auto">
        {allocations.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
              <span className="text-sm font-medium dark:text-stone-200">{item.name}</span>
            </div>
            <span className="text-sm text-stone-500 dark:text-stone-400">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllocationDonut;
