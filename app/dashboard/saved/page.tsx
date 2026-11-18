"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  Search,
  Trash2,
  ArrowUpRight,
  Plus,
  Clock,
  DollarSign,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface SavedCountryItem {
  id: string;
  country: string;
  pathway: string;
  slug: string;
  category: "Visa Required" | "eTA / e-Visa" | "Visa-Free";
  processingTime: string;
  fee: string;
  lastVerified: string;
  badgeStyle: string;
}

const INITIAL_SAVED: SavedCountryItem[] = [
  {
    id: "canada-study",
    country: "Canada",
    pathway: "Study Permit",
    slug: "/canada/study-permit",
    category: "Visa Required",
    processingTime: "6–12 weeks",
    fee: "$150 CAD",
    lastVerified: "Nov 2026",
    badgeStyle: "bg-gold/15 text-gold border-gold/30",
  },
  {
    id: "uk-visitor",
    country: "United Kingdom",
    pathway: "Standard Visitor Visa",
    slug: "/canada", // Temporary dummy link
    category: "Visa Required",
    processingTime: "15 working days",
    fee: "£115 GBP",
    lastVerified: "Nov 2026",
    badgeStyle: "bg-gold/15 text-gold border-gold/30",
  },
  {
    id: "kenya-eta",
    country: "Kenya",
    pathway: "Electronic Travel Authorisation (eTA)",
    slug: "/canada", // Temporary dummy link
    category: "eTA / e-Visa",
    processingTime: "72 hours",
    fee: "$30 USD",
    lastVerified: "Nov 2026",
    badgeStyle: "bg-confirm/10 text-confirm border-confirm/30",
  },
];

const FILTER_TABS = ["All", "Visa Required", "eTA / e-Visa", "Visa-Free"] as const;

export default function SavedCountriesPage() {
  const { data: session } = authClient.useSession();
  const userPassport =
    (session?.user as { passport?: string } | undefined)?.passport || "Nigeria";

  const [savedList, setSavedList] = useState<SavedCountryItem[]>(INITIAL_SAVED);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const handleRemove = (id: string) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredCountries = savedList.filter((item) => {
    const matchesSearch =
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pathway.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-charcoal">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ivory border border-gold/30 text-xs font-semibold text-navy mb-2">
            <Bookmark className="w-3.5 h-3.5 text-gold" />
            <span>Bookmarked Pathways</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy">
            Saved Countries
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Tracking verified entry rules and fee updates for your{" "}
            <span className="font-semibold text-navy">{userPassport}</span>{" "}
            passport.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white text-xs font-semibold px-5 py-3 rounded-full transition-colors shadow-sm w-fit"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Save another country</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white border border-navy/15 rounded-2xl p-4 shadow-[0_2px_10px_rgba(11,37,69,0.02)]">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter saved countries or visa types..."
            className="w-full bg-ivory/60 border border-navy/10 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-navy text-white"
                    : "bg-ivory text-charcoal/70 hover:text-navy border border-navy/10"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Saved Countries Grid or Empty State */}
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCountries.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-navy/15 hover:border-gold rounded-3xl p-6 transition-all shadow-[0_2px_12px_rgba(11,37,69,0.03)] flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Country Title + Category Badge + Remove Button */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-navy">
                        {item.country}
                      </h2>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.badgeStyle}`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-charcoal/75 mt-1">
                      {item.pathway}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    title="Remove from saved"
                    className="p-2 rounded-full text-charcoal/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-navy/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-ivory border border-navy/10 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-charcoal/50 font-medium">
                        Est. Time
                      </p>
                      <p className="text-xs font-bold text-navy">
                        {item.processingTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-ivory border border-navy/10 flex items-center justify-center shrink-0">
                      <DollarSign className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-charcoal/50 font-medium">
                        Gov. Fee
                      </p>
                      <p className="text-xs font-bold text-navy">{item.fee}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Verified Note + Action Link */}
              <div className="mt-6 pt-4 border-t border-navy/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-charcoal/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-confirm shrink-0" />
                  <span>
                    Verified <strong className="text-navy">{item.lastVerified}</strong>
                  </span>
                </div>

                <Link
                  href={item.slug}
                  className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full bg-ivory group-hover:bg-navy group-hover:text-white text-navy text-xs font-semibold transition-colors"
                >
                  <span>View requirements</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-gold transition-colors" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-navy/15 rounded-3xl p-10 text-center max-w-md mx-auto my-8 shadow-[0_2px_12px_rgba(11,37,69,0.02)]">
          <div className="w-12 h-12 rounded-2xl bg-ivory border border-gold/30 flex items-center justify-center mx-auto mb-4 text-navy">
            <Globe className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-base font-bold text-navy">
            No saved destinations found
          </h3>
          <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed">
            {searchQuery || activeFilter !== "All"
              ? "No saved countries match your current search or filter."
              : "You haven't bookmarked any countries yet. Search for a destination to save its visa rules and checklist."}
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 bg-navy hover:bg-navy/90 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <span>Explore countries</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
          </Link>
        </div>
      )}
    </div>
  );
}