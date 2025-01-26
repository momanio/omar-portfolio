import React from "react";
import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};
