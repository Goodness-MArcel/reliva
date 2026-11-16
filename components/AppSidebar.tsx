"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const userPassport =
    (session?.user as { passport?: string } | undefined)?.passport || "Nigeria";

  return (
    <>
      <Sidebar className="border-r border-navy/10 bg-white">
        {/* Brand Header */}
        <SidebarHeader className="px-6 py-6 border-b border-navy/10">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-navy"
          >
            Reliva
          </Link>
          <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ivory border border-gold/30 w-fit">
            <Globe className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-medium text-charcoal">
              Passport: <strong className="text-navy">{userPassport}</strong>
            </span>
          </div>
        </SidebarHeader>

        {/* Navigation Links */}
        <SidebarContent className="px-3 py-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-charcoal/60 px-3 mb-2">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={isActive}
                        onClick={() => router.push(item.url)}
                        className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? "bg-navy text-white hover:bg-navy/95 hover:text-white"
                            : "text-charcoal hover:bg-ivory hover:text-navy"
                        }`}
                      >
                        <item.icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-gold" : "text-charcoal/70"
                          }`}
                        />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Profile & Sign Out Trigger */}
        <SidebarFooter className="p-4 border-t border-navy/10">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="truncate pr-2">
              <p className="text-sm font-semibold text-navy truncate">
                {session?.user?.name || "Traveler"}
              </p>
              <p className="text-xs text-charcoal/70 truncate">
                {session?.user?.email || ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSignOutModal(true)}
              title="Sign out"
              className="p-2 rounded-full text-charcoal/60 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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