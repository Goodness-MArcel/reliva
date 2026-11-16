import React from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Clock, DollarSign, FileCheck, ShieldAlert, ArrowLeft } from "lucide-react";

export default function StudyPermitDetailPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="w-full flex items-center justify-between px-8 sm:px-14 py-7 border-b border-navy/10 bg-white/50 backdrop-blur-md">
        <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
          Reliva
        </Link>
        <Link
          href="/canada"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal/70 hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Canada pathways</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 space-y-8">
        
        {/* Visa Header & Verified Badge */}
        <div className="bg-white border border-navy/15 rounded-3xl p-8 shadow-[0_4px_20px_rgba(11,37,69,0.03)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-confirm/10 text-confirm border border-confirm/30 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Active Pathway</span>
            </span>
            
            {/* Last Verified Date Note */}
            <div className="flex items-center gap-2 text-xs text-charcoal/60 bg-ivory px-3 py-1.5 rounded-xl border border-navy/10 w-fit">
              <ShieldAlert className="w-3.5 h-3.5 text-gold" />
              <span>Reliva last verified this: <strong className="text-navy">November 2026</strong></span>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-navy">
            Canada Study Permit
          </h1>
          <p className="text-sm sm:text-base text-charcoal/70 mt-2 leading-relaxed">
            A study permit is a document issued by Immigration, Refugees and Citizenship Canada (IRCC) that allows foreign nationals to study at designated learning institutions (DLIs) in Canada.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-navy/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ivory border border-navy/10 flex items-center justify-center text-navy">
                <Clock className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-charcoal/60 uppercase tracking-wider">Processing Time</p>
                <p className="text-sm font-bold text-navy">6–12 weeks</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ivory border border-navy/10 flex items-center justify-center text-navy">
                <DollarSign className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-charcoal/60 uppercase tracking-wider">Government Fee</p>
                <p className="text-sm font-bold text-navy">$150 CAD + Biometrics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Who Qualifies Section */}
        <div className="bg-white border border-navy/15 rounded-3xl p-8 shadow-[0_4px_20px_rgba(11,37,69,0.03)] space-y-4">
          <h2 className="text-lg font-bold text-navy flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold"></span>
            Who qualifies for it
          </h2>
          <ul className="space-y-3 text-sm text-charcoal/80">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-confirm shrink-0 mt-0.5" />
              <span>You have been accepted by a Designated Learning Institution (DLI) in Canada.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-confirm shrink-0 mt-0.5" />
              <span>You can prove you have enough money to pay for tuition fees, living expenses, and return transportation.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-confirm shrink-0 mt-0.5" />
              <span>You obey the law, have no criminal record, and obtain a police certificate if required.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-confirm shrink-0 mt-0.5" />
              <span>You satisfy an immigration officer that you will leave Canada when your study permit expires.</span>
            </li>
          </ul>
        </div>

        {/* Required Documents Section */}
        <div className="bg-white border border-navy/15 rounded-3xl p-8 shadow-[0_4px_20px_rgba(11,37,69,0.03)] space-y-4">
          <h2 className="text-lg font-bold text-navy flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold"></span>
            What documents you need to gather
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Valid International Passport",
              "Letter of Acceptance from DLI",
              "Proof of Financial Support (Bank Statements)",
              "Provincial Attestation Letter (PAL)",
              "SOP (Statement of Purpose)",
              "Medical Exam Certificates",
            ].map((doc, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-ivory/50 border border-navy/10 text-xs font-medium text-charcoal">
                <FileCheck className="w-4 h-4 text-gold shrink-0" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Government Link Action Card */}
        <div className="bg-navy text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_6px_25px_rgba(11,37,69,0.15)]">
          <div>
            <h3 className="text-lg font-bold text-white">Ready to apply officially?</h3>
            <p className="text-xs text-white/70 mt-1 max-w-md">
              Always review the primary source documentation directly through the official Government of Canada immigration portal.
            </p>
          </div>
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy font-semibold text-xs py-3.5 px-6 rounded-full transition-colors shrink-0 shadow-sm"
          >
            <span>Visit official IRCC portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-navy/10 bg-white/30">
        <p className="text-xs text-charcoal/60">
          Visa information, verified and kept current by Reliva[cite: 2].
        </p>
      </footer>
    </div>
  );
}