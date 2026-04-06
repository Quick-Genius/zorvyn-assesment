import { useState } from 'react';
import { useApp } from '../context/AppContext';

function Settings() {
  const { darkMode, toggleDarkMode, userRole } = useApp();
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@fintrack.com',
    phone: '+1 (555) 123-4567',
    currency: 'USD',
    language: 'English',
    notifications: true,
    emailAlerts: true,
    budgetAlerts: true,
    monthlyReports: false,
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', formData);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold font-manrope tracking-tight text-on-surface dark:text-stone-200">
          Settings
        </h1>
        <p className="text-stone-500 dark:text-stone-400 font-body mt-1">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Profile Settings */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest dark:bg-stone-900 rounded-xl p-8 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]">
          <h2 className="text-xl font-bold text-on-surface dark:text-stone-200 mb-6">Profile Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-stone-500 dark:text-stone-400">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full bg-surface-container-high dark:bg-stone-800 border-none rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all border-b-2 border-transparent focus:border-primary dark:text-stone-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-stone-500 dark:text-stone-400">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-surface-container-high dark:bg-stone-800 border-none rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all border-b-2 border-transparent focus:border-primary dark:text-stone-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-stone-500 dark:text-stone-400">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-surface-container-high dark:bg-stone-800 border-none rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all border-b-2 border-transparent focus:border-primary dark:text-stone-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-stone-500 dark:text-stone-400">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full bg-surface-container-high dark:bg-stone-800 border-none rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all border-b-2 border-transparent focus:border-primary cursor-pointer dark:text-stone-200"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>JPY</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-stone-500 dark:text-stone-400">
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="w-full bg-surface-container-high dark:bg-stone-800 border-none rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all border-b-2 border-transparent focus:border-primary cursor-pointer dark:text-stone-200"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-8 py-3 rounded-md font-bold text-white bg-gradient-to-br from-primary to-primary-container shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-[0.98]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Quick Settings */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Appearance */}
          <div className="bg-surface-container-lowest dark:bg-stone-900 rounded-xl p-6 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]">
            <h3 className="text-lg font-bold text-on-surface dark:text-stone-200 mb-4">Appearance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-on-surface dark:text-stone-200">Dark Mode</p>
                  <p className="text-xs text-stone-400">Toggle dark theme</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    darkMode ? 'bg-primary' : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          </div>

          {/* Account Type */}
          <div className="bg-surface-container-lowest dark:bg-stone-900 rounded-xl p-6 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]">
            <h3 className="text-lg font-bold text-on-surface dark:text-stone-200 mb-4">Account Type</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${userRole === 'admin' ? 'bg-primary' : 'bg-stone-300 dark:bg-stone-600'}`}></div>
                <span className="text-sm font-medium dark:text-stone-200">
                  {userRole === 'admin' ? 'Administrator' : 'Viewer'}
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                {userRole === 'admin' 
                  ? 'Full access to create, edit, and manage transactions'
                  : 'Read-only access to view financial data and insights'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-span-12 bg-surface-container-lowest dark:bg-stone-900 rounded-xl p-8 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]">
          <h2 className="text-xl font-bold text-on-surface dark:text-stone-200 mb-6">Notification Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-surface-container-high dark:bg-stone-800 rounded-lg">
              <div>
                <p className="text-sm font-medium text-on-surface dark:text-stone-200">Push Notifications</p>
                <p className="text-xs text-stone-400">Receive app notifications</p>
              </div>
              <button
                onClick={() => handleChange('notifications', !formData.notifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  formData.notifications ? 'bg-primary' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    formData.notifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface-container-high dark:bg-stone-800 rounded-lg">
              <div>
                <p className="text-sm font-medium text-on-surface dark:text-stone-200">Email Alerts</p>
                <p className="text-xs text-stone-400">Transaction confirmations</p>
              </div>
              <button
                onClick={() => handleChange('emailAlerts', !formData.emailAlerts)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  formData.emailAlerts ? 'bg-primary' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    formData.emailAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface-container-high dark:bg-stone-800 rounded-lg">
              <div>
                <p className="text-sm font-medium text-on-surface dark:text-stone-200">Budget Alerts</p>
                <p className="text-xs text-stone-400">Notify when exceeding budget</p>
              </div>
              <button
                onClick={() => handleChange('budgetAlerts', !formData.budgetAlerts)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  formData.budgetAlerts ? 'bg-primary' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    formData.budgetAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface-container-high dark:bg-stone-800 rounded-lg">
              <div>
                <p className="text-sm font-medium text-on-surface dark:text-stone-200">Monthly Reports</p>
                <p className="text-xs text-stone-400">Email summary reports</p>
              </div>
              <button
                onClick={() => handleChange('monthlyReports', !formData.monthlyReports)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  formData.monthlyReports ? 'bg-primary' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    formData.monthlyReports ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="col-span-12 bg-surface-container-lowest dark:bg-stone-900 rounded-xl p-8 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]">
          <h2 className="text-xl font-bold text-on-surface dark:text-stone-200 mb-6">Security</h2>
          <div className="space-y-4">
            <button className="w-full md:w-auto px-6 py-3 rounded-md font-bold text-on-surface-variant dark:text-stone-300 bg-surface-container-high dark:bg-stone-800 hover:bg-surface-variant dark:hover:bg-stone-700 transition-colors">
              Change Password
            </button>
            <button className="w-full md:w-auto px-6 py-3 rounded-md font-bold text-on-surface-variant dark:text-stone-300 bg-surface-container-high dark:bg-stone-800 hover:bg-surface-variant dark:hover:bg-stone-700 transition-colors ml-0 md:ml-4">
              Enable Two-Factor Auth
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
