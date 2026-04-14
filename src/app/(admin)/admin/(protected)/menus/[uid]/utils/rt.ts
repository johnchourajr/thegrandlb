import type { RtBlock } from "@/types/menu";

export function rtRead(blocks: RtBlock[]): string {
  return blocks[0]?.text ?? "";
}

export function rtWrite(value: string, original: RtBlock[]): RtBlock[] {
  if (original.length === 0) {
    return [{ type: "paragraph", text: value, spans: [] }];
  }
  return [{ ...original[0], text: value }, ...original.slice(1)];
}
