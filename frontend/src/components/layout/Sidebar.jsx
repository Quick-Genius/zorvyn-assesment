import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'dashboard' },
    { path: '/transactions', label: 'Transactions', icon: 'receipt_long' },
    { path: '/insights', label: 'Insights', icon: 'insights' },
  ];
  
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-stone-50 dark:bg-stone-950 flex flex-col py-6 px-4 gap-2 font-inter text-sm tracking-wide z-40">
      <div className="mb-10 px-4">
        <span className="text-xl font-bold text-green-800 dark:text-green-300 tracking-tight">FinTrack</span>
      </div>
      
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:translate-x-1 transition-transform duration-200 ${
              isActive(item.path)
                ? 'text-green-800 dark:text-green-300 font-semibold bg-white dark:bg-stone-900 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto flex flex-col gap-2 border-t border-outline-variant/15 dark:border-stone-800 pt-6">
        <Link 
          to="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:translate-x-1 transition-transform duration-200 ${
            isActive('/settings')
              ? 'text-green-800 dark:text-green-300 font-semibold bg-white dark:bg-stone-900 shadow-sm'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <span className="material-symbols-outlined">settings</span>
          Settings
        </Link>
        <a className="flex items-center gap-3 px-4 py-3 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:translate-x-1 transition-transform duration-200" href="#">
          <span className="material-symbols-outlined">logout</span>
          Logout
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
