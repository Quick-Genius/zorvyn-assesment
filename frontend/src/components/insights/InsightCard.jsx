function InsightCard({ icon, label, value, description, iconColor = 'text-primary' }) {
  return (
    <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
      <div className="flex items-center gap-3 mb-2">
        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
        <span className="text-xs font-label uppercase text-stone-500">{label}</span>
      </div>
      <p className="text-xl font-bold font-manrope">{value}</p>
      <p className="text-xs text-stone-400">{description}</p>
    </div>
  );
}

export default InsightCard;
