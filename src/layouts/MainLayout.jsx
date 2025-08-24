// src/layouts/MainLayout.jsx
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SidebarV1, SidebarV2 } from "../components/Sidebar";

import { Header } from "../components/Header";

export const MainLayout = () => {
  const { user } = useContext(AuthContext);

  return (user && <div className="flex h-screen">
      {/* Sidebar */}
      {user?.role === "student" ? (
        <SidebarV1 user={user} />
      ) : (
        <SidebarV2 user={user} />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page content (scrollable, below header) */}
        <main className="flex-1 pt-16 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
