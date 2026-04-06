function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="grid grid-cols-12 gap-4 mb-8">
      <div className="col-span-12 md:col-span-5 bg-surface-container-lowest p-1 rounded-md shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)] flex items-center">
        <span className="material-symbols-outlined ml-4 text-on-surface-variant">search</span>
        <input 
          className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 px-3" 
          placeholder="Search transactions, merchants, or notes..."
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>
      
      <div className="col-span-6 md:col-span-2 bg-surface-container-lowest p-1 rounded-md shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]">
        <select 
          className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 px-4 text-on-surface-variant cursor-pointer"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option>Category: All</option>
          <option>Dining</option>
          <option>Utilities</option>
          <option>Entertainment</option>
          <option>Salary</option>
        </select>
      </div>
      
      <div className="col-span-6 md:col-span-2 bg-surface-container-lowest p-1 rounded-md shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]">
        <select 
          className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 px-4 text-on-surface-variant cursor-pointer"
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
        >
          <option>Type: All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>
      
      <div className="col-span-12 md:col-span-3 bg-surface-container-lowest p-1 rounded-md shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)] flex items-center justify-between px-4">
        <span className="text-sm text-on-surface-variant font-medium">
          Sort by: <span className="text-primary">Date</span>
        </span>
        <button className="p-1 hover:bg-surface-container-low rounded">
          <span className="material-symbols-outlined text-lg">swap_vert</span>
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
