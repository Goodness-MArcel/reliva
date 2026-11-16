"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const PASSPORT_COUNTRIES = [
  "Nigeria",
  "United States",
  "United Kingdom",
  "Canada",
  "Ghana",
  "South Africa",
  "Kenya",
  "India",
  "Australia",
  "Germany",
  "France",
  "Brazil",
  "Other",
];

export default function SignUpForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [passport, setPassport] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await authClient.signUp.email({
      email,
      password,
      name: fullName,
      // @ts-expect-error - additional custom field configured in lib/auth.ts
      passport,
    });

    if (error) {
      setErrorMsg(error.message || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    // Redirect to dashboard after successful registration
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="w-full max-w-[440px] bg-white border border-navy/15 rounded-3xl p-8 sm:p-10 shadow-[0_4px_20px_rgba(11,37,69,0.03)]">
      {/* Header */}
      <div className="text-center mb-7">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy">
          Create an account
        </h1>
        <p className="text-sm text-charcoal/70 mt-2">
          Get personalized visa rules based on your passport.
        </p>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="mb-5 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600 text-center">
          {errorMsg}
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-medium text-charcoal mb-1.5 ml-1"
          >
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Alex Rivera"
            className="w-full bg-white border border-navy/15 rounded-full px-5 py-3 text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-charcoal mb-1.5 ml-1"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-white border border-navy/15 rounded-full px-5 py-3 text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition-all"
          />
        </div>

        {/* Passport / Citizenship Selector */}
        <div>
          <label
            htmlFor="passport"
            className="block text-xs font-medium text-charcoal mb-1.5 ml-1"
          >
            Your passport country
          </label>
          <div className="relative">
            <select
              id="passport"
              required
              value={passport}
              onChange={(e) => setPassport(e.target.value)}
              className="w-full appearance-none bg-white border border-navy/15 rounded-full px-5 py-3 pr-10 text-sm text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition-all cursor-pointer"
            >
              <option value="" disabled>
                Select your passport...
              </option>
              {PASSPORT_COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-charcoal/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-charcoal mb-1.5 ml-1"
          >
            Password
          </label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full bg-white border border-navy/15 rounded-full pl-5 pr-11 py-3 text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 text-charcoal/50 hover:text-navy transition-colors cursor-pointer"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-navy hover:bg-navy/90 disabled:opacity-60 text-white text-sm font-medium py-3.5 px-6 rounded-full transition-colors cursor-pointer shadow-sm"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-xs text-charcoal/70 mt-6">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-semibold text-navy hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}