import { useState } from 'react';
import { useApp } from '../../context/AppContext';

function AddTransactionModal({ isOpen, onClose }) {
  const { getCurrencySymbol } = useApp();
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: 'Dining',
    type: 'expense',
    description: '',
  });
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction submitted:', formData);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[60] bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 w-full max-w-lg rounded-md shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-surface-container-low dark:border-stone-800 flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tight text-on-surface dark:text-stone-200">Add Transaction</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surface-container-low dark:hover:bg-stone-800 rounded-full transition-colors dark:text-stone-300"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-outline dark:text-stone-400">Date</label>
              <input 
                className="w-full bg-surface-container-high dark:bg-stone-800 border-none rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all border-b-2 border-transparent focus:border-primary dark:text-stone-200" 
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-outline dark:text-stone-400">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-outline dark:text-stone-400">{getCurrencySymbol()}</span>
                <input 
                  className="w-full bg-surface-container-high dark:bg-stone-800 border-none rounded-sm pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all border-b-2 border-transparent focus:border-primary dark:text-stone-200 dark:placeholder-stone-500" 
                  placeholder="0.00" 
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-outline dark:text-stone-400">Category</label>
              <select 
                className="w-full bg-surface-container-high dark:bg-stone-800 border-none rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all border-b-2 border-transparent focus:border-primary cursor-pointer dark:text-stone-200"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option>Dining</option>
                <option>Utilities</option>
                <option>Hardware</option>
                <option>Investment</option>
                <option>Salary</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-outline dark:text-stone-400">Type</label>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => handleChange('type', 'expense')}
                  className={`flex-1 py-3 px-4 text-xs font-bold rounded-md transition-colors ${
                    formData.type === 'expense'
                      ? 'bg-white dark:bg-stone-800 border border-outline-variant dark:border-stone-700 dark:text-stone-200'
                      : 'bg-primary/10 text-primary border border-primary/20'
                  }`}
                >
                  Expense
                </button>
                <button 
                  type="button"
                  onClick={() => handleChange('type', 'income')}
                  className={`flex-1 py-3 px-4 text-xs font-bold rounded-md transition-colors ${
                    formData.type === 'income'
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-white dark:bg-stone-800 border border-outline-variant dark:border-stone-700 dark:text-stone-200'
                  }`}
                >
                  Income
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest uppercase text-outline dark:text-stone-400">Description</label>
            <textarea 
              className="w-full bg-surface-container-high dark:bg-stone-800 border-none rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all border-b-2 border-transparent focus:border-primary resize-none dark:text-stone-200 dark:placeholder-stone-500" 
              placeholder="e.g. Monthly subscription for cloud services" 
              rows="3"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            ></textarea>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-md font-bold text-on-surface-variant dark:text-stone-300 bg-surface-container-high dark:bg-stone-800 hover:bg-surface-variant dark:hover:bg-stone-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] px-6 py-4 rounded-md font-bold text-white bg-gradient-to-br from-primary to-primary-container shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-[0.98]"
            >
              Record Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;
