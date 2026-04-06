import { useState } from 'react';

function Header() {
  const [userRole, setUserRole] = useState('admin');
  
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white/80 backdrop-blur-xl flex justify-between items-center px-8 z-30 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]">
      <div className="flex items-center gap-4">
        <span className="text-stone-600 font-medium">Dashboard Overview</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full text-stone-600 text-xs font-semibold">
          <span>{userRole === 'admin' ? 'Admin' : 'Viewer'}</span>
        </div>
        
        <div className="flex items-center gap-4 text-stone-600">
          <button className="hover:bg-stone-100 p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">dark_mode</span>
          </button>
          <button className="hover:bg-stone-100 p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
