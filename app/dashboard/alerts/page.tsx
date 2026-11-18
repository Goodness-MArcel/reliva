"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCheck,
  ShieldAlert,
  Clock,
  DollarSign,
  FileText,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface PolicyAlert {
  id: string;
  country: string;
  pathway: string;
  title: string;
  summary: string;
  date: string;
  type: "Policy Change" | "Fee Update" | "Processing Time";
  severity: "Important" | "Good News" | "Notice";
  read: boolean;
  slug: string;
}

const INITIAL_ALERTS: PolicyAlert[] = [
  {
    id: "alert-1",
    country: "Canada",
    pathway: "Study Permit",
    title: "Provincial Attestation Letter (PAL) mandatory for 2026/2027 intake",
    summary:
      "IRCC now requires master's and doctoral degree students to submit a Provincial Attestation Letter alongside undergraduate applicants.",
    date: "2 days ago",
    type: "Policy Change",
    severity: "Important",
    read: false,
    slug: "/canada/study-permit",
  },
  {
    id: "alert-2",
    country: "Kenya",
    pathway: "Electronic Travel Authorisation (eTA)",
    title: "Faster eTA turnaround for African passport holders",
    summary:
      "Standard processing time has been reduced from 5 business days to 72 hours for verified online submissions.",
    date: "1 week ago",
    type: "Processing Time",
    severity: "Good News",
    read: false,
    slug: "/canada",
  },
  {
    id: "alert-3",
    country: "United Kingdom",
    pathway: "Standard Visitor Visa",
    title: "Biometric enrollment transition to eVisas",
    summary:
      "UKVI is phasing out physical biometric residence permits in favor of digital UKVI accounts linked directly to your passport.",
    date: "2 weeks ago",
    type: "Policy Change",
    severity: "Notice",
    read: true,
    slug: "/canada",
  },
];

const SEVERITY_BADGES: Record<PolicyAlert["severity"], string> = {
  Important: "bg-gold/15 text-gold border-gold/30",
  "Good News": "bg-confirm/10 text-confirm border-confirm/30",
  Notice: "bg-ivory text-navy border-navy/15",
};

const TYPE_ICONS: Record<PolicyAlert["type"], React.ElementType> = {
  "Policy Change": FileText,
  "Fee Update": DollarSign,
  "Processing Time": Clock,
};

export default function PolicyAlertsPage() {
  const { data: session } = authClient.useSession();
  const userPassport =
    (session?.user as { passport?: string } | undefined)?.passport || "Nigeria";

  const [alerts, setAlerts] = useState<PolicyAlert[]>(INITIAL_ALERTS);
  const [filter, setFilter] = useState<"All" | "Unread">("All");

  const unreadCount = alerts.filter((a) => !a.read).length;

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const toggleRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: !a.read } : a))
    );
  };

  const visibleAlerts =
    filter === "Unread" ? alerts.filter((a) => !a.read) : alerts;

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-charcoal">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ivory border border-gold/30 text-xs font-semibold text-navy mb-2">
            <Bell className="w-3.5 h-3.5 text-gold" />
            <span>Embassy & IRCC Monitor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy">
            Policy Alerts
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Verified immigration rule changes affecting{" "}
            <span className="font-semibold text-navy">{userPassport}</span>{" "}
            passport holders.
          </p>
        </div>

        {/* Filter & Mark All Read Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="flex items-center bg-white border border-navy/15 rounded-full p-1">
            {(["All", "Unread"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  filter === tab
                    ? "bg-navy text-white"
                    : "text-charcoal/70 hover:text-navy"
                }`}
              >
                {tab} {tab === "Unread" && unreadCount > 0 && `(${unreadCount})`}
              </button>
            ))}
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-navy/15 text-xs font-semibold text-navy hover:border-gold transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-confirm" />
              <span>Mark all read</span>
            </button>
          )}
        </div>
      </div>

      {/* Alerts List */}
      {visibleAlerts.length > 0 ? (
        <div className="space-y-4">
          {visibleAlerts.map((alert) => {
            const IconComponent = TYPE_ICONS[alert.type];
            return (
              <div
                key={alert.id}
                onClick={() => toggleRead(alert.id)}
                className={`group relative rounded-3xl p-6 transition-all border cursor-pointer ${
                  alert.read
                    ? "bg-white/70 border-navy/10 opacity-80"
                    : "bg-white border-navy/15 hover:border-gold shadow-[0_4px_20px_rgba(11,37,69,0.03)]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                        alert.read
                          ? "bg-ivory border-navy/10 text-charcoal/50"
                          : "bg-ivory border-gold/30 text-navy"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 text-gold" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                        )}
                        <span className="text-xs font-bold text-navy">
                          {alert.country} • {alert.pathway}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                            SEVERITY_BADGES[alert.severity]
                          }`}
                        >
                          {alert.severity}
                        </span>
                        <span className="text-[11px] text-charcoal/50">
                          {alert.date}
                        </span>
                      </div>

                      <h2 className="text-base font-bold text-navy leading-snug">
                        {alert.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed max-w-2xl">
                        {alert.summary}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={alert.slug}
                    onClick={(e) => e.stopPropagation()}
                    className="self-end sm:self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ivory hover:bg-navy hover:text-white text-navy text-xs font-semibold transition-colors shrink-0"
                  >
                    <span>Review pathway</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-navy/15 rounded-3xl p-10 text-center max-w-md mx-auto my-8">
          <div className="w-12 h-12 rounded-2xl bg-confirm/10 border border-confirm/30 flex items-center justify-center mx-auto mb-4 text-confirm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-navy">You&apos;re all caught up!</h3>
          <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed">
            You have no unread policy alerts right now. Reliva checks embassy portals daily and will notify you if any rules change.
          </p>
        </div>
      )}

      {/* Verification Note Banner */}
      <div className="bg-ivory border border-navy/10 rounded-2xl p-4 flex items-center gap-3 text-xs text-charcoal/70">
        <ShieldAlert className="w-4 h-4 text-gold shrink-0" />
        <span>
          All policy alerts are cross-checked directly against official embassy dispatches before appearing in your feed.
        </span>
      </div>
    </div>
  );
}