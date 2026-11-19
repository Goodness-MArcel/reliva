// app/admin/page.tsx
import Link from "next/link";
import { Globe, PlusCircle, ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { getAllCountries } from "@/lib/countries";

export default async function AdminDashboardPage() {
  const countries = await getAllCountries();
  const totalPathways = countries.reduce((acc, c) => acc + c.pathways.length, 0);

  return (
    <div className="space-y-8">
      {/* Page Title Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Dashboard Overview</h1>
          <p className="text-sm text-charcoal/70">
            Manage live immigration destinations, study pathways, and visa requirements.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl bg-gold/15 px-3.5 py-2 text-xs font-semibold text-navy">
          <ShieldCheck className="h-4 w-4 text-gold" />
          Admin Access Active
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-charcoal/60">Active Countries</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy">
              <Globe className="h-5 w-5 text-gold" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-navy">{countries.length}</p>
          <p className="mt-1 text-xs text-charcoal/60">Loaded from NeonDB</p>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-charcoal/60">Total Pathways</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy">
              <FileText className="h-5 w-5 text-gold" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-navy">{totalPathways}</p>
          <p className="mt-1 text-xs text-charcoal/60">Study, Work & PR routes</p>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-navy">Quick Management</h2>
          <p className="text-xs text-charcoal/60">
            Configure destinations, review country data, and jump into system controls.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/admin/countries"
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-gold hover:text-navy shadow-sm"
          >
            <Globe className="h-4 w-4 text-gold group-hover:text-navy" />
            Manage Countries & Pathways
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}