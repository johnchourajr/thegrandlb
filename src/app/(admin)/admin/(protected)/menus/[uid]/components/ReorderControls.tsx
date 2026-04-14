"use client";

import { reorderBtnCls } from "../utils/classes";

export function ReorderControls({
  onMoveUp,
  onMoveDown,
  label,
}: {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  label?: string;
}) {
  return (
    <div className="shrink-0 flex flex-col gap-0.5">
      {onMoveUp && (
        <button
          type="button"
          onClick={onMoveUp}
          disabled={!onMoveUp}
          className={reorderBtnCls}
          title={`Move ${label ?? "item"} up`}
        >
          ↑
        </button>
      )}
      {onMoveDown && (
        <button
          type="button"
          onClick={onMoveDown}
          disabled={!onMoveDown}
          className={reorderBtnCls}
          title={`Move ${label ?? "item"} down`}
        >
          ↓
        </button>
      )}
    </div>
  );
}
