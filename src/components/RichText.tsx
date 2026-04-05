import { type ReactNode, Fragment } from "react";
import type { RtBlock, RtSpan } from "content/types";
import AppLink from "./AppLink";

// ─── Component callback shapes ────────────────────────────────────────────────

type BlockProps = { children: ReactNode; key: string };
type HyperlinkProps = { text: string; node: { data: unknown } };
type LabelProps = { node: { data: unknown }; children: ReactNode; key: string };
type ImageProps = {
  node: Record<string, unknown>;
  key: string;
  children: ReactNode;
};
type EmbedProps = { node: Record<string, unknown>; key: string };

export type RichTextComponents = Partial<{
  paragraph: (props: BlockProps) => ReactNode;
  heading1: (props: BlockProps) => ReactNode;
  heading2: (props: BlockProps) => ReactNode;
  heading3: (props: BlockProps) => ReactNode;
  heading4: (props: BlockProps) => ReactNode;
  heading5: (props: BlockProps) => ReactNode;
  heading6: (props: BlockProps) => ReactNode;
  listItem: (props: BlockProps) => ReactNode;
  oListItem: (props: BlockProps) => ReactNode;
  list: (props: BlockProps) => ReactNode;
  oList: (props: BlockProps) => ReactNode;
  preformatted: (props: BlockProps) => ReactNode;
  strong: (props: BlockProps) => ReactNode;
  em: (props: BlockProps) => ReactNode;
  hyperlink: (props: HyperlinkProps) => ReactNode;
  label: (props: LabelProps) => ReactNode;
  image: (props: ImageProps) => ReactNode;
  embed: (props: EmbedProps) => ReactNode;
}>;

// ─── Inline span rendering ────────────────────────────────────────────────────

function renderInline(
  text: string,
  spans: RtSpan[],
  components?: RichTextComponents
): ReactNode[] {
  if (!spans || spans.length === 0) return [text];

  const boundaries = new Set<number>([0, text.length]);
  for (const span of spans) {
    if (span.start >= 0 && span.end <= text.length) {
      boundaries.add(span.start);
      boundaries.add(span.end);
    }
  }

  const sorted = Array.from(boundaries).sort((a, b) => a - b);
  const result: ReactNode[] = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i];
    const end = sorted[i + 1];
    if (start === end) continue;

    const segText = text.slice(start, end);
    const activeSpans = spans.filter((s) => s.start <= start && s.end >= end);

    if (activeSpans.length === 0) {
      result.push(segText);
      continue;
    }

    let node: ReactNode = segText;
    const key = `seg-${i}-${start}`;

    for (const span of activeSpans) {
      if (span.type === "strong") {
        const comp = components?.strong;
        node = comp
          ? <Fragment key={key}>{comp({ children: node, key })}</Fragment>
          : <strong key={key}>{node}</strong>;
      } else if (span.type === "em") {
        const comp = components?.em;
        node = comp
          ? <Fragment key={key}>{comp({ children: node, key })}</Fragment>
          : <em key={key}>{node}</em>;
      } else if (span.type === "hyperlink") {
        const data = span.data as Record<string, unknown>;
        const comp = components?.hyperlink;
        node = comp ? (
          <Fragment key={key}>{comp({ text: segText, node: { data } })}</Fragment>
        ) : (
          <AppLink key={key} field={data as any} className="hover:underline">
            {node}
          </AppLink>
        );
      } else if (span.type === "label") {
        const data = span.data as Record<string, unknown>;
        const comp = components?.label;
        node = comp ? (
          <Fragment key={key}>{comp({ node: { data }, children: node, key })}</Fragment>
        ) : (
          <span key={key} className={String(data?.label || "")}>
            {node}
          </span>
        );
      }
    }

    result.push(node);
  }

  return result;
}

// ─── Block grouping ──────────────────────────────────────────────────────────

type GroupedItem =
  | RtBlock
  | { type: "list"; items: RtBlock[] }
  | { type: "oList"; items: RtBlock[] };

function groupBlocks(blocks: RtBlock[]): GroupedItem[] {
  const result: GroupedItem[] = [];
  let i = 0;
  while (i < blocks.length) {
    if (blocks[i].type === "list-item") {
      const items: RtBlock[] = [];
      while (i < blocks.length && blocks[i].type === "list-item") {
        items.push(blocks[i]);
        i++;
      }
      result.push({ type: "list", items });
    } else if (blocks[i].type === "o-list-item") {
      const items: RtBlock[] = [];
      while (i < blocks.length && blocks[i].type === "o-list-item") {
        items.push(blocks[i]);
        i++;
      }
      result.push({ type: "oList", items });
    } else {
      result.push(blocks[i]);
      i++;
    }
  }
  return result;
}

// ─── Block renderer ──────────────────────────────────────────────────────────

function renderBlock(
  block: RtBlock,
  key: string,
  components?: RichTextComponents
): ReactNode {
  const b = block as any;
  const spans: RtSpan[] = b.spans || [];
  const text: string = b.text || "";
  const children = renderInline(text, spans, components);

  const call = (
    type: keyof Pick<
      RichTextComponents,
      | "paragraph"
      | "heading1"
      | "heading2"
      | "heading3"
      | "heading4"
      | "heading5"
      | "heading6"
      | "preformatted"
    >,
    defaultEl: ReactNode
  ) => {
    const comp = components?.[type] as
      | ((p: BlockProps) => ReactNode)
      | undefined;
    return comp
      ? <Fragment key={key}>{comp({ children, key })}</Fragment>
      : defaultEl;
  };

  switch (block.type) {
    case "paragraph":
      return call("paragraph", <p key={key}>{children}</p>);
    case "heading1":
      return call("heading1", <h1 key={key}>{children}</h1>);
    case "heading2":
      return call("heading2", <h2 key={key}>{children}</h2>);
    case "heading3":
      return call("heading3", <h3 key={key}>{children}</h3>);
    case "heading4":
      return call("heading4", <h4 key={key}>{children}</h4>);
    case "heading5":
      return call("heading5", <h5 key={key}>{children}</h5>);
    case "heading6":
      return call("heading6", <h6 key={key}>{children}</h6>);
    case "preformatted":
      return call("preformatted", <pre key={key}>{children}</pre>);
    case "image": {
      const comp = components?.image;
      return comp
        ? comp({ node: b, key, children: null })
        : <img key={key} src={b.url} alt={b.alt || ""} />;
    }
    case "embed": {
      const comp = components?.embed;
      return comp
        ? comp({ node: b, key })
        : <div key={key} dangerouslySetInnerHTML={{ __html: b.oembed?.html || "" }} />;
    }
    default:
      return null;
  }
}

// ─── Main component ──────────────────────────────────────────────────────────

interface RichTextProps {
  field: unknown;
  components?: RichTextComponents;
  className?: string;
}

export function RichText({ field, components, className }: RichTextProps) {
  if (!field || !Array.isArray(field)) return null;

  const blocks = field as RtBlock[];
  const grouped = groupBlocks(blocks);

  const rendered = grouped.map((item, i) => {
    if ("items" in item && item.type === "list") {
      const listKey = `list-${i}`;
      const listItems = item.items.map((block, j) => {
        const itemKey = `li-${i}-${j}`;
        const spans: RtSpan[] = (block as any).spans || [];
        const text: string = (block as any).text || "";
        const children = renderInline(text, spans, components);
        const comp = components?.listItem;
        return comp
          ? <Fragment key={itemKey}>{comp({ children, key: itemKey })}</Fragment>
          : <li key={itemKey}>{children}</li>;
      });
      const comp = components?.list;
      return comp
        ? <Fragment key={listKey}>{comp({ children: listItems, key: listKey })}</Fragment>
        : <ul key={listKey}>{listItems}</ul>;
    }

    if ("items" in item && item.type === "oList") {
      const listKey = `oList-${i}`;
      const listItems = item.items.map((block, j) => {
        const itemKey = `oli-${i}-${j}`;
        const spans: RtSpan[] = (block as any).spans || [];
        const text: string = (block as any).text || "";
        const children = renderInline(text, spans, components);
        const comp = components?.oListItem;
        return comp
          ? <Fragment key={itemKey}>{comp({ children, key: itemKey })}</Fragment>
          : <li key={itemKey}>{children}</li>;
      });
      const comp = components?.oList;
      return comp
        ? <Fragment key={listKey}>{comp({ children: listItems, key: listKey })}</Fragment>
        : <ol key={listKey}>{listItems}</ol>;
    }

    return renderBlock(item as RtBlock, `block-${i}`, components);
  });

  if (className) {
    return <div className={className}>{rendered}</div>;
  }

  return <>{rendered}</>;
}

export default RichText;
