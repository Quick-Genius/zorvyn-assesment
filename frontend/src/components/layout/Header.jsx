import { useApp } from '../../context/AppContext';

function Header() {
  const { darkMode, toggleDarkMode, userRole, toggleUserRole } = useApp();
  
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl flex justify-between items-center px-8 z-30 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]">
      <div className="flex items-center gap-4">
        <span className="text-stone-600 dark:text-stone-300 font-medium">Dashboard Overview</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center bg-surface-container-high dark:bg-stone-800 rounded-full p-1 gap-1">
          <button 
            onClick={toggleUserRole}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
              userRole === 'admin' 
                ? 'bg-primary text-on-primary' 
                : 'text-on-surface-variant dark:text-stone-400 hover:bg-surface-variant dark:hover:bg-stone-700'
            }`}
          >
            Admin
          </button>
          <button 
            onClick={toggleUserRole}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
              userRole === 'viewer' 
                ? 'bg-secondary text-on-secondary' 
                : 'text-on-surface-variant dark:text-stone-400 hover:bg-surface-variant dark:hover:bg-stone-700'
            }`}
          >
            Viewer
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-stone-600 dark:text-stone-300">
          <button 
            onClick={toggleDarkMode}
            className="hover:bg-stone-100 dark:hover:bg-stone-800 p-2 rounded-full transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="material-symbols-outlined">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button className="hover:bg-stone-100 dark:hover:bg-stone-800 p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
