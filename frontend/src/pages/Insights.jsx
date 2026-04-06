import SpendingCategory from '../components/insights/SpendingCategory';
import CashflowChart from '../components/insights/CashflowChart';
import AllocationDonut from '../components/insights/AllocationDonut';
import InsightCard from '../components/insights/InsightCard';

function Insights() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-extrabold font-manrope tracking-tight text-on-surface dark:text-stone-200">
          Financial Insights
        </h1>
        <p className="text-stone-500 dark:text-stone-400 font-body">Deep dive into your spending patterns and wealth narrative.</p>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        <SpendingCategory />
        <CashflowChart />
        <AllocationDonut />
        
        <div className="col-span-12 lg:col-span-8 relative overflow-hidden bg-gradient-to-br from-primary to-primary-container dark:from-primary dark:to-primary-container rounded-xl p-8 shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)] text-white group">
          <div className="relative z-10 flex gap-6 items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                lightbulb
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-manrope">Did you know?</h3>
              <p className="text-white/80 font-body leading-relaxed max-w-lg">
                Users who set a <span className="font-bold text-white">"No-Spend Weekend"</span> once a month increase their annual savings by an average of 14%. Last month, you spent ₹342 on Sundays alone. Try a challenge this week!
              </p>
              <button className="mt-4 px-6 py-2 bg-white dark:bg-stone-900 text-primary font-bold rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors shadow-lg active:opacity-80">
                Set Challenge
              </button>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
        </div>
        
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InsightCard 
            icon="trending_up"
            label="Growth Forecast"
            value="+4.2%"
            description="Estimated portfolio growth by next quarter"
            iconColor="text-primary"
          />
          <InsightCard 
            icon="savings"
            label="Emergency Fund"
            value="6.2 Months"
            description="Coverage based on current spending"
            iconColor="text-tertiary"
          />
          <InsightCard 
            icon="payments"
            label="Avg Daily Spend"
            value="₹84.12"
            description="Decreased by ₹12 since last week"
            iconColor="text-secondary"
          />
        </div>
      </div>
    </div>
  );
}

export default Insights;
