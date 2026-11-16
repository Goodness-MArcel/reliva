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
    badgeColor: "bg-gold/15 text-gold border-gold/30",
  },
  {
    country: "United Kingdom",
    visaType: "Standard Visitor Visa",
    status: "Visa Required",
    processingTime: "15 working days",
    fee: "£115 GBP",
    badgeColor: "bg-gold/15 text-gold border-gold/30",
  },
  {
    country: "Kenya",
    visaType: "Electronic Travel Authorisation (eTA)",
    status: "eTA / Visa on Arrival",
    processingTime: "72 hours",
    fee: "$30 USD",
    badgeColor: "bg-confirm/10 text-confirm border-confirm/30",
  },
];

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "Traveler";
  const userPassport =
    (session?.user as { passport?: string } | undefined)?.passport || "Nigeria";

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

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-[0_2px_10px_rgba(11,37,69,0.03)]">
          <div className="flex items-center justify-between text-charcoal/60 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">
              Saved Countries
            </span>
            <Plane className="w-4 h-4 text-navy" />
          </div>
          <p className="text-3xl font-bold text-navy">3</p>
          <p className="text-xs text-charcoal/60 mt-1">
            Actively monitoring changes
          </p>
        </div>

        <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-[0_2px_10px_rgba(11,37,69,0.03)]">
          <div className="flex items-center justify-between text-charcoal/60 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">
              Visa-Free / e-Visa
            </span>
            <CheckCircle2 className="w-4 h-4 text-confirm" />
          </div>
          <p className="text-3xl font-bold text-navy">45+</p>
          <p className="text-xs text-charcoal/60 mt-1">
            Available with {userPassport} passport
          </p>
        </div>

        <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-[0_2px_10px_rgba(11,37,69,0.03)]">
          <div className="flex items-center justify-between text-charcoal/60 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">
              Recent Policy Updates
            </span>
            <Clock className="w-4 h-4 text-gold" />
          </div>
          <p className="text-3xl font-bold text-navy">1</p>
          <p className="text-xs text-charcoal/60 mt-1">
            Updated in the last 7 days
          </p>
        </div>
      </div>

      {/* Saved Countries Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy">
            Saved Destinations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAVED_DESTINATIONS.map((item) => (
            <div
              key={item.country}
              className="group bg-white border border-navy/15 hover:border-gold rounded-2xl p-6 transition-all shadow-[0_2px_10px_rgba(11,37,69,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-navy">
                    {item.country}
                  </h3>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-charcoal/70 mt-1">{item.visaType}</p>

                <div className="mt-5 pt-4 border-t border-navy/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">Processing time:</span>
                    <span className="font-medium text-navy">
                      {item.processingTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">Visa fee:</span>
                    <span className="font-medium text-navy">
                      {item.fee}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-ivory group-hover:bg-navy group-hover:text-white text-navy text-xs font-medium transition-colors cursor-pointer shadow-2xs"
              >
                <span>View checklist</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-gold transition-colors" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}