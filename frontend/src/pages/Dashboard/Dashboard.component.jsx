import { Outlet } from "react-router-dom";
import GraphCard from "@/components/GraphCard";

const Dashboard = () => {
  return (
    <>
      <Outlet />
      <main class="bg-gray-100 w-full h-full px-4 py-8">
        <h1 class="text-2xl md:text-3xl pb-5 text-gray-800 dark:text-gray-100 font-bold">
          Dashboard
        </h1>
        <div className="grid grid-cols-12 gap-6">
          <GraphCard />
          <GraphCard />
          <GraphCard />
          <GraphCard />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
