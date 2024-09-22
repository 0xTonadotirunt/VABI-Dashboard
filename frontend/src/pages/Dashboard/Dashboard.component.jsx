import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Outlet />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
