"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  User,
  Globe,
  Bell,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Camera,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

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

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, refetch } = authClient.useSession();

  const [fullName, setFullName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [passport, setPassport] = useState("Nigeria");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [feeAlerts, setFeeAlerts] = useState(true);

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (session?.user) {
      setFullName(session.user.name || "");
      setImageUrl(session.user.image || "");
      const currentPassport =
        (session.user as { passport?: string })?.passport || "Nigeria";
      setPassport(currentPassport);
    }
  }, [session]);

  const initials = (fullName || session?.user?.name || "TR")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setErrorMsg("");

    try {
      const { error } = await authClient.updateUser({
        name: fullName,
        image: imageUrl.trim() || undefined,
        // @ts-expect-error - custom passport field configured in lib/auth.ts
        passport,
      });

      if (error) {
        setErrorMsg(
          error.message || "Could not update profile. Please try again."
        );
        setSaving(false);
        return;
      }

      await refetch();
      router.refresh();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4500);
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-charcoal">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ivory border border-gold/30 text-xs font-semibold text-navy mb-2">
          <Settings className="w-3.5 h-3.5 text-gold" />
          <span>Account & Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
          Manage your passport citizenship and visa notification preferences.
        </p>
      </div>

      {/* Shadcn Status Alerts (Placed prominently above the form) */}
      {errorMsg && (
        <Alert
          variant="destructive"
          className="rounded-2xl border-red-200 bg-red-50 text-red-700 shadow-2xs"
        >
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-xs font-bold tracking-tight">
            Update failed
          </AlertTitle>
          <AlertDescription className="text-xs text-red-600/90">
            {errorMsg}
          </AlertDescription>
        </Alert>
      )}

      {savedSuccess && (
        <Alert className="rounded-2xl border-confirm/30 bg-confirm/10 text-navy shadow-2xs">
          <CheckCircle2 className="h-4 w-4 text-confirm" />
          <AlertTitle className="text-xs font-bold text-navy tracking-tight">
            Changes saved
          </AlertTitle>
          <AlertDescription className="text-xs text-charcoal/80">
            Your profile photo, name, and primary passport settings have been
            updated across your dashboard.
          </AlertDescription>
        </Alert>
      )}

      {/* Profile & Passport Form Card */}
      <form
        onSubmit={handleSaveProfile}
        className="bg-white border border-navy/15 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(11,37,69,0.03)] space-y-6"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-navy/10">
          <div className="w-10 h-10 rounded-2xl bg-ivory border border-navy/10 flex items-center justify-center text-navy">
            <User className="w-4 h-4 text-gold" />
          </div>
          <div>
            <h2 className="text-base font-bold text-navy">
              Traveler Profile & Passport
            </h2>
            <p className="text-xs text-charcoal/60">
              Your passport determines which visa requirements and fees are
              shown to you.
            </p>
          </div>
        </div>

        {/* Shadcn Avatar Preview & Image URL Input */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 rounded-2xl bg-ivory/60 border border-navy/10">
          <div className="relative w-fit">
            <Avatar className="h-16 w-16 border-2 border-gold/40 shadow-sm">
              <AvatarImage
                src={imageUrl}
                alt={fullName || "User avatar"}
                className="object-cover"
              />
              <AvatarFallback className="bg-navy text-white text-sm font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-navy/15 text-navy shadow-2xs">
              <Camera className="h-3 w-3 text-gold" />
            </span>
          </div>

          <div className="flex-1 space-y-1.5">
            <label
              htmlFor="imageUrl"
              className="block text-xs font-semibold text-navy ml-1"
            >
              Profile photo URL{" "}
              <span className="font-normal text-charcoal/50">(optional)</span>
            </label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-white border border-navy/15 rounded-full px-4 py-2.5 text-xs sm:text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold text-navy mb-1.5 ml-1"
            >
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white border border-navy/15 rounded-full px-5 py-3 text-sm text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-navy mb-1.5 ml-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              disabled
              value={session?.user?.email || ""}
              className="w-full bg-ivory/70 border border-navy/10 rounded-full px-5 py-3 text-sm text-charcoal/50 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Passport Selector */}
        <div>
          <label
            htmlFor="passport"
            className="block text-xs font-semibold text-navy mb-1.5 ml-1"
          >
            Primary Passport / Citizenship
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="passport"
              value={passport}
              onChange={(e) => setPassport(e.target.value)}
              className="w-full appearance-none bg-white border border-navy/15 rounded-full pl-11 pr-10 py-3 text-sm font-medium text-navy focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all cursor-pointer"
            >
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

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-navy hover:bg-navy/90 disabled:opacity-60 text-white text-xs font-semibold px-6 py-3.5 rounded-full transition-colors cursor-pointer shadow-sm"
          >
            {saving ? "Saving changes..." : "Save profile changes"}
          </button>
        </div>
      </form>

      {/* Notification Preferences Card */}
      <div className="bg-white border border-navy/15 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(11,37,69,0.03)] space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-navy/10">
          <div className="w-10 h-10 rounded-2xl bg-ivory border border-navy/10 flex items-center justify-center text-navy">
            <Bell className="w-4 h-4 text-gold" />
          </div>
          <div>
            <h2 className="text-base font-bold text-navy">Alert Preferences</h2>
            <p className="text-xs text-charcoal/60">
              Choose how Reliva notifies you when an embassy updates its rules.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between gap-4 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-navy">
                Embassy Policy Changes
              </p>
              <p className="text-xs text-charcoal/60">
                Receive an email when a saved country changes document or
                eligibility rules.
              </p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-navy rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between gap-4 pt-4 border-t border-navy/10 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-navy">
                Visa Fee & Processing Time Shifts
              </p>
              <p className="text-xs text-charcoal/60">
                Get notified when government filing fees or turnaround times
                change.
              </p>
            </div>
            <input
              type="checkbox"
              checked={feeAlerts}
              onChange={(e) => setFeeAlerts(e.target.checked)}
              className="w-4 h-4 accent-navy rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Shadcn Security Alert Footer */}
      <Alert className="rounded-2xl border-navy/10 bg-ivory text-navy">
        <ShieldCheck className="h-4 w-4 text-confirm" />
        <AlertTitle className="text-xs font-bold text-navy">
          Encrypted & Verified Account
        </AlertTitle>
        <AlertDescription className="text-xs text-charcoal/70">
          Your personal passport preferences and session data are encrypted and
          managed securely via Reliva Auth.
        </AlertDescription>
      </Alert>
    </div>
  );
}