"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();

  return (
    <header className="w-full flex items-center justify-between px-8 sm:px-14 py-7">
      <Link
        href="/"
        className="text-2xl font-bold tracking-tight text-navy"
      >
        Reliva
      </Link>

      {session?.user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-charcoal">
            Hi, {session.user.name.split(" ")[0]}
          </span>
          <button
            onClick={() => authClient.signOut()}
            className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-navy/15 text-charcoal transition-colors cursor-pointer shadow-2xs"
          >
            Sign out
          </button>
        </div>
      ) : (
        <Link
          href="/signin"
          className="text-sm font-medium text-charcoal/70 hover:text-navy transition-colors"
        >
          Sign in
        </Link>
      )}
    </header>
  );
}