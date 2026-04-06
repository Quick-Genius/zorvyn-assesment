import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import WealthTicker from '../common/WealthTicker';

function Layout() {
  return (
    <div className="min-h-screen bg-background dark:bg-stone-950">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-24 pb-12 px-8">
        <Outlet />
      </main>
      <WealthTicker />
    </div>
  );
}

export default Layout;
