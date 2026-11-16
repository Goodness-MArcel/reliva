"use client";

import React, { useState, useEffect } from "react";

interface SuggestedCountriesProps {
  onSelectCountry: (country: string) => void;
  replaceOnRemove?: boolean;
}

const ALL_COUNTRIES = [
  "Canada",
  "Australia",
  "UK",
  "Germany",
  "United States",
  "France",
  "Japan",
  "Netherlands",
  "New Zealand",
  "Ireland",
  "United Arab Emirates",
  "Spain",
  "Italy",
  "Portugal",
  "Sweden",
  "Switzerland",
  "Norway",
  "Singapore",
  "South Korea",
  "Brazil",
  "Mexico",
  "South Africa",
  "Denmark",
  "Belgium",
  "Austria",
  "Finland",
  "Poland",
  "Malaysia",
  "Thailand",
  "Qatar",
];

export default function SuggestedCountries({
  onSelectCountry,
  replaceOnRemove = true,
}: SuggestedCountriesProps) {
  const [displayedCountries, setDisplayedCountries] = useState<string[]>([
    "Canada",
    "Australia",
    "UK",
    "Germany",
  ]);
  const [dismissedCountries, setDismissedCountries] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...ALL_COUNTRIES].sort(() => 0.5 - Math.random());
    setDisplayedCountries(shuffled.slice(0, 4));
  }, []);

  const handleRemoveCountry = (
    e: React.MouseEvent,
    countryToRemove: string
  ) => {
    e.stopPropagation();

    const updatedDismissed = [...dismissedCountries, countryToRemove];
    setDismissedCountries(updatedDismissed);

    if (replaceOnRemove) {
      const availablePool = ALL_COUNTRIES.filter(
        (c) =>
          !displayedCountries.includes(c) && !updatedDismissed.includes(c)
      );

      if (availablePool.length > 0) {
        const randomNext =
          availablePool[Math.floor(Math.random() * availablePool.length)];
        setDisplayedCountries((prev) =>
          prev.map((c) => (c === countryToRemove ? randomNext : c))
        );
        return;
      }
    }

    setDisplayedCountries((prev) =>
      prev.filter((country) => country !== countryToRemove)
    );
  };

  if (displayedCountries.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
      {displayedCountries.map((country) => (
        <div
          key={country}
          onClick={() => onSelectCountry(country)}
          className="group flex items-center gap-2 pl-4 pr-3 py-2 rounded-full bg-white/80 hover:bg-white border border-[#0B2545]/10 hover:border-[#C9973E] text-[#444444] hover:text-[#0B2545] text-sm font-medium transition-all cursor-pointer select-none shadow-2xs"
        >
          <span>{country}</span>

          <button
            type="button"
            onClick={(e) => handleRemoveCountry(e, country)}
            aria-label={`Remove ${country}`}
            className="flex items-center justify-center w-4 h-4 rounded-full text-[#444444]/50 hover:text-[#0B2545] hover:bg-[#F3F1EC] transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}