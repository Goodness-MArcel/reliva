"use client";

import React from "react";

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
      <div className="relative flex items-center w-full bg-white border border-slate-200/90 rounded-full px-6 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200/50 transition-all">
        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-slate-400 mr-4 shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search for a country..."
          className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base focus:outline-none"
        />
      </div>
    </form>
  );
}