"use client";

import React from "react";
import { CheckCircle2, Clock, Plane } from "lucide-react";

interface DashboardStatsProps {
  userPassport: string;
}

export default function DashboardStats({ userPassport }: DashboardStatsProps) {
  return (
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
  );
}