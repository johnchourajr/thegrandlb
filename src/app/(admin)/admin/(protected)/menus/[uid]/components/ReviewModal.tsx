"use client";

import clsx from "clsx";
import { type ChangeEntry, inlineDiff } from "../utils/diff";

export function ReviewModal({
  changes,
  saving,
  onConfirm,
  onCancel,
}: {
  changes: ChangeEntry[];
  saving: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden
      />
      {/* Scroll container */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto flex items-start justify-center p-4 pt-16">
        <div className="w-full max-w-2xl rounded-xl border border-black/10 bg-white shadow-2xl flex flex-col min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
            <div>
              <h2 className="font-semibold text-black text-paragraph-default">
                Review Changes
              </h2>
              <p className="text-string-default text-black/40 mt-0.5">
                {changes.length === 0
                  ? "No changes detected."
                  : `${changes.length} change${changes.length !== 1 ? "s" : ""} will be published.`}
              </p>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="text-black/30 hover:text-black transition-colors text-string-default"
            >
              ✕
            </button>
          </div>

          {/* Change list */}
          <div className="px-6 py-4 flex flex-col gap-2 overflow-y-auto flex-1">
            {changes.length === 0 ? (
              <p className="text-paragraph-small text-black/40 italic text-center py-8">
                No edits have been made since the menu was loaded.
              </p>
            ) : (
              changes.map((c, i) => (
                <div
                  key={i}
                  className={clsx(
                    "rounded-lg border px-4 py-3 grid gap-1.5",
                    c.kind === "added" && "border-gold/40 bg-gold/10",
                    c.kind === "removed" && "border-red/20 bg-red/5",
                    c.kind === "modified" && "border-black/10 bg-black/[0.02]",
                  )}
                >
                  <p className="text-string-extra-small font-medium uppercase tracking-widest text-black/40">
                    {c.path}
                  </p>
                  {c.kind === "modified" && (
                    <p className="text-paragraph-small text-black leading-relaxed break-words">
                      {inlineDiff(c.before, c.after).map((part, pi) =>
                        part.kind === "same" ? (
                          <span key={pi}>{part.text}</span>
                        ) : part.kind === "del" ? (
                          <span key={pi} className="bg-red/15 text-red line-through">
                            {part.text}
                          </span>
                        ) : (
                          <span key={pi} className="bg-gold/30 text-black">
                            {part.text || "·"}
                          </span>
                        ),
                      )}
                    </p>
                  )}
                  {c.kind === "added" && (
                    <p className="text-paragraph-small text-black/60">{c.after}</p>
                  )}
                  {c.kind === "removed" && (
                    <p className="text-paragraph-small text-red line-through">{c.before}</p>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-black/10">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-black/15 text-paragraph-small font-medium text-black/60 hover:text-black hover:border-black/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={saving || changes.length === 0}
              className="px-5 py-2 rounded-lg bg-black text-white text-paragraph-small font-semibold hover:bg-black/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? "Publishing…" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
