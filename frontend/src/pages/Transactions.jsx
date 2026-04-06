import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import FilterBar from '../components/transactions/FilterBar';
import TransactionTable from '../components/transactions/TransactionTable';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import { transactions } from '../data/mockTransactions';

function Transactions() {
  const { userRole } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'Category: All',
    type: 'Type: All',
  });
  
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };
  
  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      if (filters.search && !txn.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.category !== 'Category: All' && txn.category !== filters.category) {
        return false;
      }
      if (filters.type !== 'Type: All' && txn.type !== filters.type.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [filters]);
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-on-background dark:text-stone-200 tracking-tight mb-2">
            Transaction History
          </h1>
          <p className="text-on-surface-variant dark:text-stone-400 font-body">Track your editorial vault of financial narratives.</p>
        </div>
        {userRole === 'admin' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span className="font-semibold text-sm">+ Add Transaction</span>
          </button>
        )}
      </div>
      
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <TransactionTable transactions={filteredTransactions} />
      
      <div className="mt-12 p-8 bg-surface-container-low dark:bg-stone-900 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-on-surface dark:text-stone-200">Context-Aware Interface</h3>
            <p className="text-on-surface-variant dark:text-stone-400 leading-relaxed">
              FinTrack adapts to your current user permissions. The <span className="font-bold text-primary dark:text-green-400">Admin</span> view enables wealth injection through the "+ Add" action, while the <span className="font-bold text-secondary dark:text-green-600">Viewer</span> state provides a clean, read-only analytical landscape.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${userRole === 'admin' ? 'bg-primary' : 'bg-stone-300 dark:bg-stone-600'}`}></div>
                <span className={`text-xs font-bold ${userRole === 'admin' ? 'text-on-surface dark:text-stone-200' : 'text-stone-400'}`}>
                  Admin {userRole === 'admin' && '(Active)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${userRole === 'viewer' ? 'bg-secondary' : 'bg-stone-300 dark:bg-stone-600'}`}></div>
                <span className={`text-xs font-bold ${userRole === 'viewer' ? 'text-on-surface dark:text-stone-200' : 'text-stone-400'}`}>
                  Viewer {userRole === 'viewer' && '(Active)'}
                </span>
              </div>
            </div>
          </div>
          <div className="relative bg-white dark:bg-stone-800 rounded-md shadow-inner p-6 overflow-hidden min-h-[200px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-100 to-white dark:from-stone-900 dark:to-stone-800 opacity-50"></div>
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex justify-between items-center opacity-40">
                <div className="h-6 w-32 bg-stone-200 dark:bg-stone-700 rounded"></div>
                <div className="h-10 w-40 bg-stone-100 dark:bg-stone-800 rounded-md"></div>
              </div>
              <div className="border-t border-stone-100 dark:border-stone-700 pt-6">
                <div className="flex flex-col gap-3">
                  <div className="h-4 w-full bg-stone-50 dark:bg-stone-800 rounded"></div>
                  <div className="h-4 w-3/4 bg-stone-50 dark:bg-stone-800 rounded"></div>
                  <div className="h-4 w-1/2 bg-stone-50 dark:bg-stone-800 rounded"></div>
                </div>
              </div>
              {userRole === 'viewer' && (
                <div className="absolute bottom-4 right-4 group">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-md bg-stone-200 dark:bg-stone-700 border-2 border-dashed border-stone-300 dark:border-stone-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-stone-400 dark:text-stone-500">visibility_off</span>
                    </div>
                    <div className="absolute -top-12 right-0 bg-stone-800 dark:bg-stone-700 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap shadow-xl">
                      Hidden in Viewer mode
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Transactions;
