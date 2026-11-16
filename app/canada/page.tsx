import React from "react";
import Link from "next/link";
import { ArrowRight, Globe, FileText, Briefcase, Users, Compass } from "lucide-react";

const VISA_PATHWAYS = [
  {
    slug: "study-permit",
    title: "Study Permit",
    description: "For international students enrolled in designated learning institutions (DLIs) across Canada.",
    processingTime: "6–12 weeks",
    cost: "$150 CAD",
    icon: FileText,
    badge: "Popular",
  },
  {
    slug: "work-permit",
    title: "Work Permit",
    description: "For individuals with a job offer, recent graduates, or temporary foreign workers.",
    processingTime: "8–16 weeks",
    cost: "$155 CAD",
    icon: Briefcase,
    badge: "Employer-Driven",
  },
  {
    slug: "visitor-visa",
    title: "Visitor Visa (TRV)",
    description: "For tourists, family visits, or short-term business trips under 6 months.",
    processingTime: "2–6 weeks",
    cost: "$100 CAD",
    icon: Globe,
    badge: "Tourism & Family",
  },
  {
    slug: "express-entry",
    title: "Express Entry (PR)",
    description: "Points-based federal immigration system for skilled workers seeking permanent residency.",
    processingTime: "6 months",
    cost: "$1,365 CAD",
    icon: Compass,
    badge: "Permanent Residency",
  },
  {
    slug: "family-sponsorship",
    title: "Family Sponsorship",
    description: "Bring eligible relatives, spouses, or dependent children to live in Canada permanently.",
    processingTime: "12+ months",
    cost: "$1,050+ CAD",
    icon: Users,
    badge: "Sponsorship",
  },
];

export default function CanadaCountryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="w-full flex items-center justify-between px-6 sm:px-14 py-6 border-b border-navy/10 bg-white/50 backdrop-blur-md">
        <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
          Reliva
        </Link>
        <Link
          href="/"
          className="text-xs font-medium text-charcoal/70 hover:text-navy transition-colors"
        >
          ← Back to search
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Country Hero Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ivory border border-gold/35 text-xs font-semibold text-navy mb-3">
            <Globe className="w-3.5 h-3.5 text-gold" />
            <span>Destination Guide</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-navy">
            Canada Visa Pathways
          </h1>
          <p className="text-xs sm:text-base text-charcoal/70 mt-2 max-w-2xl leading-relaxed">
            Choose a pathway below to view exact qualification rules, required documents, government fees, and verified processing timelines.
          </p>
        </div>

        {/* Pathways Grid */}
        <div className="grid grid-cols-1 gap-4">
          {VISA_PATHWAYS.map((pathway) => (
            <Link
              key={pathway.slug}
              href={`/canada/${pathway.slug}`}
              className="group relative bg-white border border-navy/15 hover:border-gold rounded-3xl p-5 sm:p-7 transition-all shadow-[0_2px_12px_rgba(11,37,69,0.02)] hover:shadow-[0_6px_20px_rgba(201,151,62,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6"
            >
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-ivory border border-navy/10 flex items-center justify-center shrink-0 text-navy group-hover:bg-navy group-hover:text-white transition-colors">
                  <pathway.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  {/* Title and Badge: Stacks on mobile, inline on desktop */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <h2 className="text-base sm:text-lg font-bold text-navy group-hover:text-gold transition-colors leading-snug">
                      {pathway.title}
                    </h2>
                    <span className="w-fit text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-ivory text-charcoal/80 border border-navy/10">
                      {pathway.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-xl leading-relaxed">
                    {pathway.description}
                  </p>

                  {/* Metadata Row: Wraps cleanly on smaller viewports */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-charcoal/60">
                    <span>Est. Time: <strong className="text-navy">{pathway.processingTime}</strong></span>
                    <span className="hidden sm:inline">•</span>
                    <span>Gov. Fee: <strong className="text-navy">{pathway.cost}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between sm:justify-start pt-3 sm:pt-0 border-t sm:border-t-0 border-navy/5 text-xs font-semibold text-navy group-hover:text-gold transition-colors">
                <span className="sm:hidden text-charcoal/50">View details</span>
                <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                  <span>Explore door</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 sm:py-8 text-center border-t border-navy/10 bg-white/30 px-4">
        <p className="text-xs text-charcoal/60">
          Reliva verifies immigration requirements directly with official government sources.
        </p>
      </footer>
    </div>
  );
}