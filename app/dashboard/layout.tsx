import React from "react";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        {/* Left Shadcn Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar with Sidebar Collapse Toggle */}
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-navy/10 bg-background/80 backdrop-blur-md px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-charcoal hover:text-navy cursor-pointer" />
              <span className="text-sm font-medium text-charcoal/70">
                Dashboard
              </span>
            </div>

            <Link
              href="/"
              className="text-xs font-medium px-4 py-2 rounded-full bg-white border border-navy/15 text-charcoal hover:bg-ivory hover:text-navy transition-colors shadow-2xs"
            >
              + New Country Search
            </Link>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 sm:p-10">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}