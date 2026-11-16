"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SuggestedCountries from "@/components/SuggestedCountries";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleCountrySelect = (country: string) => {
    setSearchQuery(country);
  };

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    console.log("Searching visa info for:", searchQuery);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F3F1EC] text-[#444444] font-sans">
      {/* Top Header */}
      <Navbar />

      {/* Center Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-12">
        <h1 className="text-4xl sm:text-[52px] font-bold tracking-tight text-[#0B2545] text-center mb-10">
          Where do you want to go?
        </h1>

        <SearchBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onSubmit={handleSearchSubmit}
        />

        <SuggestedCountries onSelectCountry={handleCountrySelect} />
      </main>

      {/* Bottom Footer Text */}
      <footer className="py-8 text-center">
        <p className="text-sm text-[#444444]/70">
          Visa information, verified and kept current.
        </p>
      </footer>
    </div>
  );
}