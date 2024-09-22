import React from "react";
import { useNavigation, Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

export default function Layout() {
  let navigation = useNavigation();
  return (
    <div>
      <Navbar />
    </div>
  );
}
