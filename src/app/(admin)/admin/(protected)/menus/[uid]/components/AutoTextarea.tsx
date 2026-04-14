"use client";

import { useEffect, useRef } from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function AutoTextarea({ value, onChange, className, ...rest }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function resize() {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  // Resize on mount and whenever value changes
  useEffect(() => { resize(); }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => { onChange?.(e); resize(); }}
      rows={1}
      style={{ overflow: "hidden", resize: "none" }}
      className={className}
      {...rest}
    />
  );
}
