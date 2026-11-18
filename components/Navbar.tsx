"use client";

import React from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function Navbar() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const initials = (session?.user?.name || "TR")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="w-full flex items-center justify-between px-8 sm:px-14 py-7">
      <Link
        href="/"
        className="text-2xl font-bold tracking-tight text-navy"
      >
        Reliva
      </Link>

      {isPending ? (
        <div className="flex items-center gap-3">
          <div className="hidden sm:block h-4 w-16 rounded-full bg-navy/10 animate-pulse" />
          <div className="w-10 h-10 rounded-full bg-navy/10 animate-pulse" />
        </div>
      ) : session?.user ? (
        <div className="flex items-center gap-3.5">
          <span className="text-sm font-medium text-charcoal hidden sm:inline">
            Hi, {session.user.name.split(" ")[0]}
          </span>
          <Link
            href="/dashboard"
            aria-label="Go to dashboard"
            title="Go to your dashboard"
            className="rounded-full ring-2 ring-transparent hover:ring-gold transition-all cursor-pointer"
          >
            <Avatar className="h-10 w-10 border border-navy/15 shadow-2xs">
              <AvatarImage
                src={session.user.image || ""}
                alt={session.user.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-navy text-white text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      ) : error ? (
        <button
          type="button"
          onClick={() => refetch()}
          title="Connection error — click to retry"
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>
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