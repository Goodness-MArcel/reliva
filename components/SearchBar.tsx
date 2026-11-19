"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

interface CountrySuggestion {
  id: string;
  name: string;
  slug: string;
  flagEmoji: string;
  region: string;
}

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function SearchBar({
  query,
  onQueryChange,
  onSubmit,
}: SearchBarProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [suggestions, setSuggestions] = useState<CountrySuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch matching countries from NeonDB with a 250ms debounce
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/countries/search?q=${encodeURIComponent(trimmed)}`
        );
        if (res.ok) {
          const data: CountrySuggestion[] = await res.json();
          setSuggestions(data);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Failed to fetch country suggestions:", err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsOpen(false);

    if (onSubmit) {
      onSubmit(e);
      return;
    }

    const trimmed = query.trim();
    if (!trimmed) return;

    // If an exact suggestion matches what they typed, go straight to its pathways page
    const exactMatch = suggestions.find(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (exactMatch) {
      router.push(`/countries/${exactMatch.slug}`);
    } else {
      router.push(`/countries?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-[660px]">
      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="group relative flex items-center w-full bg-white border border-navy/15 rounded-full pl-6 pr-2 py-2 shadow-[0_2px_10px_rgba(11,37,69,0.04)] focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/25 transition-all">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-charcoal/60 group-focus-within:text-gold mr-4 shrink-0 transition-colors"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          {/* Input Field */}
          <input
            type="text"
            value={query}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search for a country (e.g. Canada)..."
            className="w-full bg-transparent text-charcoal placeholder-charcoal/50 text-base focus:outline-none"
          />

          {/* Submit Arrow Button */}
          <button
            type="submit"
            title="Search country"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-navy hover:bg-gold text-white transition-colors shrink-0 ml-2 cursor-pointer shadow-sm"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown from NeonDB */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-navy/15 bg-white shadow-lg">
          {suggestions.length === 0 && !isLoading ? (
            <div className="px-5 py-4 text-sm text-charcoal/70">
              No countries found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <ul className="divide-y divide-navy/5">
              {suggestions.map((country) => (
                <li key={country.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onQueryChange(country.name);
                      router.push(`/countries/${country.slug}`);
                    }}
                    className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-ivory"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flagEmoji}</span>
                      <div>
                        <p className="font-medium text-navy">{country.name}</p>
                        <p className="text-xs text-charcoal/60">
                          {country.region}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gold">
                      View pathways →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}