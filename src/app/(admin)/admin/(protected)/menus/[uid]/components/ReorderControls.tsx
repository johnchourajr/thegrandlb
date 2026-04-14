"use client";

import { reorderBtnCls } from "../utils/classes";

function TooltipButton({
  onClick,
  tooltip,
  children,
}: {
  onClick: () => void;
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group/tip">
      <button type="button" onClick={onClick} className={reorderBtnCls}>
        {children}
      </button>
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 whitespace-nowrap rounded bg-black px-2 py-1 text-[10px] font-medium text-white opacity-0 group-hover/tip:opacity-100 transition-opacity z-50">
        {tooltip}
      </div>
    </div>
  );
}

export function ReorderControls({
  onMoveUp,
  onMoveDown,
  label,
}: {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  label?: string;
}) {
  const noun = label ?? "item";
  return (
    <div className="shrink-0 flex flex-col gap-0.5">
      {onMoveUp && (
        <TooltipButton onClick={onMoveUp} tooltip={`Move ${noun} up`}>
          ↑
        </TooltipButton>
      )}
      {onMoveDown && (
        <TooltipButton onClick={onMoveDown} tooltip={`Move ${noun} down`}>
          ↓
        </TooltipButton>
      )}
    </div>
  );
}
