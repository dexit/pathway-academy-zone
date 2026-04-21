import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  label: string;
  level: number;
};

export function useTableOfContents(selector = "main section[id]") {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(selector));
    const tocItems: TocItem[] = elements.map((el) => {
      const heading = el.querySelector("h2, h3");
      return {
        id: el.id,
        label: heading?.textContent || el.id,
        level: heading?.tagName === "H2" ? 2 : 3,
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
      { rootMargin: "0% 0% -80% 0%" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);

  return { items, activeId };
}
