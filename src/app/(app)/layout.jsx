"use client";

// Imports Start
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useRouter } from "next/navigation";
// Imports End
export default function AppLayout({ children }) {
  // State Variables Start
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State Variables End

  // Variables Start
    const router = useRouter();
  // Variables End

  // Toggle Sidebar Start
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  // Toggle Sidebar End

  const onLogout = () => {  
    router.push("/login");
  }

  const user = {
    name: "Emmanuel",
    roles: ["*"],
  };

  return (
    <main className="flex h-full overflow-hidden">
      {/* Sidebar  Start */}
      <Sidebar
        user={user}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        
      />
      {/* Sidebar  End */}  

      {/* Main  */}
      <div className="flex flex-col flex-1 overflow-hidden bg-[#f3f4f6] dark:bg-zinc-950">
        <Topbar toggleSidebar={toggleSidebar} user={user} onLogout={onLogout} />


        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </main>
  );
}