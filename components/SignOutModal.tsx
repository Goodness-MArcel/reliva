"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignOutModal({ isOpen, onClose }: SignOutModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConfirmSignOut = async (e: React.MouseEvent) => {
    // Prevent AlertDialogAction from closing the modal before signOut finishes
    e.preventDefault();
    setLoading(true);
    await authClient.signOut();
    setLoading(false);
    onClose();
    router.push("/signin");
    router.refresh();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-[380px] rounded-3xl border-navy/15 bg-white p-7 shadow-[0_10px_40px_rgba(11,37,69,0.08)]">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          {/* Icon Circle */}
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 border border-red-100 text-red-600">
            <LogOut className="h-5 w-5" />
          </div>

          <AlertDialogTitle className="text-xl font-bold tracking-tight text-navy">
            Sign out of Reliva?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-charcoal/70 text-center leading-relaxed mt-1">
            Are you sure you want to sign out of your account? You can always
            sign back in anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-5 flex-row items-center gap-3 sm:justify-center">
          <AlertDialogCancel
            disabled={loading}
            onClick={onClose}
            className="mt-0 flex-1 rounded-full bg-ivory hover:bg-navy/10 border border-navy/15 py-5 text-xs font-semibold text-charcoal cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={handleConfirmSignOut}
            className="flex-1 rounded-full bg-red-600 hover:bg-red-700 py-5 text-xs font-semibold text-white cursor-pointer shadow-sm"
          >
            {loading ? "Signing out..." : "Yes, sign out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}