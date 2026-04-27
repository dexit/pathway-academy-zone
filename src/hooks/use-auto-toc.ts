import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string; level: 2 | 3 };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Auto-extract a table of contents from h2/h3 elements inside the given
 * container ref. Adds missing `id` attributes (for anchoring) and adds
 * `scroll-mt-24` so anchor jumps account for the sticky header. Re-scans
 * whenever the route key changes (passed as `key`).
 */
export function useAutoToc(
  containerRef: React.RefObject<HTMLElement>,
  deps: React.DependencyList = []
): TocItem[] {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const headings = Array.from(
      containerRef.current.querySelectorAll<HTMLHeadingElement>("h2, h3")
    );

    const seen = new Set<string>();
    const out: TocItem[] = [];

    headings.forEach((h) => {
      const text = (h.textContent || "").trim();
      if (!text) return;
      let id = h.id || slugify(text);
      let n = 1;
      while (seen.has(id)) {
        id = `${slugify(text)}-${++n}`;
      }
      seen.add(id);
      if (!h.id) h.id = id;
      h.classList.add("scroll-mt-24");
      out.push({
        id,
        label: text,
        level: h.tagName === "H3" ? 3 : 2,
      });
    });

    setItems(out);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return items;
}
