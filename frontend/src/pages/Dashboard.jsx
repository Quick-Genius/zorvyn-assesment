import BalanceCard from '../components/dashboard/BalanceCard';
import StatCard from '../components/dashboard/StatCard';
import FinancialChart from '../components/dashboard/FinancialChart';
import ExpenseDonut from '../components/dashboard/ExpenseDonut';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { financialSummary } from '../data/mockFinancials';
import { monthlyChartData, expenseCategories } from '../data/mockCharts';
import { recentTransactions } from '../data/mockTransactions';

function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <section className="col-span-12 lg:col-span-8 space-y-8">
        <div>
          <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">
            Good morning, User
          </h1>
          <p className="text-stone-500 mt-1">Premium Account Overview</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BalanceCard 
            balance={financialSummary.balance}
            cardNumber={financialSummary.cardNumber}
            changePercent={financialSummary.balanceChange}
          />
          <StatCard 
            type="income"
            label="Monthly Income"
            amount={financialSummary.monthlyIncome}
            previousAmount={financialSummary.previousIncome}
          />
          <StatCard 
            type="expenses"
            label="Monthly Expenses"
            amount={financialSummary.monthlyExpenses}
            previousAmount={financialSummary.previousExpenses}
          />
        </div>
        
        <FinancialChart data={monthlyChartData} />
        
        <div className="relative rounded-xl overflow-hidden editorial-shadow bg-gradient-to-br from-primary to-primary-container p-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-headline font-bold text-white">Optimize your savings today</h3>
            <p className="text-primary-fixed/80 text-sm mt-1 max-w-md">
              Our AI analysis shows you could save up to $450/month by adjusting your platform subscriptions.
            </p>
          </div>
          <button className="bg-white text-primary font-bold px-8 py-3 rounded-lg text-sm hover:bg-stone-50 transition-colors shadow-xl">
            Learn more
          </button>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </section>
      
      <aside className="col-span-12 lg:col-span-4 space-y-8">
        <ExpenseDonut categories={expenseCategories} />
        <RecentTransactions transactions={recentTransactions} />
      </aside>
    </div>
  );
}

export default Dashboard;
