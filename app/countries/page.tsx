// app/countries/page.tsx
"use client";

import { useState, useEffect, Suspense, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { ArrowRight, Clock, GraduationCap } from "lucide-react";

export default function CountriesPage() {
  return (
    <main className="min-h-screen bg-ivory px-6 py-10 text-charcoal">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-navy">
            Explore Visa Pathways
          </h1>
          <p className="text-sm text-charcoal/80">
            Search verified study, work, and permanent residency routes from our database.
          </p>
          <Suspense fallback={<div className="h-12 w-full max-w-[660px] rounded-full bg-white/70" />}>
            <SearchWrapper />
          </Suspense>
        </div>

        <Suspense fallback={<div className="h-64 rounded-2xl bg-white/70 animate-pulse" />}>
          <SearchResultsSection />
        </Suspense>
      </div>
    </main>
  );
}

// Client wrapper to manage query state for SearchBar
function SearchWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  function handleCustomSubmit() {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/countries?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <SearchBar
      query={query}
      onQueryChange={setQuery}
      onSubmit={handleCustomSubmit}
    />
  );
}

// Server-driven results section wrapper
function SearchResultsSection() {
  return <AsyncResultsList />;
}

function AsyncResultsList() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  
  return <SearchResultsFetcher q={q} />;
}

function SearchResultsFetcher({ q }: { q: string }) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        const res = await fetch(`/api/countries/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [q]);

  if (loading) {
    return <div className="h-64 rounded-2xl bg-white/50 animate-pulse" />;
  }

  if (results.length === 0) {
    return (
      <div className="rounded-2xl border border-navy/10 bg-white p-8 text-center shadow-sm">
        <p className="font-medium text-navy">
          No countries found matching &ldquo;{q}&rdquo;.
        </p>
        <p className="mt-1 text-sm text-charcoal/70">
          Try searching for Canada, United Kingdom, Germany, or Australia.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {results.map((country) => (
        <Link
          key={country.id}
          href={`/countries/${country.slug}`}
          className="group flex flex-col justify-between rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all hover:border-gold"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-3xl">{country.flagEmoji}</span>
              <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">
                {country.region}
              </span>
            </div>

            <h2 className="mt-4 text-xl font-bold text-navy group-hover:text-gold transition-colors">
              {country.name}
            </h2>
            <p className="mt-1 text-sm text-charcoal/80">
              {country.tagline || country.overview?.substring(0, 90) + "..."}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-gold transition-colors">
            View Pathways
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  );
}