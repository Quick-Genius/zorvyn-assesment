import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem('userRole');
    return saved || 'admin';
  });
  
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('currency');
    return saved || 'INR';
  });
  
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);
  
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);
  
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleUserRole = () => setUserRole(prev => prev === 'admin' ? 'viewer' : 'admin');
  
  const getCurrencySymbol = () => {
    const symbols = {
      'INR': '₹',
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥'
    };
    return symbols[currency] || '₹';
  };
  
  return (
    <AppContext.Provider value={{ 
      darkMode, 
      toggleDarkMode, 
      userRole, 
      setUserRole, 
      toggleUserRole,
      currency,
      setCurrency,
      getCurrencySymbol
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
