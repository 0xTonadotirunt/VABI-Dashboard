import { Outlet } from "react-router-dom";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import RecentActivityCard from "@/components/RecentActivityCard";

const Dashboard = () => {
  return (
    <>
      <Outlet />
      <main className="bg-slate-900 text-gray-100 min-h-screen p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-300">
          Emissions Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total CO2e"
            value="1,234 tons"
            icon="cloud"
            color="bg-red-500"
          />
          <StatCard
            title="Reduction"
            value="15.3%"
            icon="trending-down"
            color="bg-green-500"
          />
          <StatCard
            title="Net-Zero Progress"
            value="42%"
            icon="target"
            color="bg-blue-500"
          />
          <StatCard
            title="Carbon Offset"
            value="320 tons"
            icon="leaf"
            color="bg-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ChartCard
            title="Emissions Trend"
            chart="line"
            className="lg:col-span-2"
          />
          {/* <RecentActivityCard /> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Emissions by Source" chart="pie" />
          <ChartCard title="Monthly Reduction" chart="bar" />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
