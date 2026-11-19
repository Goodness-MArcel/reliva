// app/admin/layout.tsx
import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Globe, ShieldCheck, LogOut } from "lucide-react";
import Link from "next/link";

// 1. Synchronous outer shell renders immediately during prerendering
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AdminShellSkeleton />}>
      <ProtectedAdminShell>{children}</ProtectedAdminShell>
    </Suspense>
  );
}

// 2. Async inner shell verifies Better Auth session & role inside Suspense
async function ProtectedAdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        {/* Shadcn Admin Sidebar (Styled to match user dashboard) */}
        <Sidebar className="border-r border-navy/10 bg-white text-charcoal">
          <SidebarHeader className="border-b border-navy/10 px-6 py-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy font-bold text-gold shadow-2xs">
                R
              </span>
              <div>
                <span className="font-bold tracking-tight text-navy">
                  Reliva Admin
                </span>
                <p className="text-[10px] text-charcoal/60">
                  Immigration Portal Control
                </p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-3 py-4">
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <Link
                  href="/admin"
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-charcoal/80 transition-colors hover:bg-ivory hover:text-navy"
                >
                  <LayoutDashboard className="h-4 w-4 text-gold" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link
                  href="/admin/countries"
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-charcoal/80 transition-colors hover:bg-ivory hover:text-navy"
                >
                  <Globe className="h-4 w-4 text-gold" />
                  <span>Countries & Pathways</span>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-navy/10 p-4">
            <div className="flex items-center justify-between text-xs text-charcoal">
              <div className="truncate">
                <p className="truncate font-semibold text-navy">
                  {session.user.name}
                </p>
                <p className="text-[10px] font-medium text-gold">
                  Administrator
                </p>
              </div>
              <Link
                href="/dashboard"
                title="Exit Admin"
                className="rounded-full p-2 text-charcoal/60 transition-colors hover:bg-ivory hover:text-navy"
              >
                <LogOut className="h-4 w-4" />
              </Link>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Admin Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar matching DashboardLayout */}
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-navy/10 bg-background/80 backdrop-blur-md px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-charcoal hover:text-navy cursor-pointer" />
              <div className="flex items-center gap-2 text-sm font-medium text-charcoal/70">
                <ShieldCheck className="h-4 w-4 text-gold" />
                <span>Admin Console</span>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="text-xs font-medium px-4 py-2 rounded-full bg-white border border-navy/15 text-charcoal hover:bg-ivory hover:text-navy transition-colors shadow-2xs"
            >
              ← User Dashboard
            </Link>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 sm:p-10">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// 3. Lightweight fallback skeleton shown while session is verifying
function AdminShellSkeleton() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background text-navy">
      <div className="animate-pulse text-sm font-medium">
        Verifying admin session...
      </div>
    </div>
  );
}