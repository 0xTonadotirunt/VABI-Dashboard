const ChartCard = ({ title, chart, className = "" }) => (
  <div className={`bg-slate-800 rounded-lg p-4 shadow-lg ${className}`}>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="h-64">
      {/* Add chart component based on the 'chart' prop */}
    </div>
  </div>
);

export default ChartCard;
