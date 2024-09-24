import React from "react";
import { useNavigation, Link, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

export default function Layout() {
  let navigation = useNavigation();
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
