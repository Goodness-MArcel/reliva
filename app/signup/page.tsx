import React from "react";
import Link from "next/link";
import SignUpForm from "@/components/SignUpForm"; // Or "@/components/SignUpForm" if in root components/

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF9F5] text-slate-900">
      {/* Minimal Top Bar */}
      <header className="w-full flex items-center justify-between px-8 sm:px-14 py-7">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          Reliva
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          ← Back to search
        </Link>
      </header>

      {/* Center Registration Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <SignUpForm />
      </main>

      {/* Bottom Footer Text */}
      <footer className="py-8 text-center">
        <p className="text-sm text-slate-400">
          Visa information, verified and kept current.
        </p>
      </footer>
    </div>
  );
}