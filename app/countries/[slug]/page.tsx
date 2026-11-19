import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountryWithPathways } from "@/lib/countries";
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";

// 1. Top-level page stays synchronous (renders the static shell instantly)
export default function CountryPathwaysPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="min-h-screen bg-ivory px-6 py-10 text-charcoal">
      <div className="mx-auto max-w-5xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all countries
        </Link>

        {/* 2. Dynamic runtime data (await params + NeonDB query) lives inside Suspense */}
        <Suspense fallback={<CountryDetailSkeleton />}>
          <CountryContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}

// 3. Async child component awaits params and fetches from NeonDB
async function CountryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = await getCountryWithPathways(slug);

  if (!country) {
    notFound();
  }

  return (
    <>
      {/* Country Header */}
      <div className="rounded-2xl bg-navy p-8 text-ivory shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{country.flagEmoji}</span>
            <div>
              <h1 className="text-3xl font-bold text-ivory">{country.name}</h1>
              <p className="text-sm text-ivory/80">
                {country.region} • Capital: {country.capital} • Currency:{" "}
                {country.currency.code} ({country.currency.symbol})
              </p>
            </div>
          </div>

          <a
            href={country.officialImmigrationPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gold px-4 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-navy"
          >
            Official Portal
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ivory/90">
          {country.overview}
        </p>
      </div>

      {/* Pathways List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-navy">
          Available Immigration Pathways ({country.pathways.length})
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {country.pathways.map((pathway) => (
            <div
              key={pathway.id}
              className="flex flex-col justify-between rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-colors hover:border-gold/60"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-gold/15 px-2.5 py-1 text-xs font-semibold text-navy">
                    {pathway.category}
                  </span>
                  {pathway.prEligible && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2E7D32]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      PR Eligible
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-lg font-bold text-navy">
                  {pathway.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal/85">
                  {pathway.summary}
                </p>

                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-navy/10 pt-4 text-xs">
                  <div>
                    <dt className="text-charcoal/60">Processing Time</dt>
                    <dd className="font-semibold text-navy">
                      {pathway.processingTime}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-charcoal/60">Application Fee</dt>
                    <dd className="font-semibold text-navy">
                      {pathway.applicationFee}
                    </dd>
                  </div>
                </dl>
              </div>

              <Link
                href={`/countries/${country.slug}/${pathway.slug}`}
                className="mt-6 block w-full rounded-lg bg-navy py-2.5 text-center text-sm font-medium text-ivory transition-colors hover:bg-gold hover:text-navy"
              >
                Explore Full Requirements
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// 4. Clean loading skeleton matching Reliva's colors
function CountryDetailSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-44 rounded-2xl bg-navy/15" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-64 rounded-2xl bg-white/80" />
        <div className="h-64 rounded-2xl bg-white/80" />
      </div>
    </div>
  );
}