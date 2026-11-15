"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Bookmark,
  FileCheck2,
  Bell,
  Settings,
  LogOut,
  Globe,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import SignOutModal from "@/components/SignOutModal";

const NAV_ITEMS = [
  { title: "Overview", url: "/dashboard", icon: Compass },
  { title: "Saved Countries", url: "/dashboard/saved", icon: Bookmark },
  { title: "Visa Checklist", url: "/dashboard/checklist", icon: FileCheck2 },
  { title: "Policy Alerts", url: "/dashboard/alerts", icon: Bell },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const userPassport =
    (session?.user as { passport?: string } | undefined)?.passport || "Nigeria";

  return (
    <>
      <Sidebar className="border-r border-slate-200/80 bg-white">
        {/* Brand Header */}
        <SidebarHeader className="px-6 py-6 border-b border-slate-100">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            Reliva
          </Link>
          <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF9F5] border border-slate-200/80 w-fit">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-medium text-slate-700">
              Passport:{" "}
              <strong className="text-slate-950">{userPassport}</strong>
            </span>
          </div>
        </SidebarHeader>

        {/* Navigation Links */}
        <SidebarContent className="px-3 py-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-slate-950 text-white hover:bg-slate-900 hover:text-white"
                            : "text-slate-600 hover:bg-[#FAF9F5] hover:text-slate-950"
                        }`}
                      >
                        <Link href={item.url} className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 shrink-0" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Profile & Sign Out Trigger */}
        <SidebarFooter className="p-4 border-t border-slate-100">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="truncate pr-2">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {session?.user?.name || "Traveler"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {session?.user?.email || ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSignOutModal(true)}
              title="Sign out"
              className="p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Confirmation Popup Modal */}
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
      />
    </>
  );
}