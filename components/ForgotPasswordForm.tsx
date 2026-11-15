"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-[420px] bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      {!isSubmitted ? (
        <>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Reset password
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Enter the email associated with your account and we&apos;ll send
              you a reset link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-700 mb-1.5 ml-1"
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
                className="w-full bg-white border border-slate-200/90 rounded-full px-5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200/50 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-slate-950 hover:bg-slate-800 text-white text-sm font-medium py-3.5 px-6 rounded-full transition-colors cursor-pointer"
            >
              Send reset link
            </button>
          </form>
        </>
      ) : (
        /* Confirmation State After Submit */
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F5] border border-slate-200/80 flex items-center justify-center mx-auto mb-5 text-slate-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Check your email
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-medium text-slate-800">{email}</span>.
          </p>

          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-6 text-xs font-medium text-slate-500 hover:text-slate-900 underline transition-colors cursor-pointer"
          >
            Didn&apos;t receive the email? Try again
          </button>
        </div>
      )}

      {/* Footer Link Back to Sign In */}
      <div className="mt-7 pt-6 border-t border-slate-100 text-center">
        <Link
          href="/signin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
        >
          <span>←</span> Back to sign in
        </Link>
      </div>
    </div>
  );
}