"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { ArrowUpRight, CheckCircle2, Clock, Plane } from "lucide-react";

const SAVED_DESTINATIONS = [
  {
    country: "Canada",
    visaType: "Visitor Visa (TRV)",
    status: "Visa Required",
    processingTime: "28–45 days",
    fee: "$100 CAD",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    country: "United Kingdom",
    visaType: "Standard Visitor Visa",
    status: "Visa Required",
    processingTime: "15 working days",
    fee: "£115 GBP",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    country: "Kenya",
    visaType: "Electronic Travel Authorisation (eTA)",
    status: "eTA / Visa on Arrival",
    processingTime: "72 hours",
    fee: "$30 USD",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "Traveler";
  const userPassport =
    (session?.user as { passport?: string } | undefined)?.passport || "Nigeria";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Welcome back, {firstName}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Showing verified visa rules and updates for your{" "}
          <span className="font-semibold text-slate-800">
            {userPassport}
          </span>{" "}
          passport.
        </p>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">
              Saved Countries
            </span>
            <Plane className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-3xl font-bold text-slate-950">3</p>
          <p className="text-xs text-slate-400 mt-1">
            Actively monitoring changes
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">
              Visa-Free / e-Visa
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-950">45+</p>
          <p className="text-xs text-slate-400 mt-1">
            Available with {userPassport} passport
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">
              Recent Policy Updates
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-slate-950">1</p>
          <p className="text-xs text-slate-400 mt-1">
            Updated in the last 7 days
          </p>
        </div>
      </div>

      {/* Saved Countries Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-950">
            Saved Destinations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAVED_DESTINATIONS.map((item) => (
            <div
              key={item.country}
              className="group bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-6 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-950">
                    {item.country}
                  </h3>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{item.visaType}</p>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Processing time:</span>
                    <span className="font-medium text-slate-700">
                      {item.processingTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Visa fee:</span>
                    <span className="font-medium text-slate-700">
                      {item.fee}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-[#FAF9F5] group-hover:bg-slate-950 group-hover:text-white text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                <span>View checklist</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}