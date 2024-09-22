import React from "react";
import { Outlet, useNavigation, Link } from "react-router-dom";

export default function Layout() {
  let navigation = useNavigation();
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}
