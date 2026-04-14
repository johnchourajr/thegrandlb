"use client";

import type { MenuItemData } from "@/types/menu";
import clsx from "clsx";
import { useState } from "react";
import { inputCls, labelCls } from "../utils/classes";
import { rtRead, rtWrite } from "../utils/rt";
import { ReorderControls } from "./ReorderControls";

export function ItemRow({
  item,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  item: MenuItemData;
  onChange: (updated: MenuItemData) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  function handleRemoveClick() {
    if (confirming) {
      onRemove();
    } else {
      setConfirming(true);
    }
  }

  return (
    <div className="flex gap-2">
      <ReorderControls onMoveUp={onMoveUp} onMoveDown={onMoveDown} label="item" />
      <div className="flex-1 min-w-0 grid gap-3 p-4 rounded-lg border border-black/10 bg-cream/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Item Name</label>
            <input
              type="text"
              value={rtRead(item.title)}
              onChange={(e) =>
                onChange({ ...item, title: rtWrite(e.target.value, item.title) })
              }
              className={inputCls}
              placeholder="Item name"
            />
          </div>
          <div>
            <label className={labelCls}>Price Per</label>
            <input
              type="text"
              value={item.price_per}
              onChange={(e) => onChange({ ...item, price_per: e.target.value })}
              className={inputCls}
              placeholder="per person"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea
            value={rtRead(item.description)}
            onChange={(e) =>
              onChange({
                ...item,
                description: rtWrite(e.target.value, item.description),
              })
            }
            rows={2}
            className={clsx(inputCls, "resize-y")}
            placeholder="Item description"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-28">
            <label className={labelCls}>Min Price ($)</label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={item.price_min}
              onChange={(e) =>
                onChange({ ...item, price_min: parseFloat(e.target.value) || 0 })
              }
              className={inputCls}
            />
          </div>
          <div className="w-28">
            <label className={labelCls}>Max Price ($)</label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={item.price_max}
              onChange={(e) =>
                onChange({ ...item, price_max: parseFloat(e.target.value) || 0 })
              }
              className={inputCls}
            />
          </div>
          <button
            type="button"
            onClick={handleRemoveClick}
            onBlur={() => setConfirming(false)}
            className={clsx(
              "mt-4 px-3 py-2 rounded border text-string-default font-medium transition-colors",
              confirming
                ? "border-red bg-red text-white hover:bg-red/80"
                : "border-red/30 bg-red/5 text-red hover:bg-red/10",
            )}
          >
            {confirming ? "Confirm removal" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
