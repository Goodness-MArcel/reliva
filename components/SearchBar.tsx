"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      className="w-full max-w-[660px]"
    >
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
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search for a country (e.g. Canada)..."
          className="w-full bg-transparent text-charcoal placeholder-charcoal/50 text-base focus:outline-none"
        />

        {/* Temporary Arrow Button to Dummy Page */}
        <Link
          href="/canada"
          title="Go to Canada dummy page"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-navy hover:bg-gold text-white transition-colors shrink-0 ml-2 cursor-pointer shadow-sm"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </form>
  );
}