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
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value="10,492"
            icon="users"
            color="bg-pink-500"
          />
          <StatCard
            title="Revenue"
            value="$84,325"
            icon="dollar"
            color="bg-green-500"
          />
          <StatCard
            title="Conversion Rate"
            value="8.74%"
            icon="chart-line"
            color="bg-blue-500"
          />
          <StatCard
            title="Avg. Session"
            value="4m 32s"
            icon="clock"
            color="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ChartCard
            title="User Growth"
            chart="line"
            className="lg:col-span-2"
          />
          <RecentActivityCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Revenue by Category" chart="pie" />
          <ChartCard title="Monthly Sales" chart="bar" />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
