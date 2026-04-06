function WealthTicker() {
  const marketData = [
    { symbol: 'BTC/USD', value: '$64,281.00', change: '+2.4%', type: 'up' },
    { symbol: 'AAPL', value: '$182.12', change: '-0.8%', type: 'down' },
    { symbol: 'ETH/USD', value: '$3,412.50', change: '+1.1%', type: 'up' },
    { symbol: 'TSLA', value: '$168.45', change: '-3.2%', type: 'down' },
    { symbol: 'SPY', value: '$512.10', change: '+0.2%', type: 'up' },
  ];
  
  return (
    <footer className="fixed bottom-0 left-64 right-0 h-12 bg-white/60 backdrop-blur-md border-t border-outline-variant/10 z-30 flex items-center px-8 overflow-hidden">
      <div className="flex gap-12 whitespace-nowrap">
        {marketData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              {item.symbol}
            </span>
            <span className="text-[10px] font-bold text-on-surface">
              {item.value}
            </span>
            <span className={`text-[10px] font-bold ${
              item.type === 'up' ? 'text-primary' : 'text-tertiary'
            }`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default WealthTicker;
