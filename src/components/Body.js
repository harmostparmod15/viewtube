import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex w-screen dark:bg-black dark:text-white transition-all duration-1000 ">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Body;
