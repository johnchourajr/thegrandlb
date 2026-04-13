"use client";

import clsx from "clsx";
import { useEffect } from "react";

export type ToastState = { type: "success" | "error"; message: string } | null;

export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastState;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      className={clsx(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-paragraph-small font-medium shadow-lg transition-all",
        toast.type === "success" ? "bg-black text-white" : "bg-red text-white",
      )}
    >
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="opacity-60 hover:opacity-100 transition-opacity text-string-small"
      >
        ✕
      </button>
    </div>
  );
}
