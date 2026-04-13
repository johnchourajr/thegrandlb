import clsx from "clsx";

export const inputCls = clsx(
  "w-full rounded border border-black/15 bg-white px-3 py-2 text-paragraph-small text-black placeholder-black/30 focus:border-black/40 focus:outline-none focus:ring-1 focus:ring-black/20 transition-colors",
);

export const labelCls = clsx(
  "block text-string-default font-medium text-black/50 mb-1",
);

export const reorderBtnCls = clsx(
  "w-6 h-6 flex items-center justify-center rounded border border-black/10 bg-white",
  "text-black/30 text-string-small leading-none",
  "hover:text-black hover:border-black/25 disabled:opacity-0 transition-colors cursor-pointer",
);
