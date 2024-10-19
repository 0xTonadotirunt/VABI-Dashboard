const StatCard = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-lg p-4 text-white shadow-lg`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-75">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl opacity-75">
        {/* Add icon based on the 'icon' prop */}
      </div>
    </div>
  </div>
);

export default StatCard;
