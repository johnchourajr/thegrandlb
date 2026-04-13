"use client";

export function DraftBanner({
  onRestore,
  onDiscard,
}: {
  onRestore: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 mb-4">
      <p className="text-paragraph-small text-black/70">
        You have unsaved changes from a previous session.
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onDiscard}
          className="px-3 py-1.5 rounded border border-black/15 text-string-default font-medium text-black/50 hover:text-black hover:border-black/30 transition-colors"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={onRestore}
          className="px-3 py-1.5 rounded bg-black text-white text-string-default font-semibold hover:bg-black/80 transition-colors"
        >
          Restore
        </button>
      </div>
    </div>
  );
}
