import React from "react";
import { Outlet } from "@tanstack/react-router";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">Rick & Morty Characters</h1>
      <Outlet />
    </div>
  );
};

export default App;
