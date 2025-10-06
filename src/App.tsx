import React from "react";
import { Outlet } from "@tanstack/react-router";

const App = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Rick & Morty Characters
      </h1>
      <Outlet />
    </div>
  );
};

export default App;
