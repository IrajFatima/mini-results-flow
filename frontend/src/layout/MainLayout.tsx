import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-background">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Entire right side scrolls */}
      <div className="md:ml-64 h-screen overflow-y-auto">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;