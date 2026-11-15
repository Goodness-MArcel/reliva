import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#FAF9F5] text-slate-900">
        {/* Left Shadcn Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar with Sidebar Collapse Toggle */}
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-slate-200/70 bg-[#FAF9F5]/80 backdrop-blur-md px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-slate-600 hover:text-slate-950 cursor-pointer" />
              <span className="text-sm font-medium text-slate-500">
                Dashboard
              </span>
            </div>

            <a
              href="/"
              className="text-xs font-medium px-4 py-2 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              + New Country Search
            </a>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 sm:p-10">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}