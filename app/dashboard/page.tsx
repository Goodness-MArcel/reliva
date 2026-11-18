"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { WifiOff, RefreshCw } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import DashboardStats from "@/components/DashboardStats";
import SavedDestinations from "@/components/SavedDestinations";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending, error, refetch } = authClient.useSession();

  // 1. Loading State while verifying session with Neon DB
  if (isPending) {
    return (
      <div className="max-w-5xl mx-auto py-20 flex flex-col items-center justify-center text-center">
        <div className="w-8 h-8 rounded-full border-2 border-navy border-t-transparent animate-spin mb-3" />
        <p className="text-xs font-medium text-charcoal/70">
          Loading your verified profile...
        </p>
      </div>
    );
  }

  // 2. Network Error State (if DB connection fails while on the dashboard)
  if (error) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white border border-navy/15 rounded-3xl p-8 text-center shadow-[0_4px_20px_rgba(11,37,69,0.03)]">
        <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <WifiOff className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-navy">Connection interrupted</h2>
        <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">
          We couldn&apos;t load your account details due to a network error. Please check your internet connection and try again.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 inline-flex items-center gap-2 bg-navy hover:bg-navy/90 text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry connection</span>
        </button>
      </div>
    );
  }

  // 3. If no valid user session exists, bounce back to sign-in instead of showing empty data
  if (!session?.user) {
    router.replace("/signin");
    return null;
  }

  const firstName = session.user.name.split(" ")[0];
  const userPassport =
    (session.user as { passport?: string })?.passport || "Nigeria";

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-charcoal">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy">
          Welcome back, {firstName}
        </h1>
        <p className="text-sm text-charcoal/70 mt-1">
          Showing verified visa rules and updates for your{" "}
          <span className="font-semibold text-navy">{userPassport}</span>{" "}
          passport.
        </p>
      </div>

      {/* Quick Summary Cards Component */}
      <DashboardStats userPassport={userPassport} />

      {/* Saved Countries Section Component */}
      <SavedDestinations />
    </div>
  );
}