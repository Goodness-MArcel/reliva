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
        className="text-2xl font-bold tracking-tight text-slate-900"
      >
        Reliva
      </Link>

      {session?.user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-700">
            Hi, {session.user.name.split(" ")[0]}
          </span>
          <button
            onClick={() => authClient.signOut()}
            className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-slate-200/80 hover:bg-slate-300/80 text-slate-700 transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      ) : (
        <Link
          href="/signin"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          Sign in
        </Link>
      )}
    </header>
  );
}