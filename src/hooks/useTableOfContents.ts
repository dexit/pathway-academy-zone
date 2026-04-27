import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  label: string;
  level: number;
};

/**
 * Enhanced Table of Contents hook.
 * Detects headings within the specified selector and uses IntersectionObserver
 * to track the currently active section.
 */
export function useTableOfContents(selector = "article h2, article h3") {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timeout = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll(selector));

      const tocItems: TocItem[] = elements.map((el) => {
        // Ensure element has an ID
        if (!el.id) {
          el.id = el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || Math.random().toString(36).substr(2, 9);
        }
        return {
          id: el.id,
          label: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        };
      });

      setItems(tocItems);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-10% 0% -70% 0%",
          threshold: 1.0
        }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timeout);
  }, [selector]);

  return { items, activeId };
}
